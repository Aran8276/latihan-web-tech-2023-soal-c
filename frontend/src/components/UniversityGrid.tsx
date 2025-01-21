"use server";

import { Universities } from "@/app/fetcher";
import React from "react";
import UniversityCard from "./UniversityCard";

export default async function UniversityGrid({
  data,
  gridcols,
  universitiesMaxAmt,
}: {
  data: Universities[];
  gridcols: string;
  universitiesMaxAmt?: number;
}) {
  return (
    <div className={`grid ${gridcols} gap-4`}>
      {universitiesMaxAmt ? (
        <>
          {data.slice(0, universitiesMaxAmt).map((item, index) => {
            return <UniversityCard key={index} data={item} />;
          })}
        </>
      ) : (
        <>
          {data.map((item, index) => {
            return <UniversityCard key={index} data={item} />;
          })}
        </>
      )}
    </div>
  );
}
