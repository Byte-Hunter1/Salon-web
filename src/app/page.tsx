export const dynamic = "force-dynamic";
import Link from 'next/link';
import './home.css';
import { prisma } from '@/lib/prisma';
import { Scissors, Sparkles, Droplets, Quote, Star } from 'lucide-react';



export default async function Home() {
  const services = await prisma.service.findMany({ take: 3 });

  // Map icons to services based on name (mock logic for aesthetic)
  const getIconForService = (name: string) => {
    if (name.toLowerCase().includes('hair')) return <Scissors size={32} strokeWidth={1} />;
    if (name.toLowerCase().includes('spa') || name.toLowerCase().includes('facial')) return <Droplets size={32} strokeWidth={1} />;
    return <Sparkles size={32} strokeWidth={1} />;
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Effortless <span>Beauty</span></h1>
          <p>Experience premium grooming and styling in an atmosphere of pure minimalism. Modern aesthetics for the modern individual.</p>
          <div className="hero-actions" style={{ marginTop: '2.5rem' }}>
            <Link href="/book" className="btn btn-primary">Book Appointment</Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80" alt="Minimal Salon Interior" className="hero-image" />
        </div>
      </section>

      {/* Signature Experiences (Featured Services) */}
      <section className="section container">
        <div className="section-header">
          <h2>Our Signature Experiences</h2>
        </div>
        <div className="grid-3">
          {services.map(service => (
            <div key={service.id} className="card glass">
              <div className="card-icon">
                {getIconForService(service.name)}
              </div>
              <div className="card-content">
                <h3>{service.name.toUpperCase()}</h3>
                <p className="desc">{service.description}</p>
              </div>
              <div className="card-action">
                <Link href={`/book?service=${service.id}`} className="btn btn-outline">Explore Menu</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Master Artists */}
      <section className="section bg-dark">
        <div className="container" style={{ padding: '2rem 1rem' }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', textTransform: 'none', color: 'var(--color-gold)', fontSize: '2.5rem', letterSpacing: 'normal' }}>
              Meet Our<br/>Master Artists
            </h2>
          </div>
          <div className="stylist-grid">
            <div className="stylist-card glass">
              <img src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=400&q=80" alt="Sarah" />
              <h3 className="stylist-name">Elizabeth</h3>
              <p className="stylist-role">Creative Director</p>
            </div>
            <div className="stylist-card glass">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" alt="Marcus" />
              <h3 className="stylist-name">Julian</h3>
              <p className="stylist-role">Master Colorist</p>
            </div>
            <div className="stylist-card glass">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" alt="David" />
              <h3 className="stylist-name">Marcus</h3>
              <p className="stylist-role">Lead Barber</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial-section container">
        <div className="glass" style={{ padding: '5rem 2rem', borderRadius: '40px' }}>
          <div className="quote-icon">
            <Quote size={48} />
          </div>
          <p className="testimonial-text">
            "The absolute gold standard in service. I walked in feeling tired and walked out feeling like royalty. My hair has never looked this vibrant or healthy. Elene is a true visionary."
          </p>
          <div className="testimonial-author">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="Reviewer" />
            <div className="testimonial-author-info">
              <p className="testimonial-author-name">Victoria Kensington</p>
              <div className="testimonial-stars">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
