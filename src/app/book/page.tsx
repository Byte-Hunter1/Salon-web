export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import BookingForm from '@/components/BookingForm';
import './book.css';

const prisma = new PrismaClient();

// Again resolving searchParams for Next 15
export default async function BookPage({ searchParams }: { searchParams: Promise<{ service?: string, hairstyle?: string }> }) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const resolvedParams = await searchParams;
  const services = await prisma.service.findMany();
  const hairstyles = await prisma.hairstyle.findMany();

  return (
    <div className="page-container book-page">
      <div className="container section">
        <div className="book-header">
          <h1>Request an Appointment</h1>
          <p>Select your desired service, preferred stylist, and a convenient time.</p>
        </div>
        <div className="book-content">
          <BookingForm 
            services={services} 
            hairstyles={hairstyles} 
            defaultServiceId={resolvedParams.service}
            defaultHairstyleId={resolvedParams.hairstyle}
          />
        </div>
      </div>
    </div>
  );
}
