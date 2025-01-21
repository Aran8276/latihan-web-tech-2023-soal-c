"use server";

import axiosInstance from "@/utils/auth-axios";

export interface UserResponse {
  success: boolean;
  msg: string;
}

export async function deleteUser(id: string): Promise<UserResponse> {
  const res = await axiosInstance.delete(`/api/users/delete/${id}`);
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}

export async function updateUser(
  id: string,
  payload: object
): Promise<UserResponse> {
  const res = await axiosInstance.put(`/api/users/update/${id}`, payload);
  const data = res.data;

  if (!data.success) {
    return data;
  }
  return data;
}
