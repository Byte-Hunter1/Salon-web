import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link href="/" className="logo">
          SALON <span>LUXE</span>
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Login</Link>
          <Link href="/book" className="btn btn-primary">Book Now</Link>
        </div>
      </div>
    </nav>
  );
}
