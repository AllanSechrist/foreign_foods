import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer p-4 bg-base-300 text-base-content footer-center">
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
