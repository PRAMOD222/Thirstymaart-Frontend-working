"use client"
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import React, { useState } from 'react';

const CustomSlider = ({ slides, slideTitle }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    return (
        <div className="custom-slider relative flex ">
            <button onClick={prevSlide}><MdKeyboardArrowLeft className='text-3xl absolute top-1/2 left-0 z-10' /></button>
            <div className="slide relative transition-transform duration-300">
                <img className='relative object-cover rounded-md' src={slides[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                <p className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>{slideTitle[currentIndex]}</p>
            </div>
            <button onClick={nextSlide}> <MdOutlineKeyboardArrowRight className='text-3xl absolute top-1/2 right-0 z-10' /> </button>
        </div>
    );
};

export default CustomSlider;


