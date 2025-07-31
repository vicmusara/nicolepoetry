import React from 'react';
import Image from 'next/image';
import icon from '@/assets/admin-icon.png';

export const Icon = () => (
  <Image src={icon} alt="Admin Icon" width={32} height={32} />
);
