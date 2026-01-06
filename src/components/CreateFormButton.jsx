import { Button } from '@/components/ui/button'
import { DialogTrigger, Dialog } from "@/components/ui/dialog"
import CreateFormDialogContent from './CreateFormDialogContent'

function CreateFormButton({ className = "", showFullText = true, ...props }) {
  return (
    <>
      {showFullText ? (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button className={`w-full lg:block hidden ${className}`} {...props}>
                + Create New Form
              </Button>
            </DialogTrigger>
            <CreateFormDialogContent />
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className={`w-full lg:hidden block p-2 ${className}`}
                title="Create New Form"
                {...props}
              >
                +
              </Button>
            </DialogTrigger>
            <CreateFormDialogContent />
          </Dialog>
        </>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className={`${className}`} title="Create New Form" {...props}>
              <span className="lg:inline hidden">+ Create New Form</span>
              <span className="lg:hidden inline">+</span>
            </Button>
          </DialogTrigger>
          <CreateFormDialogContent />
        </Dialog>
      )}
    </>
  )
}

export default CreateFormButton
