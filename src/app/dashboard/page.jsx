import CreateForm from './_components/CreateForm'
import FormsList from './_components/FormsList'

function Dashboard() {
  return (
    <div className="h-full flex flex-col">
      <div className="pt-6">
        <h2 className='font-medium text-3xl flex items-center justify-between'>Dashboard
          <CreateForm />
        </h2>
        <FormsList />
      </div>
    </div>
  )
}

export default Dashboard