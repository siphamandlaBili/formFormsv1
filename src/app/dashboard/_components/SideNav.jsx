"use client"
import React, { useEffect } from 'react'
import { menuList } from '@/data/data'
import { usePathname } from 'next/navigation'
import { Progress } from '@/components/ui/progress';
import CreateFormButton from '@/components/CreateFormButton';

function SideNav() {

    const path = usePathname();

    return (
        <div className='h-screen shadow-md border'>

            <div className='p-4'>
                {menuList.map((menu, index) => (
                    <div key={index} className="relative group">
                        <h2 className={`flex items-center gap-3 p-4 mb-1 hover:bg-primary text-gray-700 hover:text-white rounded-lg cursor-pointer transition-colors lg:justify-start justify-center
                        ${path == menu.path && 'bg-primary text-white'}
                        `}>
                            <menu.icon className="flex-shrink-0" />
                            <span className="lg:block hidden">{menu.name}</span>
                        </h2>
                        {/* Tooltip for medium and small screens */}
                        <div className="lg:hidden absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                            {menu.name}
                        </div>
                    </div>
                ))}
            </div>
            <div className='fixed bottom-10 p-6 lg:w-64 w-20'>
                <CreateFormButton showFullText={false} />
                <div className="lg:block hidden">
                    <Progress value={60} className="mt-4 h-3" />
                    <h2 className='text-sm mt-1 text-gray-700'><strong>2 </strong>/<strong>3</strong> Forms Generated</h2>
                    <h2 className='text-sm mt-1 text-gray-700'>Get Unlimited Access</h2>
                </div>
            </div>
        </div>
    )
}

export default SideNav