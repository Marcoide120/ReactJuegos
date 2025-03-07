import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#0B1120",
        width: "100%",
        padding: "1rem 1.25rem", // Reducido el padding
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem", // Reducido el padding
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}> {/* Reducido el gap */}
          <img
            src="/logo2.png"
            style={{ height: "3rem", width: "3rem", objectFit: "contain" }}
            alt="Logo"
          />
          <span
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              backgroundImage: "linear-gradient(to right, #047857, #10B981)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Juegoteca Virtual
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}> {/* Reducido el gap */}
          {[
            { to: "/", label: "Home" },
            { to: "/Games", label: "Biblioteca" },
            { to: "/Publisher", label: "Publishers" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                position: "relative",
                padding: "0.5rem 0.75rem", // Reducido el padding
                fontSize: "1.25rem",
                fontWeight: "500",
                transition: "color 0.3s ease-in-out",
                color: isActive ? "#10B981" : "#D1D5DB",
                textDecoration: "none",
              })}
            >
              {({ isActive }) => (
                <>
                  <span style={{ position: "relative", zIndex: 10 }}>
                    {link.label}
                  </span>
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: 0,
                        width: "100%",
                        height: "2px",
                        backgroundColor: "#10B981",
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
