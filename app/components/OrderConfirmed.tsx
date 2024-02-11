"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dance from "@/public/dance.webp";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const cartStore = useCartStore();
  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);

  const checkoutOrder = () => {
    setTimeout(() => {
      cartStore.setCheckout("cart");
    }, 1000);
    cartStore.toggleCart();
  };

  return (
    <motion.div
      className="flex items-center justify-center my-12 mt-12"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="text-center">
        <h1 className="text-2xl font-medium mb-6">
          Din ordre har blitt plassert 🚀
        </h1>
        <h2 className="mb-24">Sjekk eposten for kvittering.</h2>
        <div className="overflow-hidden rounded-full h-64 w-64 relative  flex items-center justify-center">
          <Image
            src={dance}
            className="absolute -mb-25"
            alt="clapping crouch"
          />
        </div>
        <div className="flex justify-center items-center gap-12">
          <Link href={"/dashboard"}>
            <button onClick={checkoutOrder} className="font-medium ">
              Se hva du har bestilt
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
