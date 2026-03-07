import Link from 'next/link';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-col">
          <h3>SALON LUXE</h3>
          <p>Experience premium grooming and styling in an atmosphere of pure luxury.</p>
        </div>
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link href="/services">Our Services</Link></li>
            <li><Link href="/gallery">Hairstyle Gallery</Link></li>
            <li><Link href="/book">Book Appointment</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Contact</h3>
          <ul className="footer-contact">
            <li><Phone size={16} /> +1 (555) 123-4567</li>
            <li><Mail size={16} /> hello@salonluxe.com</li>
            <li><MapPin size={16} /> 123 Luxury Ave, NY</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Salon Luxe. All rights reserved.</p>
      </div>
    </footer>
  );
}
