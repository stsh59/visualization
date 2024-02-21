"use client";

import Location from "@/components/Dashboard/Location";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect } from "next/navigation";

export default function FinancialPage() {
  if (!localStorage.getItem("accessToken")) {
    return redirect("/auth/signin");
  }

  return (
    <>
      <DefaultLayout>
        <Location />
      </DefaultLayout>
    </>
  );
}
