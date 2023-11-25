import React from 'react'
import { Separator } from "@/components/ui/separator"
import { BsSend } from 'react-icons/bs';


const Footer = () => {
    return (
        <div>
            <Separator className='my-6' />
            <div className='text-gray-500'>
                <p className="text-xs footer text my-4">At Thirsty Maart, our story is not just about commerce; it&aposs a tale of compassion and purpose. We are a brand that thrives on the satisfaction of seeing others succeed and excel. We believe that our thirst (or hunger) to witness the triumph of our clients keeps growing with every new success story. </p>
                <p className="text-xs footer text my-4">Our brand is built on a profound foundation that combines the best of B2B, B2C, and B2B2C while infusing a genuine human touch. We go beyond the conventional approach to lead generation. ThirstyMaart is not just about quantity; it&aposs about the quality of connections we foster.</p>
                <p className="text-xs footer text my-4">Our emblematic use of &quotMaa&quot in our logo represents the nurturing love and care that a mother provides. Just as a mother looks after her children and adapts to their needs, ThirstyMaart is committed to being a constant support system for our clients. We play the roles of a friend, philosopher, and guide, just like a mother does.</p>
                <p className="text-xs footer text my-4">Thirsty Maart is where the intelligence of AI meets the empathy of humans. We combine cutting-edge technology with a human touch to provide services that are not only efficient but also deeply caring.</p>
                <p className="text-xs footer text my-4">We believe that every rupee invested by our subscribers should yield more than just leads; it should yield invaluable connections and success stories. We go above and beyond the ordinary to make sure our clients receive the best returns on their investments.</p>
                <p className="text-xs footer text my-4">Our brand ethos is rooted in the power of connections. We don&apost just do business; we do it with heart. We&aposre committed to fostering genuine relationships with our clients &helping them achieve their goals.</p>
                <p className="text-xs footer text my-4">ThirstyMaart is not just a business; it&aposs a mission to make the business world a better place by connecting hearts and minds. Join us on this journey, and together, we can reach new heights of success and make a difference in the world of commerce.</p>
            </div>
            <Separator className='my-6' />
            <div className='text-gray-500 text-xs'>
                <h2 className='text-sm font-semibold my-4'>Popular Categories:</h2>

                <p> B2B  |  B2C  |  B2G  |  Fashion  |  Events  |  Building Construction  |  Interior  |  Electrical Goods  |  Electrical Supplies   |  Pharmaceuticals  |  Hospitals  |  Agriculture  |  Food
                    Cosmetics  |  Home Textile  |  Computer & IT Solutions  |  Herbal Ayurvedic Products  |  Security Services  |  Sports & Toys  |  Stationery  |  Bags & Belts  |  Advertisement
                    Marble, Granite & Stones  |  Jewellery  |  Logistics  |  Product Rental & Leasing  |  Business & Audit Services  |  Legal & Finance Services  |  Travel & Tourism  |  Automobile
                    HR Consultants  |  Housekeeping Services  |  Art and Entertainment  |  Gifting</p>
            </div>
            <Separator className='my-6' />



            <div className="grid 
                            grid-cols-4 grid-rows-2 gap-2
                            md:grid-cols-5 md:grid-rows-1 md:gap-4  
                            lg:grid-cols-5 lg:grid-rows-1 lg:gap-4
                            text-xs text-gray-500">
                <div className='col-span-2 
  md:col-span-1
  lg:col-span-1' >
                    <h2 className="font-bold py-2">Quick Links</h2>
                    <ul className=''>
                        <li className="py-1">About Us</li>
                        <li className="py-1">How We Work</li>
                        <li className="py-1">Customer Care</li>
                        <li className="py-1">Report a Problem</li>
                    </ul>

                </div>
                <div className='col-span-2 
                                md:col-span-1
                                lg:col-span-1' >
                    <h2 className="font-bold py-2">Quick Links</h2>
                    <ul className=''>
                        <li className="py-1">List Your Business</li>
                        <li className="py-1">Advertise</li>
                    </ul>

                </div>
                <div className="col-span-4 row-start-1 
                                md:col-span-3 md:row-start-1  md:col-start-3
                                lg:col-span-3  lg:row-start-1 lg:col-start-3 ">

                <div className='border border-gray-300 rounded-md flex align-middle'>
                        <div className='flex justify-between w-full'>
                            <div className=' flex items-center px-4 w-full '>
                                <input
                                    className='focus:outline-none outline-none w-full'
                                    type="email"
                                    placeholder='Enter your mail address'
                                />
                            </div>
                            <span className='border bg-sky-400 px-3 m-1 rounded-md '>
                                <BsSend className='text-2xl my-2 text-white' />
                            </span>
                        </div>

                    </div>
                    <p className='p-4 '>Subscribe to our newsletter and get updated to latest trends in the market!</p>

                </div>
            </div>
            <Separator className='my-6' />
            <div className='flex justify-between items-center'>
                <h2>Copyright © 2023 ThirstyMaart Ltd. All rights reserved.</h2>
                <h2><a href="/terms">Terms & Condition</a></h2>
            </div>
        </div>
    )
}

export default Footer
