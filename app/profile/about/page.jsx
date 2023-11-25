"use client"
import React, { useState, useEffect } from 'react'
import { Separator } from "@/components/ui/separator"
import Image from 'next/image';
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
import ReactStars from 'react-rating-star-with-type'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';


const page = () => {


    const onRate = (nextValue) => {
        setStar(nextValue)
    }
    const [star, setStar] = useState();
    const [products, setProducts] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const productsPerPage = 5;

    useEffect(() => {

        const fetchVendorProducts = async () => {
            try {
                // Get the Bearer token from local storage
                const Token = localStorage.getItem('TMtoken');

                // Make the API call with the token in the Authorization header
                const response = await fetch('http://13.234.240.153:3002/api/products/vendorproducts', {
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

        fetchVendorProducts();
    }, []);

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
        <div>
            <div className="flex flex-wrap -m-4">
                {products.slice(startIndex, startIndex + productsPerPage).map((product) => (
                    <div key={product._id} className="lg:w-[20%] md:w-1/2 p-4 w-full">
                        <a className="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.image} />
                        </a>
                        <div className="mt-4">
                            <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Min Qty: 10</h3>
                            <p className="mt-1 text-sky-500 cursor-pointer underline">Enquire Now</p>
                        </div>
                    </div>
                ))}
            </div>

            <Separator className="my-4" />

            <div className='flex flex-col lg:flex-row mt-20 text-gray-500'>
                <div className=" mr-8">
                    <h2 className='text-3xl font-bold  mb-6'>Introduction</h2>
                </div>
                <div className="lg:ml-8">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.<br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>
                </div>
            </div>

            <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-8 md:gap-4 gap:4'>
                <div className='p-4 m-2 pl-0 ml-0 text-gray-500'>
                    <Image
                        src="/vision.png"
                        width={60}
                        height={60}
                        alt="Picture of the author"
                        className='object-cover w-[26%] p-2'
                    />
                    <h2 className='text-2xl font-semibold my-2'>Vision</h2>
                    <p className="text-justify text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>
                    <Separator className="my-4 " />
                </div>
                <div className='p-4 m-2 pl-0 ml-0 text-gray-500'>
                    <Image
                        src="/mision.png"
                        width={60}
                        height={60}
                        alt="Picture of the author"
                        className='object-cover w-[26%] p-2'
                    />
                    <h2 className='text-2xl font-semibold my-2'>Mission</h2>
                    <p className="text-justify text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>
                    <Separator className="my-4 " />
                </div>
                <div className='p-4 m-2 pl-0 ml-0 text-gray-500'>
                    <Image
                        src="/value.png"
                        width={60}
                        height={60}
                        alt="Picture of the author"
                        className='object-cover w-[26%] p-2'
                    />
                    <h2 className='text-2xl font-semibold my-2'>Value</h2>
                    <p className="text-justify text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>
                    <Separator className="my-4 " />
                </div>


            </div>

            <div className="review text-gray-500">
                <div className='flex justify-between '>
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

                <div>
                    <span className="border border-gray-300 p-1 rounded " onClick={handlePrev}>
                        <MdOutlineKeyboardArrowLeft className="inline text-lg w-max h-max" />
                    </span>
                    <span className="border border-gray-300 p-1 rounded mx-4" onClick={handleNext}>
                        <MdOutlineKeyboardArrowRight className="inline text-lg w-max h-max" />
                    </span>
                </div>

                <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-8 md:gap-4 gap:4'>
                    <div className='p-4 m-2 pl-0 ml-0'>
                        <p className="text-justify text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
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
                    <div className='p-4 m-2 pl-0 ml-0'>
                        <p className="text-justify text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
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
                    <div className='p-4 m-2 pl-0 ml-0'>
                        <p className="text-justify text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
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

                <div className='flex my-10'>
                <button className=' bg-amber-500 hover:bg-orange-400 text-white rounded-sm px-8  whitespace-nowrap text-xl py-1 mr-6'>ENQUIRE NOW</button>
                <button className=' bg-sky-500 hover:bg-sky-400 text-white rounded-sm px-8  whitespace-nowrap text-xl py-1 mx-6'>TAP TO CALL</button>
                <button className=' bg-green-500 hover:bg-green-400 text-white rounded-sm px-8  whitespace-nowrap text-xl py-1 mx-6'>WHATSAPP</button>
                </div>
            </div>

            <Separator className="my-4 "/>

            <div className="flex justify-center items-center">
                <p className='text-sm font-semibold text-gray-500'>Developed & Managed  By Thirsty Maart 2023  |  All Rights Reserved</p>
            </div>

        </div>
    )
}

export default page
