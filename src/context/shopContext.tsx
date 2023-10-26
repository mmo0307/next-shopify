'use client';
import React, { createContext, useEffect, useState } from 'react';
import { createCheckout, updateCheckout } from '@app/lib/shopify';

const CartContext = createContext<any>({});

const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');

  useEffect(() => {
    const getCheckoutId = async () => {
      const checkoutId = localStorage.getItem('checkout_id');

      if (checkoutId) {
        const [cart, checkout] = JSON.parse(checkoutId);

        console.log(cart, checkout);

        setCart(cart);

        setCheckoutId(checkout.id);

        setCheckoutUrl(checkout.webUrl);
      }
    };

    getCheckoutId();
  }, []);

  const addToCart = async (newItem: any) => {
    if (cart.length === 0) {
      setCart([newItem]);

      const newCheckout = await createCheckout(newItem.id, newItem.quantity);

      setCheckoutId(newCheckout.id);

      setCheckoutUrl(newCheckout.webUrl);

      localStorage.setItem(
        'checkout_id',
        JSON.stringify([newItem, newCheckout])
      );
    } else {
      let newCart = [...cart];

      const existingItemIndex = cart.findIndex(item => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        newCart[existingItemIndex].quantity += 1;
      } else {
        newCart = [...cart, newItem];
      }

      setCart(newCart);

      const newCheckout = await updateCheckout(checkoutId, newCart);

      localStorage.setItem(
        'checkout_id',
        JSON.stringify([newCart, newCheckout])
      );
    }
  };

  const cartTotal = cart.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.price),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        checkoutUrl,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const ShopConsumer = CartContext.Consumer;

export { ShopConsumer, CartContext, ShopProvider };
