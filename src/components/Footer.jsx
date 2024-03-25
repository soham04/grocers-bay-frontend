// Footer.js
import React from 'react';
import "../styles/components/Footer.scss"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Welcome to Grocers Bay, your ultimate destination for fresh and quality groceries delivered right to your doorstep. Happy shopping!</p>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li>Contact Us</li>
            <li>Shipping Information</li>
            <li>Return Policy</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <ul>
            <li> <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><li>Twitter</li></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><li>Instagram</li></a>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Stay updated on the latest deals and promotions.</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 Your eCommerce Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
