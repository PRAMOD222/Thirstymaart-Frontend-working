"use client"
import React, { useState, useEffect } from 'react'
import { LuLayoutDashboard } from 'react-icons/lu';
import { SiGoogleanalytics } from 'react-icons/si';
import { FaRegUser, FaEdit } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { BsGear } from 'react-icons/bs';
import { PiChatsLight, PiHandCoinsBold } from 'react-icons/pi';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { useUser } from '../components/UserContext.js';


const page = () => {


  const { setUserIdFromResponse } = useUser();

    return (
        <div className="flex flex-col bg-clip-border h-screen w-[20rem] p-4 bg-sky-400 text-white fixed">
            <div className=''>
                <div className=''>
                    <img className='w-max m-auto' src="https://dummyimage.com/180x100" alt="" />
                </div>

                <div className="mb-2 p-4">
                    <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white"> <MdOutlineKeyboardDoubleArrowLeft className='inline text-2xl' />Thirsty Mart</h5>
                </div>
                <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-white">
                    <div role="button" tabIndex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-sky-500 focus:text-sky-500 active:text-sky-500 outline-none">
                        <div className="grid place-items-center mr-4">
                            <LuLayoutDashboard />
                        </div>
                        <a href="/dashboard">Dashboard</a>
                    </div>
                    <div role="button" tabIndex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-sky-500 focus:text-sky-500 active:text-sky-500 outline-none">
                        <div className="grid place-items-center mr-4">
                            <SiGoogleanalytics />
                        </div><a href="/dashboard/enquiries">Enquiries</a>
                    </div>
                    <div role="button" tabIndex="0" className="group flex items-center w-full pl-3 p-1 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-sky-500 focus:text-sky-500 active:text-sky-500 outline-none">
                        <div className="  grid place-items-center mr-4">
                            <FaRegUser />
                        </div>
                        <div className='flex justify-between items-center w-full'>
                            <a href="/profile" onClick={()=>{
                                const token = localStorage.getItem('TMtoken')
                                console.log(token);
                                setUserIdFromResponse(token);
                            }} className=''>Profile</a><a href="/dashboard/editprofilehome" className=' p-2 rounded-md transition-all text-blue-50 pl-3 group-hover:text-yellow-500 hover:scale-150'><FaEdit /></a>
                        </div>
                        <div className="grid place-items-center ml-auto justify-self-end">
                            {/* <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full" style={{ opacity: 1 }}>
                                <span className="">14</span>
                            </div> */}
                        </div>
                    </div>
                    <div role="button" tabIndex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-sky-500 focus:text-sky-500 active:text-sky-500 outline-none">
                        <div className="grid place-items-center mr-4">
                            <IoMdAnalytics />
                        </div>Keyword Analysis
                    </div>
                    <div role="button" tabIndex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all bg-yellow-400 text-sky-500 hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-sky-500 focus:text-sky-500 active:text-sky-500 outline-none">
                        <div className="grid place-items-center mr-4">
                            <PiHandCoinsBold />
                        </div>Personalised Offers
                    </div>

                </nav>
                <div className="mb-2 p-4">
                    <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white">Help</h5>
                </div>
                <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-white">
                    <div role="button" tabIndex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-sky-500 focus:text-sky-500 active:text-sky-500 outline-none">
                        <div className="grid place-items-center mr-4">
                            <BsGear />
                        </div>
                        Settings
                    </div>
                    <div role="button" tabIndex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-sky-500 focus:text-sky-500 active:text-sky-500 outline-none">
                        <div className="grid place-items-center mr-4">
                            <PiChatsLight />
                        </div>Suport
                    </div>
                </nav>
            </div>
        </div>
    )
}


export default page
