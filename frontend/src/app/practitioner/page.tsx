"use client";

import Practitioner from "@/components/Dashboard/Practitioner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect } from "next/navigation";

export default function ClinicalPage() {
  if (!localStorage.getItem("accessToken")) {
    return redirect("/auth/signin");
  }
  return (
    <>
      <DefaultLayout>
        <Practitioner />
      </DefaultLayout>
    </>
  );
}
