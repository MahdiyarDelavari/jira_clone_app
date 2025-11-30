"use client";
import { getCurrent } from '@/features/auth/actions';
import { SignUpCard } from '@/features/auth/components/SignUpCard';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  const user = await getCurrent();
    if (user) redirect('/');
  return (
    <SignUpCard/>
  )
}

export default page