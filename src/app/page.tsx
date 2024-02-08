import Administration from "@/components/Dashboard/Administration";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Satish Wagle | Dashboard",
  description: "This is Dashboard for the system.",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Administration />
      </DefaultLayout>
    </>
  );
}
