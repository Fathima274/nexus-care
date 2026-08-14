import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  const hideBannerPages = [
    "/online-pharmacy",  // 👈 hide banner here
  ];

  const hideBanner = hideBannerPages.includes(location.pathname);

  return (
    <footer className="footer">

     

    </footer>
  );
}
