"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import MapOne from "../Maps/MapOne";
import { Users } from "lucide-react";

const Administration: React.FC = () => {
  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold">Administration Dashboard</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
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
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default Administration;
