import React from 'react'
import SideNav from './_components/SideNav'


function Dashboardlayout({children}) {
    return (
        <div>
            <div className='lg:w-64 md:w-20 w-20 fixed'>
                <SideNav/>
            </div>
            <div className='lg:ml-64 md:ml-20 ml-20 bg-[#F5F7FA]'>
                {children}
            </div>
            
        </div>
    )
}

export default Dashboardlayout