"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Logo from '../../public/logo.svg'
import { BsCheckCircle } from 'react-icons/bs';
import { MdOutlineRocketLaunch } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { DiGoogleAnalytics } from 'react-icons/di';
import Link from 'next/link';



const Navbar = () => {

    const [dash, setDash] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem('TMtoken')

        if (token) {
            // Parse the JWT token to extract the role
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const role = tokenData.role;

            if (role == "vendor") {
                setDash(true)
            }
            else{
                setDash(false)
            }
    
          }
       
      },[])

    return (
        <div>
            <header className="text-gray-600 body-font navbar">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

                        <span className=""><Image

                            src={Logo}
                            alt="Picture of the author"
                            width={260}
                            className=''
                        // height={500} 
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                        /></span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center test-sm md:text-base ">
                        <Link href="./signup" className="mr-5 hover:text-gray-900 cursor-pointer">
                            <CgProfile className='inline mr-1 text-sky-500 font-bold' />LOGIN/SIGNUP</Link>
                        <a href='/profile' className="mr-5 hover:text-gray-900 cursor-pointer ">
                            <MdOutlineRocketLaunch className='inline mr-1 text-sky-500 font-bold' />
                            Profile</a>

                            {dash ? <a href='/dashboard' className="mr-5 hover:text-gray-900 cursor-pointer">
                            <DiGoogleAnalytics className='text-xl inline mr-1 text-sky-500 font-bold' />
                            Dashboard</a>:<a className="mr-5 hover:text-gray-900 cursor-pointer ">
                            <CgProfile className='inline mr-1 text-sky-500 font-bold' />
                            Account</a>}
                    </nav>
                    <button className="inline-flex items-center bg-sky-500 border-0 py-1 px-3 focus:outline-none hover:bg-sky-400 rounded text-base mt-4 md:mt-0 text-white"> <BsCheckCircle className='mr-2' />List your business</button>
                    
                </div>
            </header>
        </div>
    )
}

export default Navbar
