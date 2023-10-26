import Link from 'next/link';
import { formatter } from '@app/utils/helpers';
import Image from 'next/image';

function ProductCard({ product }: any) {
  const { title, handle, priceRange } = product;

  const { altText, originalSrc } = product.images.edges[0].node;

  const {
    minVariantPrice: { amount: minAmount },
    maxVariantPrice: { amount: maxAmount }
  } = priceRange;

  return (
    <Link href={`/products/${handle}`} className='group'>
      <div className='w-full bg-gray-200 rounded-3xl overflow-hidden'>
        <div className='relative group-hover:opacity-75'>
          <img
            src={originalSrc}
            alt={altText || originalSrc}
            className='w-fit h-fit'
          />
        </div>
      </div>
      <h3 className='mt-4 text-log font-medium text-gray-900'>{title}</h3>
      <p className='mt-1 text-sm text-gray-700'>
        {formatter.format(minAmount)} - {formatter.format(maxAmount)}
      </p>
    </Link>
  );
}

export { ProductCard };
