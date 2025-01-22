"use server";

import React from "react";
import { getUniversityById } from "@/app/fetcher";

export default async function UniversityGetter({ id }: { id: string }) {
  const university = await getUniversityById(id);
  return <div>{university?.data.name}</div>;
}
