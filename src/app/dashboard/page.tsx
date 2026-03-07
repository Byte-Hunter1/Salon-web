export const dynamic = "force-dynamic";
import { getUser } from '@/lib/auth';
import { logout } from '@/app/actions/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import './dashboard.css';



export default async function DashboardPage() {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const isAdmin = user.role === 'ADMIN';

  const appointments = await prisma.appointment.findMany({
    where: { userId: user.id },
    include: { service: true, hairstyle: true },
    orderBy: { date: 'desc' }
  });

  return (
    <div className="dashboard-container container section">
      <aside className="dashboard-sidebar">
        <div className="user-profile">
          <div className="avatar">{user.name?.charAt(0).toUpperCase() || 'U'}</div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <nav className="dashboard-nav">
          <Link href="/dashboard" className="nav-item active">My Appointments</Link>
          <Link href="#" className="nav-item">Profile Settings</Link>
          {isAdmin && <Link href="/admin" className="nav-item admin-link">Admin Dashboard</Link>}
          <form action={logout} className="logout-form">
            <button type="submit" className="btn-logout">Sign Out</button>
          </form>
        </nav>
      </aside>
      
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>My Appointments</h1>
          <Link href="/book" className="btn btn-primary">New Booking</Link>
        </div>

        <div className="appointments-list">
          {appointments.length === 0 ? (
            <div className="empty-state">
              <p>You have no appointments yet.</p>
              <Link href="/book" className="btn btn-outline" style={{marginTop: '1rem', display: 'inline-block'}}>Book Now</Link>
            </div>
          ) : (
            appointments.map(apt => (
              <div key={apt.id} className="appointment-card">
                <div className="apt-info">
                  <h3>{apt.service?.name || apt.hairstyle?.name || 'Custom Booking'}</h3>
                  <p className="apt-date">{new Date(apt.date).toLocaleDateString()} at {apt.time}</p>
                </div>
                <div className="apt-status">
                  <span className={`status-badge status-${apt.status.toLowerCase()}`}>{apt.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
