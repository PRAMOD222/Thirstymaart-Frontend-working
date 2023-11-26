"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUpload from '../../components/ImageUpload'
import withAuth from '../../auth';
import CustomSlider from '../../components/Slider';
import Multiselect from 'multiselect-react-dropdown';
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaRegShareSquare } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { BsClockHistory } from 'react-icons/bs';
import { LiaHandHoldingHeartSolid } from 'react-icons/lia';
import { ImHeart } from 'react-icons/im';
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


const ProfileForm = () => {

  const [formData, setFormData] = useState({
    banner: '',
    banneralt: '',
    nature: '',
    serviceAria: '',
    homeintro: '',
    yearofestablishment: '',
  });
  const [vendorformData, setVendorformData] = useState({
    gstNo: "",
    panNo: "",
    category: [],
    subCategory: [],
    companyName: "",
    workingHour: "",
    address: "",
    logo: ""
  });

  const [vendorInfo, setVendorInfo] = useState([]);
  const [bannerUrl, setBannerUrl] = useState([]);
  const [logoUrl, setLogoUrl] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);



  // -----------------------------------------------------------------------------------------------------------------------------
  // Data send Api
  const handleSubmitHome = async (e) => {
    e.preventDefault();

    try {
      // Get the Bearer token from local storage
      const Token = localStorage.getItem('TMtoken');

      // Make the API call with the token in the Authorization header
      const response = await fetch('http://localhost:3001/api/profile/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        // Optionally, you can update the state or perform other actions
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleSubmitVendorinfo = async (e) => {
    e.preventDefault();

    try {
      // Get the Bearer token from local storage
      const Token = localStorage.getItem('TMtoken');

      // Make the API call with the token in the Authorization header
      const response = await fetch('http://localhost:3001/api/vendorinfo/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        // Optionally, you can update the state or perform other actions
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };


  // -----------------------------------------------------------------------------------------------------------------------------
  // data recive api
  const fetchVendorInfo = async () => {
    try {
      // Get the TMtoken from local storage
      const Token = localStorage.getItem('TMtoken');


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

  const fetchCategory = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories/list');
      if (!response.ok) {
        throw new Error('Failed to fetch Category');
      }
      const categories = await response.json();
      setCategory(categories);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };


  // -----------------------------------------------------------------------------------------------------------------------------
  // other functions
  const selectedValueDecorator = (selectedItem) => {
    const maxLength = 10; // You can adjust this based on your preference
    return selectedItem && selectedItem.length > maxLength
      ? `${selectedItem.substring(0, maxLength)}...` // Display a shortened version
      : selectedItem;
  };

  const handleImageUploadSuccess = (bannerPath) => {
    // Update the formData state with the bannerPath
    setBannerUrl(bannerPath)
    setFormData({
      ...vendorformData,
      banner: bannerPath,
    });
  };

  const handleLogoUploadSuccess = (logoPath) => {
    // Update the formData state with the bannerPath
    setLogoUrl(logoPath)
    setFormData({
      ...formData,
      logo: logoPath,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = currentYear; year >= currentYear - 50; year--) {
      years.push(<option key={year} value={year}>{year}</option>);
    }

    return years;
  };

  useEffect(() => {
    fetchVendorInfo();
    fetchCategory();
  }, []);



  return (
    <div className=''>
      <div className='w-[90%] m-auto'>
        <h2 className='text-gray-600 py-2 text-2xl font-bold'>Vendor Profile Instructions</h2>
        <p className='text-gray-500 py-1 text-sm'>
          Welcome to your Vendor Profile page setup! Please follow these instructions carefully to ensure your profile reflects your business accurately. Be honest with your data, and upload relevant images. Fill in the fields correctly, and let's get your page looking great!
        </p>
      </div>

      <Separator className="my-4" />

      <section className='mx-4 w-full flex justify-center '>
        <form onSubmit={handleSubmitVendorinfo} className='w-[90%] '>
          <h2 className='text-gray-500 py-2 text-2xl font-bold'>Provide Some basic information</h2>

          <div className="relative mb-4">
            <label htmlFor="gstno" className="leading-7 text-sm text-gray-600">GST No.</label>
            <input value={vendorformData.gstNo} onChange={handleChange} placeholder='Enter Your GST No' type="text" id="gstno" name="gstno" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          <div className="relative mb-4">
            <label htmlFor="panno" className="leading-7 text-sm text-gray-600">Pan No.</label>
            <input value={vendorformData.panNo} onChange={handleChange} placeholder='Enter Your Pan No.' type="text" id="panno" name="panno" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          <div className="relative mb-4">
            <label htmlFor="cat" className="leading-7 text-sm text-gray-600">Select three of the Categories that matches with your Business</label>
            <Multiselect id='cat' name="cat"
              placeholder="Select Categories"
              displayValue="categoryName"
              onKeyPressFn={function noRefCheck() { }}
              onRemove={function noRefCheck() { }}
              onSearch={function noRefCheck() { }}
              options={category}
              selectionLimit={3}
              selectedValueDecorator={selectedValueDecorator}
              onSelect={(selectedList, selectedItem) => {
                let sublist = []
                let catnamelist = []
                selectedList.forEach(element => {
                  catnamelist.push(element.categoryName);
                  sublist.push.apply(sublist, element.subCategories);
                });
                vendorformData.category = catnamelist;
                setSelectedCategories(selectedList);
                setSelectedSubCategories(sublist)
              }}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="subcat" className="leading-7 text-sm text-gray-600">Select the Subcategories that matches with your Business</label>
            <Multiselect id='subcat' name="subcat"
              placeholder="Select Subcategories"
              isObject={false}
              onKeyPressFn={function noRefCheck() { }}
              onRemove={function noRefCheck() { }}
              onSearch={function noRefCheck() { }}
              options={selectedSubCategories}
              onSelect={(selectedList, selectedItem) => {
                vendorformData.subCategory = selectedList;
              }}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="cname" className="leading-7 text-sm text-gray-600">Company Name</label>
            <input value={vendorformData.companyName} onChange={handleChange} placeholder='Enter Your Company Name' type="text" id="cname" name="cname" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          <div className="relative mb-4">
            <label htmlFor="whour" className="leading-7 text-sm text-gray-600">Companies Working Hours for eg - Mon-Sun: 9:00am to 6:00pm</label>
            <input value={vendorformData.workingHour} onChange={handleChange} placeholder='Enter Your Company Name' type="text" id="whour" name="whour" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          <div className="relative mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Company Address</label>
            <input value={vendorformData.address} onChange={handleChange} placeholder='Enter Your Company Address' type="text" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          <div className='my-2'>
            <label htmlFor="banner" className="leading-7 text-sm text-gray-600">Add a logo here which is desplayed on the Navbar </label>
            <ImageUpload onUploadSuccess={handleLogoUploadSuccess} name="banner" />
          </div>

          <div className='flex justify-center'>
            <div className='flex justify-center'>
              <button type="submit" className="text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded text-lg ">Submit</button>
            </div>
          </div>

        </form>
      </section>

      <Separator className="my-4" />

      <div className='md:container lg:container xl:container'>
      <nav className='flex justify-between items-center flex-col md:flex-row lg:flex-row'>
        <div className='flex items-center flex-col md:flex-row lg:flex-row'>
          <div className="logo border mg:w-[10vw] lg:w-[10vw] w-[50%]">
            <img
              src={!logoUrl ? "https://dummyimage.com/1300x540" : vendorInfo.logo} 
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
                  {vendorInfo.companyName}
                </h2>
                <h3 className='text-xl'>Category:
                  {`${vendorInfo.category} `}
                </h3>
              </div>
              <div className="md:mx-6 lg:mx-6 flex  md:flex-col flex-row lg:flex-col justify-center items-center md:items-start lg:items-start">
                <LiaHandHoldingHeartSolid className='text-2xl text-sky-500 ' />
                <p className='font-bold text-xs flex-1'>Conected to  55 hearts Recently</p>
              </div>
            </div>
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

      <Separator className="my-4" />

      <section className='mx-4 w-full flex justify-center '>
        <form onSubmit={handleSubmitHome} className='w-[90%]'>
          <div className='my-2'>
            <label htmlFor="banner" className="leading-7 text-sm text-gray-600">Add a banner here which is desplayed on the home page </label>
            <ImageUpload onUploadSuccess={handleImageUploadSuccess} name="banner" />
          </div>

          <div className="relative mb-4">
            <label htmlFor="banneralt" className="leading-7 text-sm text-gray-600">Banner Alt Text</label>
            <input value={formData.banneralt} onChange={handleChange} placeholder='Banner Alt Text' type="text" id="banneralt" name="banneralt" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          <div className="relative mb-4">
            <label htmlFor="year" className="leading-7 text-sm text-gray-600">Year of Establishment</label>
            <select
              value={formData.yearofestablishment}
              onChange={handleChange}
              id="year"
              name="yearofestablishment"
              className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            >
              <option className='text-sm text-gray-700' value="" disabled>Select a year</option>
              {generateYearOptions()}
            </select>
          </div>

          <div className="relative mb-4">
            <label htmlFor="nature" className="leading-7 text-sm text-gray-600">Nature of Business</label>
            <input value={formData.nature} onChange={handleChange} placeholder='Nature of Business' type="text" id="nature" name="nature" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          <div className="relative mb-4">
            <label htmlFor="serviceAria" className="leading-7 text-sm text-gray-600">Service Aria</label>
            <input value={formData.serviceAria} onChange={handleChange} placeholder='Service Aria' type="text" id="serviceAria" name="serviceAria" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          <div className="relative mb-4">
            <label htmlFor="homeintro" className="leading-7 text-sm text-gray-600">Introduction for home page </label>
            <textarea value={formData.homeintro} onChange={handleChange} id="homeintro" name="homeintro" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-y leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
          <div className='flex justify-center'>
            <button type="submit" className="text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded text-lg ">Submit</button>
          </div>
        </form>
      </section>

      <Separator className="my-4" />

      <div className='flex flex-col lg:flex-row md:flex-row w-[90%] m-auto border '>
        <div className='md:w-[70%] w-full'>
          <CustomSlider slides={!bannerUrl.length ? ["https://dummyimage.com/1300x540"] : [formData.banner]} slideTitle={""} />
        </div>
        <div className='w-full md:w-[30%]'>
          <ul className='h-full flex flex-col justify-between ml-2 text-gray-500'>
            <li className="flex  items-center">
              <Image
                src="/company.png"
                width={60}
                height={60}
                alt="Picture of the author"
                className='object-cover w-[16%] p-2'
              />
              <h2 className="text-sm">Company Name:
                <br /><span className="font-bold">
                  {vendorInfo.companyName}
                  {/* TF STRATEGIES PRIVATE LIMITED */}
                </span></h2>
            </li>
            <li className="flex  items-center">
              <Image
                src="/yearestablish.png"
                width={60}
                height={60}
                alt="Picture of the author"
                className='object-cover w-[16%] p-2'
              />
              <h2 className="text-sm">Year of Establishment:
                <br /><span className="font-bold">
                  {formData.yearofestablishment ? new Date(formData.yearofestablishment).getFullYear() : ''}
                </span></h2>
            </li>
            <li className="flex  items-center">
              <Image
                src="/neaturebuss.png"
                width={60}
                height={60}
                alt="Picture of the author"
                className='object-cover w-[16%] p-2'
              />
              <h2 className="text-sm">Nature of Business:
                <br /><span className="font-bold">{formData.nature}</span></h2>
            </li>
            <li className="flex  items-center">
              <Image
                src="/area.png"
                width={60}
                height={60}
                alt="Picture of the author"
                className='object-cover w-[16%] p-2'
              />
              <h2 className="text-sm">Service Area:
                <br /><span className="font-bold">{formData.serviceAria}</span></h2>
            </li>
            <li className="flex  items-center">
              <Image
                src="/pan.png"
                width={60}
                height={60}
                alt="Picture of the author"
                className='object-cover w-[16%] p-2'
              />
              <h2 className="text-sm">GSTN:
                <br /><span className="font-bold">
                  {vendorInfo.gstNo}
                </span></h2>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="my-4" />



    </div>
  );
};

export default withAuth(ProfileForm, ['vendor']);

