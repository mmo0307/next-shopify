import { Fragment, useContext } from 'react';
import { CartContext } from '@app/context/shopContext';
import { formatter } from '@app/utils/helpers';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardCart({ cart }: any) {
  const { cartOpen, setCartOpen, cartTotal } = useContext(CartContext);

  console.log('cart=>', cart);

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => setCartOpen(!cartOpen)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          Shopping cart
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                            onClick={() => setCartOpen(false)}
                          >
                            <span className='absolute -inset-0.5' />
                            <span className='sr-only'>Close panel</span> X
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='-my-6 divide-y divide-gray-200'
                          >
                            {cart?.map((product: any) => (
                              <li key={product.id} className='flex py-6'>
                                <div className='relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                  <Image
                                    src={product.image}
                                    alt={product.id}
                                    layout={'fill'}
                                    objectFit={'cover'}
                                  />
                                </div>

                                <div className='ml-4 flex flex-1 flex-col'>
                                  <div>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                      <h3>
                                        <Link
                                          href={`/products/${product.title}`}
                                        >
                                          {product.title}
                                        </Link>
                                      </h3>
                                      <p className='ml-4'>
                                        {formatter.format(product.price)}
                                      </p>
                                    </div>
                                    <p className='mt-1 text-sm text-gray-500'>
                                      {product.options.Title}
                                    </p>
                                    <p className='mt-1 text-sm text-gray-500'>
                                      Size - {product.options.Size}
                                    </p>
                                    <p className='mt-1 text-sm text-gray-500'>
                                      Color - {product.options.Color}
                                    </p>
                                  </div>
                                  <div className='flex flex-1 items-end justify-between text-sm'>
                                    <p className='text-gray-500'>
                                      Qty {product.quantity}
                                    </p>

                                    <div className='flex'>
                                      <button
                                        type='button'
                                        className='font-medium text-gray-500 hover:text-gray-800'
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {cart.length && (
                      <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                        <div className='flex justify-between text-base font-medium text-gray-900'>
                          <p>Subtotal</p>
                          <p>{formatter.format(cartTotal)}</p>
                        </div>
                        <p className='mt-0.5 text-sm text-gray-500'>
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className='mt-6'>
                          <Link
                            href='/'
                            className='flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm bg-black hover:bg-gray-800'
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                          <p>
                            or&nbsp;
                            <button
                              type='button'
                              className='font-medium text-gray-600 hover:text-gray-800'
                              onClick={() => setCartOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden='true'> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
