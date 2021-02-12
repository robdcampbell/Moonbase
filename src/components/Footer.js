import React from "react";

const Footer = () => {
  return (
    <footer className="footer__container">
      <div className="footer__logo">
        <h4>moonbase.</h4>
        <a
          href="https://github.com/robdcampbell/projectsDashboard-Auth"
          rel="noopener noreferrer"
          target="_blank"
        >
          click here to view project source code.
        </a>
      </div>

      <a
        href="https://www.robcampbelldev.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        rob campbell. 2021
      </a>
    </footer>
  );
};

export default Footer;
