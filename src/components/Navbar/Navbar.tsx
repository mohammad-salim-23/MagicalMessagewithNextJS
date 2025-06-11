"use client"
import React from 'react'
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { Button } from '../ui/button';

export const Navbar = () => {
  const { data: session } = useSession();
  const user: User | undefined = session?.user as User;

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link href="/">
        <span className="text-xl font-bold text-teal-600 hover:text-teal-700 cursor-pointer tracking-tight">Magical Message</span>
      </Link>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-gray-700 font-medium hidden sm:inline-block">
              Welcome, {user?.name || user?.email}
            </span>
            <Button 
              onClick={() => signOut()} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button 
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition duration-300 cursor-pointer"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};
