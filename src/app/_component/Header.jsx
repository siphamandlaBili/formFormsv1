"use client";
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import { links } from '@/data/data'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {isSignedIn } = useUser();

    return (
        <header className='relative w-full bg-white shadow-sm border-b'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <div className='shrink-0 transform transition-transform duration-300 hover:scale-105'>
                            <Image src='/formforms.png' width={150} height={40} alt='logo' />
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    {!isSignedIn && <nav className='hidden md:flex space-x-8'>
                        {links.map((link) => (
                            <a key={link.name} href={link.href} className='text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-all duration-300 relative group'>
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>}

                    <div className='flex items-center'>
                        {isSignedIn ? (
                            <div className='flex items-center gap-4'>
                                <Link href={"/dashboard"}>
                                <Button variant='outline'>Dashboard</Button>
                                </Link>
                                <UserButton />
                            </div>
                        ) : (
                            <>
                                <SignInButton>
                                    <Button className='hidden md:flex px-6 py-2 rounded-lg font-medium items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg group'>
                                        Get Started
                                        <svg className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                        </svg>
                                    </Button>
                                </SignInButton>
                                {/* Mobile Hamburger Menu */}
                                <div className='md:hidden'>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                        className='text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2'
                                        aria-label='Toggle mobile menu'
                                    >
                                        <svg
                                            className='w-6 h-6'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            {isMobileMenuOpen ? (
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                            ) : (
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu - Overlay */}
            {!isSignedIn && isMobileMenuOpen && (
                <div className='absolute top-full left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-lg z-50'>
                    <div className='px-4 py-2 space-y-1'>
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className='block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 text-sm font-medium transition-colors rounded-md'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className='pt-2'>
                            <SignInButton>
                                <Button 
                                    className='w-full px-6 py-2 rounded-md font-medium flex items-center justify-center gap-2'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Get Started
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                    </svg>
                                </Button>
                            </SignInButton>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header