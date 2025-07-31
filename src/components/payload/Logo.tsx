import React from 'react';
import Image from 'next/image';
import logo from '@/assets/admin-logo.png';

export const Logo = () => (
  <Image src={logo} alt="Admin Logo" width={150} height={50} />
);
