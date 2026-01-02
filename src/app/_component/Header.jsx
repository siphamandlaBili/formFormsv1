import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { links } from '@/data'

function Header() {
    return (
        <header className='w-full bg-white shadow-sm border-b'>
            <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                            <Image src='/formforms.png' width={150} height={40} alt='logo' />
                        </div>
                    </div>
                    
                    {/* Navigation */}
                    <nav className='md:flex space-x-8'>
                        {links.map((link) => (
                            <a key={link.name} href={link.href} className='text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors'>
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    

                    <div className='flex items-center'>
                        <Button className='bg-[#4CAF4F] hover:bg-[#45A049] text-white px-6 py-2 rounded-md font-medium flex items-center gap-2'>
                            Get Started
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header