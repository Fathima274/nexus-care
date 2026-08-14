import React from "react";
import Sidebar from "./Sidebar";
import "./ProtectedLayout.css";

export default function ProtectedLayout({ children }) {
  return (
    <div className="pl-root">
      <Sidebar />
      <main className="pl-main">
        {children}
      </main>
    </div>
  );
}
