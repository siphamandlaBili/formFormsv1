import React from 'react'
import CreateForm from './_components/CreateForm'
function Dashboard() {
  return (
    <div className="px-5 md:px-10 xl:px-[4.25rem] min-h-[91vh] pt-2.5 bg-[#F5F7FA]">
      <h2 className='font-medium text-3xl flex items-center justify-between'>Dashboard
        <CreateForm />
      </h2>
    </div>
  )
}

export default Dashboard