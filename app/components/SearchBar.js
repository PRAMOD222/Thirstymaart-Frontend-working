import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillHeart } from 'react-icons/ai';
import { MdLensBlur } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { TypeAnimation } from 'react-type-animation';
import { useUser } from '../components/UserContext.js';
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


const SearchBar = () => {
    const [selectedLocation, setSelectedLocation] = useState("0");
    const [userLocation, setUserLocation] = useState("My Location");
    const [isCityCorrect, setIsCityCorrect] = useState(true);
    const [customCity, setCustomCity] = useState("");
    const [search, setsearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { setUserIdFromResponse, userId } = useUser();
    const APIKEY = 'pk.e4ed71203ffbd8789321e3cd48f7571a';


    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {

        const mediaQuery = window.matchMedia('(max-width: 770px)');
        setIsMobile(mediaQuery.matches);

        const handleChange1 = (e) => {
            setIsMobile(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange1);
        return () => {
            mediaQuery.removeEventListener('change', handleChange1);
        };
    }, []);

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
        setCustomCity("");

        if (event.target.value === "1") {
            requestGeolocationPermission();
        }
    };

    const requestGeolocationPermission = async () => {
        if ("geolocation" in navigator) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const response = await axios.get(
                    `https://us1.locationiq.com/v1/reverse.php?key=${APIKEY}&lat=${latitude}&lon=${longitude}&format=json`
                );

                const locationData = response.data;
                const userCity = locationData.address.city;
                setUserLocation(userCity);
                setIsCityCorrect(true);
            } catch (error) {
                console.error("Error getting location data:", error);
                setUserLocation("My Location");
                setIsCityCorrect(false);
            }
        } else {
            alert("Geolocation is not available in your browser.");
        }
    };

    const handleCustomCityInputChange = (event) => {
        setCustomCity(event.target.value);
    };

    const handleSearch = async () => {
        try {
            let query;

            // Assuming you are searching by 'companyname'
            // You can use the state variable 'search' directly
            query = search;

            const response = await axios.get(`https://backend.thirstymaart.com/api/search/?companyname=${query}`);
            setSearchResults(response.data);
            const { _id } = response.data[0];

            setUserIdFromResponse(_id);
            console.log(userId);

        } catch (error) {
            console.error("Error searching:", error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'search') {
            setsearch(e.target.value);
        }
    };


    return (

        <div className='container flex p-0 mt-8 flex-col md:flex-row lg:flex-row'>

            <div className='border border-gray-300 rounded-md my-3 md:hidden lg:hidden  p-2 flex'>
                <AiFillHeart className='inline  mx-2 text-xl text-gray-600 ' />
                <Select onChange={handleLocationChange}>
                    <SelectTrigger className="w-[180px] ">
                        <SelectValue placeholder="Select Location" />

                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel value={selectedLocation} >Select Location</SelectLabel>
                            <SelectItem value="2">{userLocation}</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
                {/* <select className='focus:outline-none mr-4 text-gray-500 text-sm w-full' value={selectedLocation} onChange={handleLocationChange}>
                <option className='text-gray-400 ' value="0">Select Location</option>
                <option className='' value="1">{userLocation}</option>
            </select> */}

                {selectedLocation === "1" && !isCityCorrect && (
                    <div>
                        <input
                            type="text"
                            value={customCity}
                            onChange={handleCustomCityInputChange}
                        />
                    </div>
                )}
            </div>

            <div className=" md:p-4 lg:p-4 p-0  md:w-[70%] lg:w-[70%] w:full">
                <div className='border border-gray-300 rounded-md flex items-center'>
                    <AiFillHeart className=' mx-2 text-xl text-gray-600 hidden md:inline lg:inline' />

                    <div className="hidden md:inline  ">
                        <Select onChange={handleLocationChange} className="outline-none focus:outline-none border-none focus:border-none">
                            <SelectTrigger className="w-[180px] ">
                                <SelectValue placeholder="Select Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup >
                                    <SelectLabel value={selectedLocation} >Select Location</SelectLabel>
                                    <SelectItem value="2">{userLocation}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {selectedLocation === "1" && !isCityCorrect && (
                        <div>
                            <input
                                type="text"
                                value={customCity}
                                onChange={handleCustomCityInputChange}
                            />
                        </div>
                    )}

                    <div className='flex justify-between w-full'>
                        <div className='md:my-3 lg:my-3 my-1 flex'>
                            <Separator orientation="vertical" className="hidden md:inline  " />
                            <MdLensBlur className='mx-4 text-gray-600 md:text-3xl lg:text-3xl text-2xl  hidden md:inline lg:inline' />
                            <input
                                value={search}
                                onChange={handleChange}
                                id="search"
                                name="search"
                                type="text"
                                className="px-2  relative block w-full appearance-none 0 py-1 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none outline-none text-sm md:text-base lg:text-base"
                                placeholder="Your THIRST Ends Here"
                            />
                        </div>
                        <a href='/profile' className='border bg-sky-400 md:px-3 lg:px-3 px-2 m-1 rounded-md'>
                            <BsSearch onClick={handleSearch} className='md:text-3xl lg:text-3xl text-2xl my-2 text-white' />
                        </a>
                    </div>
                </div>

                <div className="text hidden md:block lg:block">
                    <ul className='flex  my-3  text-sm text-gray-500'>
                        <li className="category px-3 text-gray-400 text-sm text-center">Electronics</li>
                        <Separator orientation="vertical" className='mx-2 h-6' />
                        <li className="category px-3 text-gray-400 text-sm text-center">Electricals</li>
                        <Separator orientation="vertical" className='mx-2 h-6' />
                        <li className="category px-3 text-gray-400 text-sm text-center">Medical</li>
                        <Separator orientation="vertical" className='mx-2 h-6' />
                        <li className="category px-3 text-gray-400 text-sm text-center">Hotels</li>
                        <Separator orientation="vertical" className='mx-2 h-6' />
                        <li className="category px-3 text-gray-400 text-sm text-center">Travels</li>
                        <Separator orientation="vertical" className='mx-2 h-6' />
                        <li className="category px-3 text-gray-400 text-sm text-center">Construction</li>
                        <Separator orientation="vertical" className='mx-2 h-6' />
                        <li className="category px-3 text-gray-400 text-sm text-center">Marketing</li>
                        <Separator orientation="vertical" className='mx-2 h-6' />
                        <li className="category px-3 text-gray-400 text-sm text-center">Consultants</li>
                    </ul>
                </div>
            </div>
            <div className='flex w-[30%]'>
                <div className='mt-2 '>
                    <Separator orientation="vertical" className='mx-8' />
                </div>
                <div className=" text px-4 text-gray-500 py-4 mt-4 hidden md:block lg:block">
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed out once, initially
                            ' ',
                            `Get your heart connected to 1000's of trusted Businesses to deal with!`,
                            1000,
                            `Get your heart connected to 1000's of trusted Businesses to deal with!`,
                            1000,
                            `Get your heart connected to 1000's of trusted Businesses to deal with!`,
                            1000
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ fontSize: '1rem', display: 'inline-block' }}
                        repeat={Infinity}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchBar;
