import { useState } from 'react';
import { Product } from '../../types/productTypes';
import './productCard.scss'; // Import your SCSS file here
import useImageLoader from './hook'
import ProductModal from '../productModal';
import EnquiryModal from '../enquiryModal';


interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image;
  const { image, loading, error } = useImageLoader(imageUrl);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isEnquiryModalOpen, setEnquiryModalOpen] = useState(false); // Ensure this is initially set to false

  const openProductModal = () => {
    setProductModalOpen(true);
  };

  const closeProductModal = () => {
    setProductModalOpen(false);
  };

  const openEnquiryModal = () => {
    setEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setEnquiryModalOpen(false);
  };

  const handleEnquire = (name: string, email: string) => {
    // Handle the enquire action, e.g., send the data to the server
    console.log('Enquiring with Name:', name, 'Email:', email);
  };

  if (loading) {
    return <div className="custom-card loading">Loading...</div>;
  }

  if (error) {
    return <div className="custom-card error">Error: {error.message}</div>;
  }

  if (!image) {
    return null;
  }

  return (
    <div className="custom-card">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-80 flex justify-center items-center">
        <img
          src={image.src}
          alt={product.title}
          className="h-64 w-64 object-cover object-center lg:h-80 lg:w-80 product-image"
        />
      </div>
      <div className='card-content-wrapper'>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 product-title">
              <span aria-hidden="true" />
              {product.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>
          <div className="text-sm font-medium text-gray-900">${product.price}</div>
        </div>
        <div className="mt-2 flex items-center text-sm text-yellow-500">
          {product.rating.rate} ★ ({product.rating.count} reviews)
        </div>
        
      <div className="flex flex-row gap-2 mt-3">
        <button onClick={openProductModal} className='p-1 px-3 bg-sky-300 text-white rounded cursor-pointer hover:bg-sky-600'>View</button>
        <button onClick={openEnquiryModal} className='p-1 px-3 bg-sky-300 text-white rounded cursor-pointer hover:bg-sky-600'>Enquire</button>
      </div>
      </div>

      <ProductModal isOpen={isProductModalOpen} onClose={closeProductModal} product={product} />
      <EnquiryModal isOpen={isEnquiryModalOpen} onClose={closeEnquiryModal} onEnquire={handleEnquire} productTitle={product.title} />
    </div>
  );
}

export default ProductCard;
