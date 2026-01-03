"use client";

import { SignIn } from "@clerk/nextjs";
import AuthLayout from "../../../_component/AuthLayout";
import { authData } from "../../../../data/auth";

export default function Page() {
  return (
    <AuthLayout>
      <SignIn 
        path="/sign-in"
        appearance={authData.clerkAppearance}
      />
    </AuthLayout>
  );
}