'use server';

import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (user) {
    const cookieStore = await cookies();
    cookieStore.set('userId', user.id, { httpOnly: true, path: '/' });
    redirect('/dashboard');
  } else {
    throw new Error('User not found. Please sign up first.');
  }
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  
  let user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    throw new Error('Email already in use. Please login.');
  }
  
  user = await prisma.user.create({ data: { email, name, role: 'CUSTOMER' } });

  const cookieStore = await cookies();
  cookieStore.set('userId', user.id, { httpOnly: true, path: '/' });
  redirect('/dashboard');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('userId');
  redirect('/');
}
