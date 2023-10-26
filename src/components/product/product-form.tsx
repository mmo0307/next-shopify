'use client';
import { useContext, useState } from 'react';
import { formatter } from '@app/utils/helpers';
import { ProductOptions } from '@app/components/product/product-options';
import { CartContext } from '@app/context/shopContext';

function ProductForm({ product }: any) {
  const { addToCart } = useContext(CartContext);

  const { variants } = product;

  const allVariants = variants?.edges?.map(({ node }: any) => {
    const allOptions: any = {};

    node?.selectedOptions?.map(({ name, value }: any) => {
      allOptions[name] = value;
    });

    return {
      id: node.id,
      title: product.title,
      price: node.price.amount,
      image: node.image.url,
      options: allOptions,
      quantity: 1
    };
  });

  const defaultvalues: any = {};

  product?.options?.map(({ name, values }: any) => {
    defaultvalues[name] = values[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(allVariants[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultvalues);

  const setOptions = (name: string, values: string) => {
    setSelectedOptions((prevState: any) => ({
      ...prevState,
      [name]: values
    }));

    const selection = {
      ...selectedOptions,
      [name]: values
    };

    allVariants.map((item: any) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item);
      }
    });
  };

  return (
    <div className='rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3'>
      <h2 className='text-2xl font-bold'>{product.title}</h2>
      <span className='pb-6'>
        {formatter.format(variants.edges[0].node.price.amount)}
      </span>
      {product.options.map(({ name, values }: any) => (
        <ProductOptions
          key={`key-${name}`}
          name={name}
          values={values}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
        />
      ))}
      <button
        onClick={() => addToCart(selectedVariant)}
        className='bg-black rounded-lg text-white px-2 py-3 hover:bg-gray-800'
      >
        Add To Card
      </button>
    </div>
  );
}

export { ProductForm };
