"use server";

import { handleDegreeList } from "@/app/fetcher";
import React from "react";

export default async function DegreeList({ id }: { id: string }) {
  const degree = await handleDegreeList(id);
  if (degree && typeof degree !== "boolean") {
    return <li>{degree.data.degree_name}</li>;
  }

  return <li>Gagal memuat jurusan id: {id}</li>;
}
