import CreateForm from './_components/CreateForm'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

function Dashboard() {
  return (
    <div className="h-full flex flex-col">
      <div className="pt-6">
        <h2 className='font-medium text-3xl flex items-center justify-between'>Dashboard
          <CreateForm />
        </h2>
      </div>
    </div>
  )
}

export default Dashboard