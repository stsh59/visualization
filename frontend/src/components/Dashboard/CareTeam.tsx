"use client";

import React from "react";
import CardDataStats from "../CardDataStats";
import { Users } from "lucide-react";

const CareTeam: React.FC = () => {
  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold">Care Team Table</h2>

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
    </>
  );
};

export default CareTeam;
