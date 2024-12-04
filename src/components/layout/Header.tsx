'use client';
import Link from 'next/link';
import React, { useState } from 'react';

import Logo from '../ui/Logo';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <div className='flex justify-between items-center h-[100px] px-4 lg:px-20 mb-0 border-b border-white'>
      <div className='flex'>
        <Link href={'https://poidh.xyz'}>
          <Logo />
        </Link>
      </div>
      <ConnectButton />
    </div>
  );
};

export default Header;
