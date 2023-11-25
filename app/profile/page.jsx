"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import CustomSlider from '../components/Slider';
import Image from 'next/image';
import Card from '../components/Card'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import ReactStars from 'react-rating-star-with-type'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useUser } from '../components/UserContext.js';


const ProfilePage = () => {



    const { userId } = useUser();
    const [products, setProducts] = useState([]);
    const [vendorInfo, setVendorInfo] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [profilehome, setProfilehome] = useState({});
    const productsPerPage = 4;
    const [star, setStar] = useState();


    const onRate = (nextValue) => {
        setStar(nextValue)
    }



    // Fetch data from the API when the component mounts
    const fetchVendorInfo = async () => {
        try {
            // Get the TMtoken from local storage
            const Token = userId;


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


    const fetchVendorProducts = async () => {
        try {
            // Get the Bearer token from local storage
            const Token = userId

            // Make the API call with the token in the Authorization header
            const response = await fetch('http://localhost:3001/api/products/vendorproducts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchProfilehome = async () => {
        try {
            // Get the Bearer token from local storage
            const Token = userId;

            // Make the API call with the token in the Authorization header
            const response = await fetch('http://localhost:3001/api/profile/gethome', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Token,
                },
            });

            if (response.ok) {
                const data = await response.json();

                // Check if data and profile properties exist
                if (data && data.profile) {
                    setProfilehome(data.profile);
                } else {
                    console.error('Invalid data format:');
                }
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchVendorInfo();
        fetchVendorProducts();
        fetchProfilehome();
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

    return (
        <div className='md:container lg:container ' >
            <div className=' flex flex-col lg:flex-row md:flex-row'>
                <div className='md:w-[70%] w-full'>
                    <CustomSlider slides={[profilehome.banner]} slideTitle={" "} />
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
                                    {profilehome.yearofestablishment ? new Date(profilehome.yearofestablishment).getFullYear() : ''}
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
                                <br /><span className="font-bold">{profilehome.nature}</span></h2>
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
                                <br /><span className="font-bold">{profilehome.serviceAria}</span></h2>
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

            <div className=' mt-10 text-gray-500'>
                <div className='flex flex-col md:flex-row justify-between'>
                    <h2 className='text-3xl font-bold my-4 '>Featured Services</h2>
                    <div>
                        <span className="border border-gray-300 p-1 rounded mx-2" onClick={handlePrev}>
                            <MdOutlineKeyboardArrowLeft className="inline text-lg w-max h-max" />
                        </span>
                        <span className="border border-gray-300 p-1 rounded mx-2" onClick={handleNext}>
                            <MdOutlineKeyboardArrowRight className="inline text-lg w-max h-max" />
                        </span>
                    </div>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 transition-all duration-300 my-2 md:my-0">
                    {products.slice(startIndex, startIndex + productsPerPage).map((product) => (
                        <Card
                            key={product._id}
                            imageUrl={product.image}
                            productName={product.name}
                        />
                    ))}
                    {/* <Card
                        imageUrl='./graphics.jpg'
                        productName="Graphics Design"
                    />
                    <Card
                        imageUrl='./webdev.jpg'
                        productName="Web Development"
                    />
                    <Card
                        imageUrl='./graphic2.png'
                        productName="Graphics Design"
                    />
                    <Card
                        imageUrl='./4414019.jpg'
                        productName="Web Development"
                    /> */}
                </div>
            </div>

            <div className='md:flex lg:flex mt-20 text-gray-500'>
                <div className=" mr-8">
                    <h2 className='text-3xl font-bold  '>Introduction</h2>
                </div>
                <div className=" ml-0 md:ml-8">
                    <p>
                        {profilehome.homeintro}
                    </p>
                </div>
            </div>

            <section className="text-gray-600 body-font">
                <div className=" py-24  text-gray-500">
                    <div className='flex flex-col md:flex-row lg:flex-row justify-between mb-4'>
                        <h2 className='text-3xl font-bold my-4 '>Products / Services</h2>
                        <div>
                            <button className=' bg-amber-500 hover:bg-orange-400 text-white rounded-md px-6  whitespace-nowrap text-xl py-2'>ENQUIRE NOW</button>
                        </div>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {products.slice(0, 10).map((product) => (
                            <div key={product._id} className="lg:w-[20%] md:w-1/2 p-4 w-full">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.image} />
                                </a>
                                <div className="mt-4">
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Starting Price: $100</h3>
                                    <p className="mt-1 text-sky-500 cursor-pointer underline">Enquire Now</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            <div className="review text-gray-500">
                <div className='flex flex-col md:flex-row justify-between '>
                    <h2 className='text-3xl font-bold my-4 '>
                        Reviews
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
                    </h2>

                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className=' bg-sky-500 hover:bg-sky-400 text-white rounded-md px-6  whitespace-nowrap text-xl py-2'>Write a Review</button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Write Your Review Here</DialogTitle>
                                    <DialogDescription>
                                        Tell us About your experience
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <ReactStars
                                            onChange={onRate}
                                            value={0}
                                            size={24}
                                            isEdit={true}
                                            activeColor={"#FFCE00"}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">

                                        <Textarea placeholder="Type your message here."
                                            className="col-span-4" />
                                    </div>

                                </div>
                                <DialogFooter>
                                    <button className=' bg-sky-500 hover:bg-sky-400 text-white rounded-md px-6  whitespace-nowrap text-xl py-2'>Submit</button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* <button className=' bg-sky-500 hover:bg-sky-400 text-white rounded-md px-6  whitespace-nowrap text-xl py-2'>Write a Review</button> */}
                    </div>
                </div>

                <div className='my-2'>
                    <span className="border border-gray-300 p-1 rounded " onClick={handlePrev}>
                        <MdOutlineKeyboardArrowLeft className="inline text-lg w-max h-max" />
                    </span>
                    <span className="border border-gray-300 p-1 rounded mx-4" onClick={handleNext}>
                        <MdOutlineKeyboardArrowRight className="inline text-lg w-max h-max" />
                    </span>
                </div>

                <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-8 md:gap-4 gap:4'>

                    <div className='p-4 m-2 pl-0 ml-0 hidden md:hiden lg:block'>
                        <p className="text-justify text-sm">The consultants provided invaluable insights that not only increased our sales but also optimized our investments. Their expertise is a game-changer for any business seeking strategic guidance.</p>
                        <div className='my-4 py-2'>
                            <h2 className="font-bold ">Ketaki Toro</h2>
                            <h2> Kera Studios</h2>
                        </div>
                        <ReactStars
                            value={4.5}
                            size={24}
                            isEdit={false}
                            activeColor={"#FFCE00"} />
                    </div>

                    <div className='p-4 m-2 pl-0 ml-0 hidden md:block lg:block'>
                        <p className="text-justify text-sm">The custom websites and mobile apps not only look fantastic but work tirelessly to generate leads and drive sales. Results-focused and visually appealing – a winning combination!
                        </p>
                        <div className='my-4 py-2'>
                            <h2 className="font-bold ">Ketaki Toro</h2>
                            <h2> Kera Studios</h2>
                        </div>
                        <ReactStars
                            value={4.5}
                            size={24}
                            isEdit={false}
                            activeColor={"#FFCE00"} />
                    </div>

                    <div className='p-4 m-2 pl-0 ml-0 block md:block lg:block'>
                        <p className="text-justify text-sm">A transformative experience! Our social media presence has never been stronger, thanks to their strategies. Consistency and memorability define their approach – a must for businesses wanting to stand out.
                        </p>
                        <div className='my-4 py-2'>
                            <h2 className="font-bold ">Ketaki Toro</h2>
                            <h2> Kera Studios</h2>
                        </div>
                        <ReactStars
                            value={4.5}
                            size={24}
                            isEdit={false}
                            activeColor={"#FFCE00"} />
                    </div>

                </div>

            </div>

            <div className="contacts text-gray-500">
                <div className='title'>
                    <h2 className='text-3xl font-bold my-4 '>
                        Contacts Us Now
                    </h2>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-4 gap-4">
                    <div>
                        <ul className='text-sm font-bold'>
                            <li className='py-1'><a href="/profile/about">About Us</a></li>
                            <li className='py-1'><a href="/profile/products">Products</a></li>
                            <li className='py-1'><a href="#">Brochur Download</a></li>
                        </ul>


                    </div>
                    <div>
                        <h2 className='font-bold py-4'>FOLLOW US ON</h2>
                        <ul className='text-sm'>
                            <li className='text-sm pt-1 font-semibold'><a href="#">Facebook</a></li>
                            <li className='text-sm pt-1 font-semibold'><a href="#">Instagram</a></li>
                            <li className='text-sm pt-1 font-semibold'><a href="#">YouTube</a></li>
                            <li className='text-sm pt-1 font-semibold'><a href="#">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='font-bold py-4'>TF STRATEGIES PVT. LTD.</h2>
                        <p className='text-sm font-semibold'>
                            Basement No. 4, Lower Ground Floor,
                            Mauni Vihar Apartment, Takala Chowk,
                            Kolhapur 416 008</p>
                    </div>
                    <div>
                        <h2 className='font-bold py-4'>Contact Person</h2>
                        <p className='font-semibold text-sm'>Rahul Toro (CEO)</p>
                        <p className='font-semibold text-sm'>+91 0123456789</p>
                    </div>


                </div>

                <div className='flex flex-col md:flex-row lg:flex-row my-10 justify-evenly'>
                    <button className='my-3 md:my-0 lg:my-0 bg-amber-500 hover:bg-orange-400 text-white rounded-sm px-8  whitespace-nowrap text-xl py-1 md:mr-6'>ENQUIRE NOW</button>
                    <button className='my-3 md:my-0 lg:my-0 bg-sky-500 hover:bg-sky-400 text-white rounded-sm px-8  whitespace-nowrap text-xl py-1 md:mx-6'>TAP TO CALL</button>
                    <button className='my-3 md:my-0 lg:my-0 bg-green-500 hover:bg-green-400 text-white rounded-sm px-8  whitespace-nowrap text-xl py-1 md:mx-6'>WHATSAPP</button>
                </div>
            </div>

            <Separator className="my-4 " />

            <div className="flex justify-center items-center">
                <p className='text-sm font-semibold text-gray-500'>Developed & Managed  By Thirsty Maart 2023  |  All Rights Reserved</p>
            </div>

        </div>
    )
}

export default ProfilePage
