"use server";

import axiosInstance from "@/utils/auth-axios";

export interface AcceptanceResponse {
  success: boolean;
  msg: string;
}

export async function approveAcceptance(
  id: string
): Promise<AcceptanceResponse> {
  const res = await axiosInstance.put(`/api/acceptance/update/${id}`, {
    status: "accepted",
  });
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}

export async function declineAcceptance(
  id: string
): Promise<AcceptanceResponse> {
  const res = await axiosInstance.put(`/api/acceptance/update/${id}`, {
    status: "declined",
  });
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}

export async function deleteAcceptance(
  id: string
): Promise<AcceptanceResponse> {
  const res = await axiosInstance.delete(`/api/acceptance/delete/${id}`);
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}
