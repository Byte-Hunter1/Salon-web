import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import './admin.css';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="admin-layout container section">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Admin Panel</h2>
          <p>Salon Luxe</p>
        </div>
        <nav className="admin-nav">
          <Link href="/admin" className="nav-item">Bookings</Link>
          <Link href="/admin/services" className="nav-item">Services & Styles</Link>
          <Link href="/admin/customers" className="nav-item">Customers</Link>
          <Link href="/dashboard" className="nav-item" style={{ marginTop: '2rem', color: 'var(--color-gold)' }}>Switch to Customer View</Link>
        </nav>
      </aside>
      
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
