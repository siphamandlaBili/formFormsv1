import CreateForm from './_components/CreateForm'
function Dashboard() {
  return (
    <div className="pt-6 pb-6">
      <h2 className='font-medium text-3xl flex items-center justify-between'>Dashboard
        <CreateForm />
      </h2>
    </div>
  )
}

export default Dashboard