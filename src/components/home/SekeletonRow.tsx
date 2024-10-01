// components/SkeletonRow.tsx
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";

const SkeletonRow = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <TableRow key={index}>
      {Array.from({ length: 7 }).map((_, index) => (
        <TableCell key={index}>
          <div className="animate-pulse bg-gray-300 rounded h-6 w-full"></div>
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default SkeletonRow;
