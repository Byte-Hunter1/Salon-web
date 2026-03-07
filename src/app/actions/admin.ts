'use server';

import { PrismaClient } from '@prisma/client';
import { getUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

async function requireAdmin() {
  const user = await getUser();
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
}

export async function updateAppointmentStatus(id: string, status: string) {
  await requireAdmin();
  await prisma.appointment.update({
    where: { id },
    data: { status }
  });
  revalidatePath('/admin');
}
