export const dynamic = "force-dynamic";
import Link from 'next/link';
import './services.css';
import { prisma } from '@/lib/prisma';



export default async function ServicesPage() {
  const services = await prisma.service.findMany();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Services</h1>
        <p>Expert grooming tailored to perfection.</p>
      </div>

      <div className="container section">
        <div className="services-list">
          {services.map(service => (
            <div key={service.id} className="service-row">
              <div className="service-info">
                <h3>{service.name}</h3>
                <p className="desc">{service.description}</p>
                <span className="duration">{service.duration} mins</span>
              </div>
              <div className="service-price">
                <span className="price">₹{service.price}</span>
                <Link href={`/book?service=${service.id}`} className="btn btn-primary btn-sm">Book</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="combo-banner" style={{ marginTop: '5rem', padding: '4rem 2rem', textAlign: 'center', borderRadius: '24px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
          <div className="combo-content">
            <h2>Custom Service Combos</h2>
            <p>Select multiple services during booking for a personalized experience.</p>
            <Link href="/book" className="btn btn-outline" style={{ display: 'inline-block' }}>Build Your Combo</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
