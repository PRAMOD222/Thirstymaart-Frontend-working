"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Line from "../components/LineH";
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaRegShareSquare } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { BsClockHistory } from 'react-icons/bs';
import { LiaHandHoldingHeartSolid } from 'react-icons/lia';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ImHeart } from 'react-icons/im';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ReactStars from 'react-rating-star-with-type'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useUser } from '../components/UserContext.js';


const ProfileNav = () => {

  const [vendorInfo, setVendorInfo] = useState([]);
  const [search, setsearch] = useState('');
  const { userId } = useUser();


  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setpassword(e.target.value)
    }
  }

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchVendorInfo = async () => {
      try {
        // Get the TMtoken from local storage
        const Token = userId


        const response = await fetch('http://localhost:3001/api/vendorinfo/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVendorInfo(data);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVendorInfo();

  }, []);
  let companyName = vendorInfo.companyName
  if (vendorInfo.companyName) {
    companyName = vendorInfo.companyName.toUpperCase();
  }


  return (
    <div className='md:container lg:container xl:container'>
      <nav className='flex justify-between items-center flex-col md:flex-row lg:flex-row'>
        <div className='flex items-center flex-col md:flex-row lg:flex-row'>
          <div className="logo border mg:w-[10vw] lg:w-[10vw] w-[50%]">
            <Image
              src="/tflogo.png"
              width={100}
              height={100}
              alt="Picture of the author"
              className='object-cover w-full'
            />
          </div>
          <div className='md:mx-4 lg:mx-4'>
            <div className="flex md:items-center lg:items-center items-center text-gray-600 flex-col md:flex-row lg:flex-row ">
              <div className='text-center md:text-start lg:text-start'>
                <h2 className='md:text-3xl lg:text-3xl text-2xl font-bold md:whitespace-nowrap'>
                  {companyName}
                  {/* TF STRATEGIES PRIVATE LIMITED */}
                </h2>
                <h3 className='text-xl'>Category:
                  {`${vendorInfo.category} `}
                  {/* Digital Marketing, Graphics Design */}
                </h3>
              </div>
              <div className="md:mx-6 lg:mx-6 flex  md:flex-col flex-row lg:flex-col justify-center items-center md:items-start lg:items-start">
                <LiaHandHoldingHeartSolid className='text-2xl text-sky-500 ' />
                <p className='font-bold text-xs flex-1'>Conected to  55 hearts Recently</p>
              </div>
            </div>
            {/* <Line /> */}
            <Separator/>
            <div className="flex justify-between flex-col md:flex-row lg:flex-row">
              <div className="ratings flex justify-center items-center text-gray-600 flex-1 whitespace-nowrap mr-2 my-2 md:my-0 lg:my-0">
                <div className='flex items-center text-xl'>
                  <span className='text-xl'>4.0</span>
                  <ReactStars
                    value={4.5}
                    size={24}
                    isEdit={false}
                    activeColor={"#FFCE00"}
                  />
                  <span className='text-xs'>(1029 Ratings)</span>
                </div>
              </div>
              <button className='flex-1  bg-sky-500 text-white rounded-md px-2 py-1  whitespace-nowrap my-2 md:my-0 lg:my-0'><FiPhoneCall className='inline' />
                {vendorInfo.phone}
              </button>
              <button className='flex-1 border border-gray-300 rounded-lg px-2 py-1 md:mx-2 lg:mx-2 mx-0 my-2 md:my-0 lg:my-0'><IoLogoWhatsapp className='inline text-green-600' />Chat</button>
              <button className='flex-1 border border-gray-300 rounded-lg px-2 py-1 my-2 md:my-0 lg:my-0'><FaRegShareSquare className='inline text-sky-500' />Share</button>
            </div>
          </div>
        </div>
        <div className='md:mx-4 lg:mx-4  text-sm font-bold text-gray-500 flex flex-col'>
          <div className="flex items-center ">
            <BsClockHistory className='text-2xl text-sky-500 mx-1 font-bold' />
            <h2 className='flex-1'>
              {vendorInfo.workingHour}
            </h2>
          </div>
          <div className="flex items-center my-4">
            <ImHeart className='text-2xl text-sky-500 mx-1' />
            <h2 className='flex-1'>

              {vendorInfo.address}
            </h2>
          </div>
          <button className=' bg-amber-500 hover:bg-orange-400 text-white rounded-md px-6  whitespace-nowrap text-xl py-2'>ENQUIRE NOW</button>
        </div>
      </nav>




      <nav className=" p-4">
        <div className="container mx-auto flex justify-between items-center">


          <div className="hidden md:flex  space-x-4 w-full justify-between text-xl font-semibold text-gray-500">
            <Link href="#"> Home </Link>
            <Link href="#">About</Link>
            <Link href="#">Products/Services</Link>
            <Link href="#">Why Us</Link>
            <Link href="#">Contact</Link>
          </div>

          <div className="md:hidden w-full flex justify-center">


            <Select>
              <SelectTrigger className="w-[180px] ">
                {/* <SelectValue placeholder="Select a fruit" /> */}
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Home</SelectLabel>
                  <SelectItem value="About ">About Us</SelectItem>
                  <SelectItem value="Product">Product/Services</SelectItem>
                  <SelectItem value="Why Us">Why Us</SelectItem>
                  <SelectItem value="Contact">Contact Us</SelectItem>
                  <SelectItem value="Search">Search</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>



           
          </div>
        </div>
      </nav>





    </div>
  )
}

export default ProfileNav
/*

*/ 