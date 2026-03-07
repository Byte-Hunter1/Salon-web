export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AdminServices() {
  const services = await prisma.service.findMany();
  
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Services & Hairstyles</h1>
        <p>Manage offerings and pricing.</p>
      </div>

      <div className="admin-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
          <h2>Services List</h2>
          <button className="btn btn-primary btn-sm">+ Add New Service</button>
        </div>
        <div className="booking-table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.duration} mins</td>
                  <td>₹{s.price}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" style={{marginRight: '0.5rem'}}>Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
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
