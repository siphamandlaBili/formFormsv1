"use client"
import React, { useEffect } from 'react'
import { menuList } from '@/data/data'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

function SideNav() {

    const path = usePathname();

    useEffect(()=>{
        console.log("Current path:", path);
    }, [path]);

    return (
        <div className='h-screen shadow-md border'>

            <div className='p-4'>
                {menuList.map((menu, index) => (
                    <h2 key={index} className={`flex items-center gap-3 p-4 mb-1 hover:bg-primary text-gray-700 hover:text-white rounded-lg cursor-pointer transition-colors
                    ${path == menu.path && 'bg-primary text-white'}
                    `}>
                        <menu.icon />
                        {menu.name}
                    </h2>
                ))}
            </div>
            <div className='fixed bottom-10 p-6 w-64'>
                <Button className="w-full">
                    + Create New Form
                </Button>
                <div>
                    <Progress value={60} className="mt-4 h-3" />
                    <h2 className='text-sm mt-1 text-gray-700'><strong>2 </strong>/<strong>3</strong> Forms Generated</h2>
                    <h2 className='text-sm mt-1 text-gray-700'>Get Unlimited Access</h2>
                </div>
            </div>
        </div>
    )
}

export default SideNav