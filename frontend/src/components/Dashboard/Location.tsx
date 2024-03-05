"use client";

import React, { useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";
import { Loader2, Users } from "lucide-react";
import axios from "axios";
import { DataTable } from "@/app/location/_components/data-table";
import { columns } from "@/app/location/_components/columns";

const FHIR_URL = process.env.NEXT_PUBLIC_FHIR_URL;

const Location: React.FC = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await axios.get(`${FHIR_URL}/Location?_count=1000`);
        setData(data.data.entry);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold">Location Dashboard</h2>

      {isLoading && (
        <div className="my-12 flex w-full items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin" />
        </div>
      )}

      {data?.length && !isLoading && (
        <DataTable columns={columns} data={data} />
      )}

      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Users" total="3.456" rate="0.43%" levelUp>
          <Users className="h-5 w-5 text-primary" />
        </CardDataStats>

        <CardDataStats title="Total Users" total="3.456" rate="0.95%" levelDown>
          <Users className="h-5 w-5 text-primary" />
        </CardDataStats>

        <CardDataStats title="Total Users" total="3.456" rate="0.43%" levelUp>
          <Users className="h-5 w-5 text-primary" />
        </CardDataStats>

        <CardDataStats title="Total Users" total="3.456" rate="0.95%" levelDown>
          <Users className="h-5 w-5 text-primary" />
        </CardDataStats>
      </div> */}
    </>
  );
};

export default Location;
