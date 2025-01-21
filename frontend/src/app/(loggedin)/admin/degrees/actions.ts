"use server";

export interface DegreesRequest {
  degree_name?: string;
  is_enabled?: number;
}

export interface DegreesActionResponse {
  success: boolean;
  msg: string;
}

import axiosInstance from "@/utils/auth-axios";

export async function createDegree(
  payload: DegreesRequest
): Promise<DegreesActionResponse> {
  const res = await axiosInstance.post("/api/degrees/store", payload);
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}

export async function editDegree(
  payload: DegreesRequest,
  id: string
): Promise<DegreesActionResponse> {
  const res = await axiosInstance.put(`/api/degrees/update/${id}`, payload);
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}

export async function deleteDegree(id: string): Promise<DegreesActionResponse> {
  const res = await axiosInstance.delete(`/api/degrees/delete/${id}`);
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}
