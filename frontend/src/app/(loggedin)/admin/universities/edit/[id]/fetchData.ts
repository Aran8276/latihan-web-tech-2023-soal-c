"use server";

import { getDegrees, getFaculties, getUniversityById } from "@/app/fetcher";

export const fetchDegrees = async () => {
  const res = await getDegrees();
  return res?.data;
};

export const fetchFaculties = async () => {
  const res = await getFaculties();
  return res?.data;
};

export const fetchUniversityById = async (id: string) => {
  const res = await getUniversityById(id);
  return res?.data;
};
