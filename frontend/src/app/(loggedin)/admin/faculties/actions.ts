"use server";

export interface FacultiesRequest {
  faculty_name?: string;
  is_enabled?: number;
}

export interface FacultiesActionResponse {
  success: boolean;
  msg: string;
}

import axiosInstance from "@/utils/auth-axios";

export async function createFaculty(
  payload: FacultiesRequest
): Promise<FacultiesActionResponse> {
  const res = await axiosInstance.post("/api/faculty/store", payload);
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}

export async function editFaculty(
  payload: FacultiesRequest,
  id: string
): Promise<FacultiesActionResponse> {
  const res = await axiosInstance.put(`/api/faculty/update/${id}`, payload);
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}

export async function deleteFaculty(
  id: string
): Promise<FacultiesActionResponse> {
  const res = await axiosInstance.delete(`/api/faculty/delete/${id}`);
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}
