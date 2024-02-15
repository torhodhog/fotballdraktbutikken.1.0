import React from 'react';
import Image from 'next/image';
import hero from '@/public/hero.jpeg';

export default function Hero() {
   return(
      <div className="relative h-2/3 mb-40 z-auto flex items-center justify-center">
         <Image 
            src={hero}
            alt="Hero image"
            layout="fill"
            objectFit="cover"
            className="z-0"
         />
         <h1 className="hidden md:block text-[6vw] font-bold text-custom-green drop-shadow-xl">
            <span className="text-pink-400">f</span>otballdraktbutikken<span className="text-pink-400">.</span>
         </h1>
      </div>
   );
}