"use client"

import { db } from "@/configs"
import { jsonForms } from "@/configs/schema"
import { and, eq } from "drizzle-orm"
import { useUser } from "@clerk/nextjs"
import { useEffect, use, useState } from "react"
import { ArrowLeft } from "lucide-react"

function EditForm({ params }) {
    const { user } = useUser()
    const resolvedParams = use(params)
    const [jsonFormData, setJsonFormData] = useState(null);
    
    useEffect(() => {
        user && resolvedParams?.formId && getFormData()
    }, [user, resolvedParams])
    
    const getFormData = async () => {
        if (!resolvedParams?.formId || !user?.primaryEmailAddress?.emailAddress) {
            console.log('Missing required data:', { formId: resolvedParams?.formId, userEmail: user?.primaryEmailAddress?.emailAddress });
            return;
        }

        const result = await db.select().from(jsonForms)
        .where(and(eq(jsonForms.id, Number(resolvedParams.formId)), eq(jsonForms.createdBy, user.primaryEmailAddress.emailAddress)));
        

        setJsonFormData(JSON.parse(result[0]?.jsonForm));
    }

    console.log('Fetched JSON Form Data:', jsonFormData);
    return (
        <div className="p-10">
            <h2 className="flex gap-2 items-center my-5 cursor-pointer hover:font-semibold">
                <ArrowLeft /> Back
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="bg-red-50">
                    controller
                </div>
                <div className="md:col-span-2 bg-amber-300">
                    form
                </div>
            </div>
        </div>
    )
}

export default EditForm
