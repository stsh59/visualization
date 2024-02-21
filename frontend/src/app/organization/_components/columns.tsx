"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "resource",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Organization Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const resource = row.getValue("resource");
      //@ts-ignore
      return <p>{resource.name ?? "-"}</p>;
    },
  },
  {
    accessorKey: "resource",
    header: ({ column }) => {
      return <Button variant="ghost">Contact Number</Button>;
    },
    cell: ({ row }) => {
      const resource = row.getValue("resource");
      //@ts-ignore
      return <p>{(resource.telecom && resource.telecom[0].value) ?? "-"}</p>;
    },
  },
  {
    accessorKey: "resource",
    header: ({ column }) => {
      return <Button variant="ghost">Country</Button>;
    },
    cell: ({ row }) => {
      const resource = row.getValue("resource");
      //@ts-ignore
      return <p>{(resource.address && resource.address[0].country) ?? "-"}</p>;
    },
  },
  {
    accessorKey: "resource",
    header: ({ column }) => {
      return <Button variant="ghost">City</Button>;
    },
    cell: ({ row }) => {
      const resource = row.getValue("resource");
      //@ts-ignore
      return <p>{(resource.address && resource.address[0].city) ?? "-"}</p>;
    },
  },
  {
    accessorKey: "resource",
    header: ({ column }) => {
      return <Button variant="ghost">State</Button>;
    },
    cell: ({ row }) => {
      const resource = row.getValue("resource");
      //@ts-ignore
      return <p>{(resource.address && resource.address[0].state) ?? "-"}</p>;
    },
  },
  {
    accessorKey: "resource",
    header: ({ column }) => {
      return <Button variant="ghost">Last Modified</Button>;
    },
    cell: ({ row }) => {
      const resource = row.getValue("resource");
      return (
        <p className="ml-4">
          {(resource.meta && resource.meta.lastUpdated.slice(0, 10)) ?? "-"}
        </p>
      );
    },
  },
];
