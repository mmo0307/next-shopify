import React, { Fragment } from 'react';
import { getProducts } from '@app/lib/shopify';
import { ProductList } from '@app/components/product/product-list';

const getData = async () => await getProducts();

export default async function Home() {
  const data = await getData();

  return (
    <Fragment>
      <h1 className='text-3xl'>Misha</h1>
      <ProductList products={data} />
    </Fragment>
  );
}
