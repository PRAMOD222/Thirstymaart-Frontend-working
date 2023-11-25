"use client"
import { Separator } from "@/components/ui/separator"
import React from 'react'
import { useState, useEffect } from 'react';


const page = () => {

    const onRate = (nextValue) => {
        setStar(nextValue)
    }
    const [star, setStar] = useState();
    const [products, setProducts] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const productsPerPage = 4;

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
            <div className=" mr-8 text-gray-500">
                <h2 className='text-3xl font-bold  mb-6'>Our Product/Services</h2>
            </div>
            <div className='flex text-gray-500'>
                <div className="border border-gray-300 rounded-sm p-4 mx-4 ">
                    <ul className="whitespace-nowrap font-semibold text-gray-500">
                        <li className="text-sm py-2 px-2">PRODUCT/CATEGORY #1</li>
                        <Separator className="w-[50%]" />
                        <li className="text-sm py-2 px-2">PRODUCT/CATEGORY #2</li>
                        <Separator className="w-[50%]" />
                        <li className="text-sm py-2 px-2">PRODUCT/CATEGORY #3</li>
                        <Separator className="w-[50%]" />
                        <li className="text-sm py-2 px-2">PRODUCT/CATEGORY #4</li>
                        <Separator className="w-[50%]" />
                        <li className="text-sm py-2 px-2">PRODUCT/CATEGORY #5</li>
                        <Separator className="w-[50%]" />
                        <li className="text-sm py-2 px-2">PRODUCT/CATEGORY #6</li>
                        <Separator className="w-[50%]" />
                        <li className="text-sm py-2 px-2">PRODUCT/CATEGORY #7</li>
                        <Separator className="w-[50%]" />
                        <li className="text-sm py-2 px-2">PRODUCT/CATEGORY #8</li>
                        <Separator className="w-[50%]" />
                        <li className="text-sm py-2 px-2">PRODUCT/CATEGORY #9</li>
                        <Separator className="w-[50%]" />
                        <li className="text-sm py-2 px-2">PRODUCT/CATEGORY #10</li>
                        <Separator className="w-[50%]" />
                    </ul>
                </div>

                <div className="border border-gray-300 rounded-sm p-4 mx-4">
                    <h2 className="font-bold mb-1">HERBAL PRODUCTS</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti modi iusto voluptatum esse adipisci, rerum debitis voluptatibus, libero vel quo maxime laudantium! Quod, et cumque libero omnis incidunt quia illum magni a. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, soluta.</p>
                    <div className="flex flex-wrap -m-4">
                        {products.slice(startIndex, startIndex + productsPerPage).map((product) => (
                            <div key={product._id} className="lg:w-[25%] md:w-1/2 p-4 w-full">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.image} />
                                </a>
                                <div className="mt-4 text-center">
                                    <h2 className="text-sky-500 title-font  font-semibold">{product.name}</h2>
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Min Qty: <br/>10</h3>
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Price: <br/>200/- per piece</h3>
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Service: <br/>Pan India</h3>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page
