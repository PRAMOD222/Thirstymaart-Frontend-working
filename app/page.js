"use client"
import React, { useState, useEffect } from 'react'
import CustomSlider from './components/Slider';
import Footer from './components/Footer';
import { useUser } from './components/UserContext.js';

import { FiThumbsUp, FiPhoneCall } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaRegShareSquare } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"




const slides = ['./Home-Page-b1.png', './Home-Page-b1.png', './Home-Page-b1.png'];
const slideTitle = [];



const sponserdAdd = ['./addbanner.png', './addbanner.png', './addbanner.png'];

const Page = () => {


  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  

  const [selectedCategory, setSelectedCategory] = useState('');

  const { setUserIdFromResponse } = useUser();
  

  // Function to handle the change in the selected category
  const handleCategoryChange = async  (value) => {
    console.log(value);
    
    try {
      const response = await fetch(`http://localhost:3001/api/products/category/${value}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setProducts(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to make the API call with the selected category
  



  const handleClickTrack = async (product, buttonName) => {
    try {
      const requestData = {
        productId: product._id,
        buttonName: buttonName,
      };

      // Replace 'your-api-endpoint' with your actual API endpoint
      const response = await fetch('http://localhost:3001/api/analysis/track-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Handle the API response as needed
        console.log('API response:', data);
      } else {
        // Handle errors if necessary
        console.error('Failed to share product');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };



  const fetchCategory = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories/trending');
      if (!response.ok) {
        throw new Error('Failed to fetch Category');
      }
      const categories = await response.json();
      setCategory(categories);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products/list');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, []);

  useEffect(() => {

    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mediaQuery.matches);

    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const startIndex = 0;
  const endIndex = 6;

  const currentProducts = products.slice(startIndex, endIndex);

  const handleButtonClick = (vendor) => {
    setUserIdFromResponse(vendor);
  };

  return (
    <div className='container md:px-10 lg:px-10 xl:px-30 px-4'>

      <Navbar />
      <SearchBar />
      <div className='md:flex lg:flex md:py-10 lg:py-10'>
        <div className='md:w-[60%] lg:w-1/2 pt-5 md:px-2 lg:px-2 md:pt-0 lg:pt-0'>
          <CustomSlider slides={slides} slideTitle={slideTitle} />
        </div>


        <div className={`gap-2 grid 
        grid-cols-3 grid-rows-3 
        md:grid-cols-3 md:grid-rows-3 md:w-[40%] md:px-2 md:pt-0
        lg:grid-cols-6 lg:grid-rows-3 lg:w-1/2 pt-5 lg:px-2 lg:pt-0 `}>
          {category.slice(0, isMobile ? 9 : 18).map((item, index) => (
            <div key={index} className="md:h-28 border lg:pt-2 lg:px-4 px-2 pt-1  border-gray-300 rounded-md flex flex-col items-center justify-center text-center">
              <img src={item.categoryImage} alt={`Image ${index + 1}`} className='md:w-[70%]' />
              <p className={`font-bold text-xs text-sky-500 overflow-hidden lg:p-2 p-1 text-center`}>{item.categoryName}</p>
            </div>
          ))}
        </div>



        {/* {isMobile ?

          <div className="grid grid-cols-3 grid-rows-3 md:grid-cols-6 md:grid-rows-3 lg:grid-cols-6 lg:grid-rows-3 gap-2 md:w-1/2 lg:w-1/2 pt-5 md:px-2 lg:px-2 md:pt-0 lg:pt-0 ">
            <div className="border pt-2 px-4  border-gray-300 rounded-md flex flex-col items-center justify-center text-center ">
              <img className='' src='./homecat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Home Decore</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./hospitalcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Hospital Medical</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./estateagentcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Estate Agent</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./cunstructioncat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Construction Material</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./electronicscat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Electronics Electricals</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./cunsultantcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Consultants</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./homecat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Home Decor</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./hospitalcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Hospital Medical</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./estateagentcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Estate Agent</p>
            </div>
          </div>
          :
          <div className="grid grid-cols-3 grid-rows-3 md:grid-cols-6 md:grid-rows-3 lg:grid-cols-6 lg:grid-rows-3 gap-2 md:w-1/2 lg:w-1/2 pt-5 md:px-2 lg:px-2 md:pt-0 lg:pt-0 ">
            
            <div className="border pt-2 px-4  border-gray-300 rounded-md flex flex-col items-center justify-center text-center ">
              <img className='' src='./homecat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Home Decore</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./hospitalcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Hospital Medical</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./estateagentcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Estate Agent</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./cunstructioncat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Construction Material</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./electronicscat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Electronics Electricals</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./cunsultantcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Consultants</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./homecat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Home Decor</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./hospitalcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Hospital Medical</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./estateagentcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Estate Agent</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./cunstructioncat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Construction Material</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./electronicscat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Electronics Electricals</p>
            </div>
            <div className="border pt-2  border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./cunsultantcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Consultants</p>
            </div>
            <div className="border pt-2 border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1 ">
              <img src='./homecat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Home Decor</p>
            </div>
            <div className="border pt-2 border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./hospitalcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Hospital Medical</p>
            </div>
            <div className="border pt-2 border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./estateagentcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Estate Agent</p>
            </div>
            <div className="border pt-2 border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./cunstructioncat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Construction Material</p>
            </div>
            <div className="border pt-2 border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./electronicscat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Electronics Electricals</p>
            </div>
            <div className="border pt-2 border-gray-300 rounded-md flex flex-col items-center justify-center text-center px-4 py-1">
              <img src='./cunsultantcat.png' alt="Category Image" />
              <p className={` font-bold text-xs text-sky-500 overflow-hidden p-2 text-center`}>Consultants</p>
            </div>
          </div>} */}


      </div>
      <div className="sponserdAdd p-5">
        <CustomSlider slides={sponserdAdd} slideTitle={" "} />
      </div>


      <div className="topbusinesses my-5">
        <div className="flex justify-between">
          <div>
            <h2 className='text-3xl font-bold text-gray-500'>Top Rated Businesses</h2>
            <p className='text-sm text-gray-500 font-semibold'>They are THIRSTY to establish connections</p>
          </div>
          <div className='flex'>
            <FiThumbsUp className='text-4xl text-sky-400 mx-2 mt-1' />
            <p className='text-sm font-bold text-gray-500 flex align-middle'>Trusted by <br /> Thirsty Maart </p>
          </div>
        </div>
        <div className="">
          <ul className="lg:flex my-5 hidden ">
            {category.slice(0, 6).map((item, index) => (
              <li key={index} onClick={() => handleCategoryChange(item.categoryName)} className='text-center text-sm text-gray-500 font-semibold w-full border border-gray-300 cursor-pointer active:border-sky-400 lg:px-6 md:px-4 py-2 rounded-md m-2'>{item.categoryName}</li>

            ))}

          </ul>

          <div className="block  lg:hidden">
            <Select >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {category.slice(0, 6).map((item, index) => (
                    <SelectItem key={index} value={item.categoryName.toString()} onClick={() => handleCategoryChange(item.categoryName)}>
                      {item.categoryName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className='products'>
        <section className="text-gray-600 body-font">
          <div className="py-10">
            <div className="grid gap-y-10 gap-x-4 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 grid-cols-1 grid-rows-3 ">
              {currentProducts.map((product) => (
                <div key={product._id} className="w-full border border-gray-200 rounded-lg p-2">
                  <a className="block relative rounded overflow-hidden">
                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
                  </a>
                  <div className="mt-4 flex justify-between">
                    <h3 className="text-gray-500 text-xl tracking-widest title-font mb-1">{product.name}</h3>
                    <h2 className="text-gray-600 title-font text-sm font-medium">4.0 Rating</h2>
                  </div>

                  <div className='flex justify-between border-b border-gray-300 pb-4'>
                    <h2 className='text-xs'><AiFillHeart className='text-sky-500 inline mr-1 text-xl' />Rajarampuri Kolhapur</h2>
                  </div>

                  <div className="description py-2">
                    <p className='text-xs'>{product.description}</p>
                  </div>
                  <div className="buttons flex justify-between">
                    <div className="contacts flex justify-between">
                      <button onClick={() => handleClickTrack(product, 'call')} className=' bg-sky-500 text-white rounded-md px-2 py-1 whitespace-nowrap'><FiPhoneCall className='inline' />+91 00000 00000</button>
                      <button onClick={() => handleClickTrack(product, 'whatsapp')} className='border border-gray-300 rounded-lg px-2 py-1 mx-2'><IoLogoWhatsapp className='inline text-green-600' />Chat</button>
                    </div>
                    <div className="share">
                      <button onClick={() => handleClickTrack(product, 'share')} className=' border border-gray-300 rounded-lg px-2 py-1'><FaRegShareSquare className='inline' />Share</button>
                    </div>
                  </div>
                  <div className="more text-xs text-gray-500 flex justify-between py-4">
                    <Link href={`/profile`} onClick={handleButtonClick(product.token)} className='text-sky-500 border-b-2 border-sky-300'>More from John Doe<MdKeyboardDoubleArrowRight className='inline text-xl' /></Link>
                    <p>responds in less than <span className='text-sky-400 font-bold'>5 min</span></p>
                  </div>
                </div>
              ))}


            </div>
            <div className="flex justify-center my-4">
              <a href='/category' className="inline-flex items-center bg-sky-500 border-0 focus:outline-none hover:bg-sky-400 rounded text-base p-5 md:mt-0 text-white">See More  <AiOutlineArrowRight className='ml-2' /></a>

            </div>

          </div>
        </section>
      </div>

      <Footer/>

    </div>
  )
}

export default Page


