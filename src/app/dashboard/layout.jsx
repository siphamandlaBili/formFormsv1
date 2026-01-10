import SideNav from './_components/SideNav'


function Dashboardlayout({children}) {
    return (
        <div className="h-screen overflow-hidden fixed inset-0">
            <div className='lg:w-64 md:w-20 w-20 fixed z-40 h-full'>
                <SideNav/>
            </div>
            <div className='lg:ml-64 md:ml-20 ml-20 bg-gradient-to-br from-gray-50 to-gray-100/50 h-full overflow-hidden'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full overflow-hidden'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Dashboardlayout