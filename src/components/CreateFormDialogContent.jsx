"use client"
import { useState } from 'react'
import { toast } from 'sonner'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { generateFormWithAI } from '@/configs/ai-model'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { jsonForms } from '@/configs/schema'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function CreateFormDialogContent() {
  const [userInput, setUserInput] = useState("")
  const [loading, setLoading] = useState(false)
  const {user} = useUser();
  const router = useRouter();
  

  const onCreateFormClick = async () => {
    if (!userInput.trim()) {
      toast.error('Please describe your form')
      return
    }
    
    setLoading(true)
    try {
      const formData = await generateFormWithAI(userInput)
      setUserInput("")
  
      const response = await db.insert(jsonForms)
      .values({
        jsonForm: formData,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date().toISOString(),
      }).returning({ id: jsonForms.id });

      if(response[0]?.id){
        toast.success('Form created successfully!')
        router.push(`/edit-form/${response[0].id}`);
      }
    } catch (error) {
      toast.error('Failed to create form')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-semibold">
          Create New Form
        </DialogTitle>
      </DialogHeader>

      <Textarea
        className="my-4"
        placeholder="✨ Describe the form you want to create"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <Button
          onClick={onCreateFormClick}
          disabled={!userInput.trim() || loading}
        >
          {loading ? <Loader2 className='animate-spin'/> : 'Create'}
        </Button>
      </div>
    </DialogContent>
  )
}

export default CreateFormDialogContent
