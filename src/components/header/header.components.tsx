'use client';
import React, { useContext } from 'react';
import DashboardCart from '@app/components/dashboard-cart/dashboard-cart.components';
import { CartContext } from '@app/context/shopContext';
import Link from 'next/link';

function Header() {
  const { cart, setCartOpen } = useContext(CartContext);

  return (
    <header className='border-b sticky top-0 z-20 bg-white'>
      <div className='flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl'>
        <Link href='/' passHref>
          <span className='text-lg pt-1 font-bold'>Shopify Next Shop</span>
        </Link>
        <a
          className='text-md font-bold cursor-pointer'
          onClick={() => setCartOpen(true)}
        >
          Cart ({cart.length})
        </a>
        <DashboardCart cart={cart} />
      </div>
    </header>
  );
}

export { Header };
