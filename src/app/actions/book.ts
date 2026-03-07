'use server';

import { PrismaClient } from '@prisma/client';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function createAppointment(formData: FormData) {
  const user = await getUser();
  if (!user) {
    throw new Error('You must be logged in to book an appointment.');
  }

  const serviceId = formData.get('serviceId') as string;
  const hairstyleId = formData.get('hairstyleId') as string;
  const stylist = formData.get('stylist') as string;
  const dateStr = formData.get('date') as string;
  const time = formData.get('time') as string;
  const notes = formData.get('notes') as string;

  if ((!serviceId && !hairstyleId) || !dateStr || !time) {
    throw new Error('Please fill all required fields.');
  }

  const date = new Date(dateStr);

  await prisma.appointment.create({
    data: {
      userId: user.id,
      serviceId: serviceId || null,
      hairstyleId: hairstyleId || null,
      stylist: stylist || 'Any Stylist',
      date,
      time,
      notes,
      status: 'PENDING', // Awaiting admin approval
    }
  });

  // Successful booking, redirect to dashboard
  redirect('/dashboard');
}
