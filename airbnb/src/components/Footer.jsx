import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer>
        <div className="footer-content">
            <div className="footer-column">
                <h3>Support</h3>
                <ul>
                    <li>Help Center</li>
                    <li>AirCover</li>
                    <li>Safety information</li>
                    <li>Supporting people with disabilities</li>
                    <li>Cancellation options</li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>Community</h3>
                <ul>
                    <li>Airbnb.org: disaster relief housing</li>
                    <li>Combating discrimination</li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>Hosting</h3>
                <ul>
                    <li>Airbnb your home</li>
                    <li>AirCover for Hosts</li>
                    <li>Hosting resources</li>
                    <li>Community forum</li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>Airbnb</h3>
                <ul>
                    <li>Newsroom</li>
                    <li>New features</li>
                    <li>Careers</li>
                    <li>Investors</li>
                </ul>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="footer-bottom-left">
                <p>© 2023 Airbnb, Inc. · Privacy · Terms · Sitemap</p>
            </div>
            <div className="footer-bottom-right">
                <p><i className="fas fa-globe"></i> English (US)</p>
                <p><i className="fas fa-dollar-sign"></i> USD</p>
                <p><i className="fab fa-facebook-f"></i> <i className="fab fa-twitter"></i> <i className="fab fa-instagram"></i></p>
            </div>
        </div>
        </footer>
    </div>
  )
}

export default Footer