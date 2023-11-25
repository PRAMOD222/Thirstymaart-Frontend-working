"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {
    const [name, setname] = useState('');
    const [companyname, setcompanyname] = useState('Company Name');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [city, setcity] = useState('');
    const [password, setpassword] = useState('');
    const [isVendor, setisVendor] = useState();

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setname(e.target.value);
        } else if (e.target.name === 'companyName') {
            setcompanyname(e.target.value);
        } else if (e.target.name === 'email') {
            setemail(e.target.value);
        } else if (e.target.name === 'phoneNo') {
            setphone(e.target.value);
        } else if (e.target.name === 'city') {
            setcity(e.target.value);
        } else if (e.target.name === 'password') {
            setpassword(e.target.value);
        } else if (e.target.name === 'isVendor') {
            setisVendor(e.target.checked);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, companyname, email, phone, city, password, isVendor }

        let res = await fetch('http://localhost:3001/api/user/signup', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json(data)
        setname('')
        setcompanyname('')
        setemail('')
        setphone('')
        setcity('')
        setpassword('')
        toast.success('Your Account has been Created!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <Link href="/login" className="font-medium text-sky-600 hover:text-sky-500"> Log In</Link>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="-space-y-px rounded-md shadow-sm grid-cols-1 grid gap-y-2">

                            <div className=''>
                                <input value={name} onChange={handleChange} id="name" name="name" type="text" autoComplete="name" required className=" relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" placeholder="Name" />
                            </div>

                            <div className=''>
                                <input value={companyname} onChange={handleChange} id="companyName" name="companyName" type="text" autoComplete="companyName" required className=" relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" placeholder="Company Name (Optional)" />
                            </div>

                            <div>
                                <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" placeholder="Email address" />
                            </div>

                            <div className=''>
                                <input value={phone} onChange={handleChange} id="phoneNo" name="phoneNo" type="number" autoComplete="phoneNo" required className=" relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" placeholder="Phone No" />
                            </div>

                            <div className=''>
                                <input value={city} onChange={handleChange} id="city" name="city" type="text" autoComplete="city" required className=" relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" placeholder="City" />
                            </div>

                            <div>
                                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" placeholder="Password" />
                            </div>

                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input onChange={handleChange} id="isVendor" name="isVendor" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                                <label htmlFor="isVendor" className="ml-2 block text-sm text-gray-900">Click Here</label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-gray-900">I am A Vendor</a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-sky-400 group-hover:text-sky-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin