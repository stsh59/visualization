"use client";

import Organization from "@/components/Dashboard/Organization";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect } from "next/navigation";

export default function WorkflowPage() {
  if (!localStorage.getItem("accessToken")) {
    return redirect("/auth/signin");
  }
  return (
    <>
      <DefaultLayout>
        <Organization />
      </DefaultLayout>
    </>
  );
}
