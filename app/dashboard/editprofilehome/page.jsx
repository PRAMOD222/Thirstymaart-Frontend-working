"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUpload from '../../components/ImageUpload'
import withAuth from '../../auth';
import CustomSlider from '../../components/Slider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"


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
    address: ""
  });

  const [vendorInfo, setVendorInfo] = useState([]);
  const [bannerUrl, setBannerUrl] = useState([]);
  const [category, setCategory] = useState([]);



  const handleImageUploadSuccess = (bannerPath) => {
    // Update the formData state with the bannerPath
    setBannerUrl(bannerPath)
    setFormData({
      ...formData,
      banner: bannerPath,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



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

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = currentYear; year >= currentYear - 50; year--) {
      years.push(<option key={year} value={year}>{year}</option>);
    }

    return years;
  };

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



  useEffect(() => {
    fetchVendorInfo();
    fetchCategory();
  }, []);

  // console.log(profilehome);

  const handleNext = () => {
    const nextIndex = startIndex + 1;
    if (nextIndex + productsPerPage <= products.length) {
      setStartIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    const prevIndex = startIndex - 1;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    }
  };
  const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelect = (value) => {
    // Check if the value is already selected
    if (!selectedValues.includes(value)) {
      // Check if the number of selected values is less than 3
      if (selectedValues.length < 3) {
        // Add the selected value to the array
        setSelectedValues([...selectedValues, value]);
      } else {
        alert('You can only select up to 3 values.');
      }
    }
  };


  return (
    <div className=''>

      <div className='mx-4 w-full flex justify-center '>
        <form onSubmit={handleSubmitHome}>
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
          <button type="submit" className="text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded text-lg w-full">Submit</button>
        </form>
      </div>


      <div className='flex flex-col lg:flex-row md:flex-row'>
        <div className='md:w-[70%] w-full'>
          <CustomSlider slides={!bannerUrl.length ? ["https://dummyimage.com/1300x540"] : [formData.banner]} slideTitle={""} />
        </div>
        <div className='w-full md:w-[30%]'>
          <ul className='h-full border flex flex-col justify-between ml-2 text-gray-500'>
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


      <div className='mx-4 w-full flex justify-center '>
        <form onSubmit={handleSubmitHome}>

          <div className="relative mb-4">
            <label htmlFor="gstno" className="leading-7 text-sm text-gray-600">GST No.</label>
            <input value={vendorformData.gstNo} onChange={handleChange} placeholder='Enter Your GST No' type="text" id="gstno" name="gstno" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          <div className="relative mb-4">
            <label htmlFor="panno" className="leading-7 text-sm text-gray-600">Pan No.</label>
            <input value={vendorformData.panNo} onChange={handleChange} placeholder='Enter Your Pan No.' type="text" id="panno" name="panno" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          {/* <div className="relative mb-4">
            <label htmlFor="category" className="leading-7 text-sm text-gray-600">Add Three Categories separated by a quama “ , ” </label>
            <input value={vendorformData.category} onChange={handleChange} placeholder='Enter Categories' type="text" id="category" name="category" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div> */}

         {/* <Select multiple>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {category.map((item) => (
                  <SelectItem key={item.categoryName} value={item.categoryName}> {item.categoryName} </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}

<div>
      <h2>Selected Values: {selectedValues.join(', ')}</h2>
      <select
        size={5} // Set the number of visible options
        style={{ overflowY: 'auto' }} // Add scrollbar if options exceed the specified size
        onChange={(e) => handleSelect(e.target.value)}
        multiple
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

          <button type="submit" className="text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded text-lg w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(ProfileForm, ['vendor']);

