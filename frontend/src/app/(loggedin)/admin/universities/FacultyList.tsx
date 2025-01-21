"use server";

import { handleFacultyList } from "@/app/fetcher";
import React from "react";

export default async function FacultyList({ id }: { id: string }) {
  const faculty = await handleFacultyList(id);
  if (faculty && typeof faculty !== "boolean") {
    return <li>{faculty.data.faculty_name}</li>;
  }

  return <li>Gagal memuat fakultas id: {id}</li>;
}
