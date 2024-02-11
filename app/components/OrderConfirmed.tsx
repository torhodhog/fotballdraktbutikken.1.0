'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import dance from "@/public/dance.webp"

export default function OrderConfirmed() {
   return(
         <motion.div initial={{scale:0.5, opacity: 0}} animate={{scale:1, opacity:1}}>
               <div>
                  <h1>Din ordre har blitt plassert 🚀</h1>
                  <h2>Sjekk eposten for kvittering.</h2>
                  <Image  src={dance} className="py-8" alt="claping crouch"/>
               </div>
         </motion.div>
   )
}