import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "please_change_this_secret";

// =========================
// REGISTER
// =========================
router.post(
  "/register",
  [
    body("name").isLength({ min: 2 }).withMessage("Name required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password min 6 chars"),
  ],
  async (req, res) => {
    try {
      // Check request body
      console.log("REGISTER BODY:", req.body);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { name, email, password } = req.body;

      // Check existing user
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({
          message: "Email already registered",
        });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create user
      const user = new User({
        name,
        email,
        passwordHash,
      });

      await user.save();

      // Create token
      const token = jwt.sign(
        { id: user._id },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      return res.status(500).json({
        message: "Registration server error",
        error: error.message,
      });
    }
  }
);


// =========================
// LOGIN
// =========================
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Valid email required"),

    body("password")
      .exists()
      .withMessage("Password required"),
  ],
  async (req, res) => {
    try {
      console.log("LOGIN BODY:", req.body);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      // Compare password
      const isMatch = await bcrypt.compare(
        password,
        user.passwordHash
      );

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      // Create token
      const token = jwt.sign(
        { id: user._id },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      return res.status(500).json({
        message: "Login server error",
        error: error.message,
      });
    }
  }
);

export default router;