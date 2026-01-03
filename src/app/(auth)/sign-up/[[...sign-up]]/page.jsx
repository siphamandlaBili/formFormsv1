"use client";

import { SignUp } from "@clerk/nextjs";
import AuthLayout from "../../../_component/AuthLayout";
import { authData } from "../../../../data/auth";

export default function Page(){
    return (
        <AuthLayout>
            <SignUp 
                path="/sign-up"
                appearance={authData.clerkAppearance}
            />
        </AuthLayout>
    );
}