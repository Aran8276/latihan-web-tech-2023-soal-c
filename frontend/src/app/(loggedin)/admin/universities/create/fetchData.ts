"use server";

import { getDegrees, getFaculties } from "@/app/fetcher";

export const fetchDegrees = async () => {
  const res = await getDegrees();
  return res?.data;
};

export const fetchFaculties = async () => {
  const res = await getFaculties();
  return res?.data;
};

