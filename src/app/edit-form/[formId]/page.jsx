"use client"

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

import { db } from "@/configs"
import { jsonForms } from "@/configs/schema"
import { and, eq } from "drizzle-orm"
import { useUser } from "@clerk/nextjs"
import { useEffect, use, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Formui from "../_component/Formui"
import { toast } from "sonner"

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

    const updateFormData = async (updatedFormData) => {
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
            
            setJsonFormData(updatedFormData);
            toast.success('Form updated successfully!');
        } catch (error) {
            toast.error('Failed to update form');
        }
    }

    return (
        <div className="px-10">
            <button onClick={() => router.back()} className="flex gap-2 items-center my-5 cursor-pointer hover:font-semibold">
                <ArrowLeft /> Back
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
                <div className="p-5 border rounded-lg shadow-md">
                    controller
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
