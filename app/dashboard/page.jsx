"use client"
import withAuth from '../auth';
import React, { useState, useEffect, PureComponent } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from "./ProgressProvider";
import { IoIosArrowDown, IoLogoWhatsapp } from 'react-icons/io';
import { LuBellRing } from 'react-icons/lu';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { FiPhoneCall } from 'react-icons/fi';
import { FaRegShareSquare } from 'react-icons/fa';
import { PiChatsCircleBold } from 'react-icons/pi';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"




const Dashboard = () => {

  const [valueEnd, setValueEnd] = useState(66);
  const [name, setname] = useState("Name");
  const [selectedData, setSelectedData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [span, setSpan] = useState("date");
  const [vendorId, setvendorId] = useState("date");


  console.log(date);
  useEffect(() => {
    const token = localStorage.getItem('TMtoken')

    if (token) {
      // Parse the JWT token to extract the role
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const vendorname = tokenData.name;
      const vendorId = tokenData.id
      setname(vendorname)
      setvendorId(vendorId);
    }
    

  }, [])


  return (
    <div className='w-full '>
      <div className="flex justify-between lg:px-10 md:px-2 mb-4 py-6 border-gray-400 border-b-2">
        <div className="left flex pl-4 ">
          <img className='w-[55px] ' src="https://cdn-icons-png.flaticon.com/128/4259/4259739.png" alt="Greet Icon" />
          <div className='text-gray-500'>
            <h2 className='text-2xl font-bold '>Namaste {name}</h2>
            <p>Dashboard</p>
          </div>
        </div>
        <div className="right mx-2 flex items-center justify-center ">
          <div className='w-32 border-b border-gray-300'>
          </div>
          <div className="bell border border-gray-500 m-2 p-2 rounded-md">
            <LuBellRing className='text-3xl text-gray-500 ' />
          </div>
          <div className="bell border border-gray-500 m-2 p-2 rounded-md">
            <LuBellRing className='text-3xl text-gray-500 ' />
          </div>
        </div>
      </div>

      <div className="flex my-6">
        <div className="flex items-center">
          <div className='w-32 border-b border-gray-300 ml-5'>
          </div>
          <div className='text-sm text-gray-500 mx-2'>
            show
          </div>
          <div className="">




            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select
                  onValueChange={(value) =>{
                    setDate(addDays(new Date(), parseInt(value)))
                    if (value == -1 || 0) {
                      setSpan("date")
                    }
                    else if (value == -7) {
                      setSpan("week")
                    }
                    else if (value == -30) {
                      setSpan("month")
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="0">Today</SelectItem>
                    <SelectItem value="-1">Yesterday</SelectItem>
                    <SelectItem value="-7">Last Week</SelectItem>
                    <SelectItem value="-30">Last Month</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </div>
              </PopoverContent>
            </Popover>



          </div>
        </div>
        <div>
          <button></button>
        </div>
      </div>

      <div className="grid gap-4 ml-4
      grid-cols-1 grid-rows-4 
      md:grid-cols-2 md:grid-rows-3 
      lg:grid-cols-3 lg:grid-rows-2 ">

        <div className="rounded-md border-gray-300 border-2 
        row-span-2
        md:col-span-2 md:row-span-2 
        lg:col-span-2 lg:row-span-2">
          <div className='ml-4'>
            <h2 className='py-2 mx-8 text-xl font-bold text-gray-500 border-b-2 border-gray-400'>YOUR LEAD ANALYSIS</h2>
            <div className="flex justify-between mx-4 my-4">
              <div className="flex">
                <div className="thisweek mx-4 text-gray-500 font-bold">
                  <h2>This Week</h2>
                  <p className='text-2xl text-sky-500'>131</p>
                </div>
                <div className="Prevweek mx-4 text-gray-500 font-bold">
                  <h2>Previous Week</h2>
                  <p className='text-2xl'>98</p>
                </div>
              </div>

            </div>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart

                data={selectedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="profile" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="prevprofile" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-md border-gray-300 border-2 
        row-start-3
        md:row-start-3 md:col-start-1
        lg:col-start-3 lg:row-start-1">
          <div className='flex justify-between items-center mx-4 my-2'>
            <h2 className='text-sm text-gray-500'>
              Profile <br /> Completion
            </h2>
            <span className='border border-gray-300 rounded-sm h-max w-max '>
              <IoIosArrowDown className='' />
            </span>
          </div>
          <div className="m-auto w-[40%]">
            <ProgressProvider valueStart={0} valueEnd={valueEnd}>
              {(value) => <CircularProgressbar
                value={value}
                text={`${value}%`}
                strokeWidth={1}
                styles={buildStyles({
                  pathTransitionDuration: 2
                })}
              />}
            </ProgressProvider>
          </div>
        </div>

        <div className=" border-2 rounded-md border-sky-500 bg-sky-500 
        row-start-4
        md:row-start-3 md:col-start-2
        lg:col-start-3 lg:row-start-2 ">
          <div className=" ">
            <ul className='px-4 py-1 text-white'>
              <li className="flex justify-between py-[3%]">
                <div className="flex">
                  <HiOutlineCursorClick />
                  <span className='ml-2 whitespace-nowrap'>Profile Visitors</span>
                </div>
                <div className="flex">
                  <span>
                    350
                  </span>
                  <span>
                    <AiOutlineArrowDown className='mt-1 ml-2' />
                  </span>
                </div>
              </li>
              <li className="flex justify-between py-[3%]">
                <div className="flex">
                  <FiPhoneCall />
                  <span className='ml-2 whitespace-nowrap'>Direct Calls</span>
                </div>
                <div className="flex">
                  <span>
                    350
                  </span>
                  <span>
                    <AiOutlineArrowUp className='mt-1 ml-2' />
                  </span>
                </div>
              </li>
              <li className="flex justify-between py-[3%]">
                <div className="flex">
                  <IoLogoWhatsapp />
                  <span className='ml-2 whitespace-nowrap'>WhatsApp Chat</span>
                </div>
                <div className="flex">
                  <span>
                    350
                  </span>
                  <span>
                    <AiOutlineArrowDown className='mt-1 ml-2' />
                  </span>
                </div>
              </li>
              <li className="flex justify-between py-[3%]">
                <div className="flex">
                  <FaRegShareSquare />
                  <span className='ml-2 whitespace-nowrap'>Share Button</span>
                </div>
                <div className="flex">
                  <span>
                    350
                  </span>
                  <span>
                    <AiOutlineArrowDown className='mt-1 ml-2' />
                  </span>
                </div>
              </li>
              <li className="flex justify-between py-[3%]">
                <div className="flex">
                  <PiChatsCircleBold />
                  <span className='ml-2 whitespace-nowrap'>Enquire Now</span>
                </div>
                <div className="flex">
                  <span>
                    350
                  </span>
                  <span>
                    <AiOutlineArrowDown className='mt-1 ml-2' />
                  </span>
                </div>
              </li>

            </ul>
          </div>
        </div>

      </div>

    </div>
  )
}

export default withAuth(Dashboard, ['vendor']);


