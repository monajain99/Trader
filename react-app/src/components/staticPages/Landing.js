import React from 'react';
import '../../styles/Navbar.css'

function LandingPage(setAuthenticated) {
  return (
    <div>
      <div className="landing_page">
        <div className="landing_page_h1">
          <h3 className="heading3">MEET THE NEW STANDARDS FOR</h3>
          <h1 className="heading1">MARKET TRADING</h1>
        </div>
      </div>
      <div className="footer__container">
        <a href="https://github.com/monajain99/" className="footer-link">
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/rashmi-jain22/"
          className="footer-link"
        >
          LinkedIn
        </a>
        <a href="https://github.com/monajain99/Trader" className="footer-link">
          <i className="fab fa-github fa-2x"></i>
        </a>
        <a
          href="https://angel.co/u/rashmi-jain-29"
          className="footer-link"
        >
          Angelist
        </a>

        <a href="#" className="footer-link">
          Resume
        </a>
      </div>
    </div>
  );
}

export default LandingPage;

