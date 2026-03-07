export const dynamic = "force-dynamic";
import { prisma } from '@/lib/prisma';



export default async function AdminCustomers() {
  const users = await prisma.user.findMany({
    include: { _count: { select: { appointments: true } } },
    orderBy: { createdAt: 'desc' }
  });
  
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Customers Directory</h1>
        <p>View registered clients and their booking history.</p>
      </div>

      <div className="admin-section">
        <h2>Registered Users</h2>
        <div className="booking-table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Total Bookings</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td><strong>{u.name || 'N/A'}</strong></td>
                  <td>{u.email}</td>
                  <td>{u._count.appointments}</td>
                  <td>
                    <span className="tag" style={{backgroundColor: u.role === 'ADMIN' ? 'var(--color-gold)' : 'var(--color-gray)'}}>
                      {u.role}
                    </span>
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
