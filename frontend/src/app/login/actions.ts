"use server";

import { cookies } from "next/headers";
import axiosInstance from "@/utils/auth-axios";

interface LoginResponse {
  success: boolean;
  token: string;
  msg?: string;
}

export async function login(email: string, password: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const response = await axiosInstance.post("/api/login", {
    email: email,
    password: password,
  });

  const data: LoginResponse = response.data;
  if (!data.success) {
    return data;
  }

  const cookieStore = await cookies();
  cookieStore.set("session", data.token, {
    httpOnly: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  return data;
}
