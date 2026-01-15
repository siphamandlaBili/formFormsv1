"use client"

import { db } from "@/configs"
import { jsonForms } from "@/configs/schema"
import { and, eq } from "drizzle-orm"
import { useUser } from "@clerk/nextjs"
import { useEffect, use, useState } from "react"
import { ArrowLeft, Eye, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Formui from "../_component/Formui"
import ThemeController from "../_component/ThemeController"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

function EditForm({ params }) {
    const { user } = useUser()
    const resolvedParams = use(params)
    const [jsonFormData, setJsonFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        user && resolvedParams?.formId && getFormData()
    }, [user, resolvedParams])
    
    const getFormData = async () => {
        if (!resolvedParams?.formId || !user?.primaryEmailAddress?.emailAddress) {
            toast.error('Missing required data to fetch form');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const result = await db.select().from(jsonForms)
            .where(and(eq(jsonForms.id, Number(resolvedParams.formId)), eq(jsonForms.createdBy, user.primaryEmailAddress.emailAddress)));
            
            setJsonFormData(JSON.parse(result[0]?.jsonForm));
        } catch (error) {
            toast.error('Error fetching form data');
        } finally {
            setIsLoading(false);
        }
    }

    const updateFormData = async (updatedFormData, showSuccessToast = true) => {
        // Update local state immediately for instant UI feedback
        setJsonFormData(updatedFormData);
        
        try {
            if (!resolvedParams?.formId || !user?.primaryEmailAddress?.emailAddress) {
                toast.error('Missing required data for update');
                return;
            }

            await db.update(jsonForms)
                .set({ 
                    jsonForm: JSON.stringify(updatedFormData) 
                })
                .where(and(
                    eq(jsonForms.id, Number(resolvedParams.formId)), 
                    eq(jsonForms.createdBy, user.primaryEmailAddress.emailAddress)
                ));
            
            if (showSuccessToast) {
                toast.success('Form updated successfully!');
            }
        } catch (error) {
            toast.error('Failed to update form');
            // Optionally: revert the optimistic update on error
            // await getFormData();
        }
    }

    return (
        <div className="px-10">
            <div className="flex items-center justify-between my-5">
                <button onClick={() => router.back()} className="flex gap-2 items-center cursor-pointer hover:font-semibold">
                    <ArrowLeft /> Back
                </button>
                <div className="flex gap-3">
                    <Button 
                        variant="outline" 
                        onClick={() => {
                            router.push(`/preview/${resolvedParams?.formId}`)
                        }}
                        className="flex gap-2 items-center"
                    >
                        <Eye className="h-4 w-4" />
                        Preview
                    </Button>
                    <Button 
                        onClick={() => {
                            // Share functionality
                            const shareUrl = `${window.location.origin}/form/${resolvedParams?.formId}`
                            navigator.clipboard.writeText(shareUrl)
                            toast.success('Form link copied to clipboard!')
                        }}
                        className="flex gap-2 items-center"
                    >
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
                <div className="p-5 border rounded-lg shadow-md overflow-hidden">
                    <ThemeController 
                        jsonFormData={jsonFormData}
                        onUpdateFormData={updateFormData}
                    />
                </div>
                <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto p-5">
                        <Formui 
                            jsonFormData={jsonFormData} 
                            isLoading={isLoading}
                            onUpdateFormData={updateFormData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditForm
