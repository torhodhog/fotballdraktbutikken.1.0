"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import { createStore } from "zustand";
import { AiFillShopping } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { sign } from "crypto";
import DarkLight from "./DarkLight";

export default function Nav({ user }: Session) {
  const createStore = useCartStore();
  return (
    <nav className="flex justify-between items-center py-12">
      <Link href="/">
        <h1>Styled</h1>
      </Link>
<ul>
  <li><Link href="/Products">Produkter</Link></li>
</ul>

      <ul className="flex items-center gap-8">
        {/* Toggle the cart */}
        <li
          onClick={() => createStore.toggleCart()}
          className="flex items-center text-3xl relative cursor-pointer"
        >
          <AiFillShopping />
          <AnimatePresence>
            {createStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex item-center justify-center"
              >
                {createStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        <DarkLight />
        {/* Sjekker om: hvis brukeren ikke er logget inn, vises en knapp for å logge inn */}
        {!user && (
          <li className="bg-primary text-white py-2 px-3 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
              <Image
                src={user?.image as string}
                alt={user.name as string}
                width={36}
                height={36}
                className="rounded-full"
                tabIndex={0}
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 w-72"
              >
                <Link
                  className="hover:bg-base-300 p-4 rounded-md"
                  href={"/dashboard"}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                ></Link>
                <li className="hover:bg-base-300 p-4 rounded-md"
                onClick={() => {
                  signOut();
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                }}
                >Logg Ut</li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{createStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
