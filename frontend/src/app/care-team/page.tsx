"use client";

import CareTeam from "@/components/Dashboard/CareTeam";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect } from "next/navigation";

export default function DiagnosticsPage() {
  if (!localStorage.getItem("accessToken")) {
    return redirect("/auth/signin");
  }

  return (
    <>
      <DefaultLayout>
        <CareTeam />
      </DefaultLayout>
    </>
  );
}
