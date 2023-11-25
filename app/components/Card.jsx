// import Image from 'next/image';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const Card = ({ imageUrl, productName }) => {

  return (
    <div className=" rounded-xl relative flex justify-center ">
      <img
        src={imageUrl}
        width={420}
        height={530}
        alt={`Picture of ${productName}`}
        className='object-cover rounded-xl aspect-square'
      />
      <div className='cursor-pointer group bg-sky-500 text-center p-2 rounded absolute bottom-4 w-5/6 text-white'>
        <h2 className='text-xl'>{productName}</h2>
        <span className='cursor-pointer hidden group-hover:block text-xs border-b border-white w-max text-center m-auto font-bold'>Enquire Now <MdKeyboardDoubleArrowRight className='inline'/></span>
      </div>

    </div>
  );
};

export default Card;