export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client';
import { updateAppointmentStatus } from '@/app/actions/admin';
import './admin.css';

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const appointments = await prisma.appointment.findMany({
    include: { user: true, service: true, hairstyle: true },
    orderBy: { date: 'asc' }
  });

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Overview</h1>
        <p>Manage salon bookings and operations.</p>
      </div>

      <div className="admin-section">
        <h2>Recent Bookings</h2>
        <div className="booking-table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service/Hairstyle</th>
                <th>Date & Time</th>
                <th>Stylist</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No bookings found</td>
                </tr>
              ) : appointments.map(apt => (
                <tr key={apt.id}>
                  <td>
                    <strong>{apt.user.name}</strong>
                    <br/><small>{apt.user.email}</small>
                  </td>
                  <td>{apt.service?.name || apt.hairstyle?.name || 'Custom'}</td>
                  <td>
                    {new Date(apt.date).toLocaleDateString()}
                    <br/><small>{apt.time}</small>
                  </td>
                  <td>{apt.stylist}</td>
                  <td>
                    <span className={`status-badge status-${apt.status.toLowerCase()}`}>{apt.status}</span>
                  </td>
                  <td>
                    {apt.status === 'PENDING' && (
                      <div className="action-buttons">
                        <form action={updateAppointmentStatus.bind(null, apt.id, 'CONFIRMED')}>
                          <button type="submit" className="btn btn-sm btn-success">Accept</button>
                        </form>
                        <form action={updateAppointmentStatus.bind(null, apt.id, 'CANCELLED')}>
                          <button type="submit" className="btn btn-sm btn-danger">Reject</button>
                        </form>
                      </div>
                    )}
                    {apt.status === 'CONFIRMED' && (
                      <form action={updateAppointmentStatus.bind(null, apt.id, 'COMPLETED')}>
                        <button type="submit" className="btn btn-sm btn-primary">Mark Completed</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
