import { Link, useLocation } from "react-router-dom";
import "./headerNav.css";

export default function HeaderNav() {
  const location = useLocation();

  const isHome = location.pathname.startsWith("/city-select") || location.pathname === "/";
  const isDeals = location.pathname.startsWith("/deals");

  return (
    <section id="header-nav">
      <p className={isHome ? "p-title selected" : "p-title"}>
        <Link to="/city-select">Home</Link>
      </p>

      <p className={isDeals ? "p-title selected" : "p-title"}>
        <Link to="/deals">Events & Deals</Link>
      </p>
    </section>
  );
}