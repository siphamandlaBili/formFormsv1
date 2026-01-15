"use client"
import { useEffect } from 'react'
import { menuList } from '@/data/data'
import { usePathname, useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress';
import CreateFormButton from '@/components/CreateFormButton';

function SideNav() {

    const path = usePathname();
    const router = useRouter();

    return (
        <div className='h-screen bg-white/95 backdrop-blur-lg shadow-xl border-r border-gray-200/50'>

            <div className='p-4'>
                {menuList.map((menu, index) => (
                    <div key={index} className="relative group">
                        <h2 
                            onClick={() => router.push(menu.path)}
                            className={`flex items-center gap-3 lg:p-4 p-2 mb-1 text-gray-700 rounded-xl cursor-pointer transition-all duration-300 lg:justify-start justify-center transform hover:scale-105
                            ${path == menu.path 
                                ? 'bg-linear-to-r from-primary to-primary/80 text-white shadow-lg' 
                                : 'hover:bg-linear-to-r hover:from-primary/10 hover:to-primary/5 hover:text-primary'
                            }
                            `}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <menu.icon className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
                            <span className="lg:block hidden transition-all duration-300">{menu.name}</span>
                        </h2>
                        {/* Enhanced Tooltip for medium and small screens */}
                        <div className="lg:hidden absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 shadow-xl">
                            <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900/90 rotate-45"></div>
                            {menu.name}
                        </div>
                    </div>
                ))}
            </div>
            <div className='fixed bottom-10 p-6 lg:w-64 w-20'>
                <div className="mb-4">
                    <CreateFormButton showFullText={false} />
                </div>
                <div className="lg:block hidden">
                    <Progress value={60} className="mt-2 h-2" />
                    <h2 className='text-xs mt-2 text-gray-600 font-medium'><strong className="text-primary">2 </strong>/<strong>3</strong> Forms Generated</h2>
                    <h2 className='text-xs mt-1 text-gray-500'>Get Unlimited Access</h2>
                </div>
            </div>
        </div>
    )
}

export default SideNav