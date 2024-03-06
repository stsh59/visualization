"use client";

import Patient from "@/components/Dashboard/Patient";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect } from "next/navigation";

export default function PatientPage() {
  if (!localStorage.getItem("accessToken")) {
    return redirect("/auth/signin");
  }
  return (
    <>
      <DefaultLayout>
        <Patient />
      </DefaultLayout>
    </>
  );
}
