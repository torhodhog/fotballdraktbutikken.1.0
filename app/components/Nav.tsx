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
import { useMediaQuery } from "react-responsive";



export default function Nav({ user }: Session) {
  const createStore = useCartStore();
  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">
            fotballdraktbutikken.
          </Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal p-0">
            <li><Link href="/">Produkter</Link></li>
            <li><Link href="/">Salg</Link></li>
            <li><Link href="/">Kontakt</Link></li>
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4 md:gap-6 py-5">
          <div onClick={() => createStore.toggleCart()} className="cursor-pointer">
            <ul className="flex items-center gap-12">
            <li className="flec items-center text-3xl relative cursor-pointer">
            <AiFillShopping />
            {createStore.cart.length > 0 && (
              <span className="badge  badge-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4">
                {createStore.cart.length}
              </span>
             
            )}
             </li>
             </ul>
          </div>
          
          <DarkLight className=""/>

          {!user && (
            <button className="btn btn-primary" onClick={() => signIn()}>
              Logg inn
            </button>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image src={user?.image as string} alt={user.name as string} width={40} height={40} />
                </div>
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-4 shadow bg-base-100 rounded-box w-52">
                <li><Link href="/">Hjem</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><a onClick={() => signOut()}>Logg Ut</a></li>
              </ul>
            </div>
          )}
        </div>

        <AnimatePresence>{createStore.isOpen && <Cart />}</AnimatePresence>
      </div>
    </nav>
  );
}