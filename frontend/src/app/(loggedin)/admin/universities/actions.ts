"use server";

import axiosInstance from "@/utils/auth-axios";
import { AxiosError } from "axios";

export interface UniversitiesRequest {
  name?: string;
  overview?: string;
  tel?: string;
  email?: string;
  website?: string;
  address?: string;
  accreditation?: string;
  category?: string;
  degree?: string[];
  faculty?: string[];
  registration_cost?: number;
  time_minutes?: number;
}

export interface UniversitiesActionResponse {
  success: boolean;
  msg: string;
  message?: string;
}

export async function createUniversity(
  payload: UniversitiesRequest
): Promise<UniversitiesActionResponse | undefined> {
  try {
    const res = await axiosInstance.post("/api/universities/store", payload);
    const data = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        ...error.response?.data,
      };
    }
  }
}

export async function editUniversity(
  payload: UniversitiesRequest,
  id: string
): Promise<UniversitiesActionResponse> {
  const res = await axiosInstance.put(
    `/api/universities/update/${id}`,
    payload
  );
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}

export async function deleteUniversity(
  id: string
): Promise<UniversitiesActionResponse> {
  const res = await axiosInstance.delete(`/api/universities/delete/${id}`);
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}
