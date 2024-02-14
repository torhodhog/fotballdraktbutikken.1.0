import React from 'react';
import Image from 'next/image';
import hero from '@/public/hero.jpeg';

export default function Hero() {
   return(
      <div className="relative h-2/3 mb-40 z-auto">
         <Image 
            src={hero}
            alt="Hero image"
            layout="fill"
            objectFit="cover"
            className="z-0"
         />
         <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-bold text-custom-green drop-shadow-xl"><span className="text-pink-400">f</span>otballdraktbutikken<span className="text-pink-400">.</span></h1>
      </div>
   )}