import React from "react";

const Footer = () => {
  return (
    <>
      <footer
        style={{
          width: "102%",
          backgroundColor: "#111827",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid #374151",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      >
        <div style={{ width: "98%", margin: "0 auto", padding: "1.5rem", textAlign: "center" }}>
          <hr style={{ margin: "1.5rem 0", borderColor: "#4B5563" }} />
          <span style={{ display: "block", fontSize: "0.875rem", color: "#9CA3AF", letterSpacing: "0.05em" }}>
            © 2023 La Juegoteca Virtual. Todos los derechos reservados.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;