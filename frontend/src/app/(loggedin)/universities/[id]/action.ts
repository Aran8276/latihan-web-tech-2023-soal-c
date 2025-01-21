"use server";

import axiosInstance from "@/utils/auth-axios";

export interface ApplyUniversityResponse {
  success: boolean;
  msg: string;
}

export async function applyUniversity(
  id: string
): Promise<ApplyUniversityResponse> {
  const res = await axiosInstance.post(`/api/apply/${id}`);
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}
