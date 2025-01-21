"use server";

import { cookies } from "next/headers";
import axiosInstance from "@/utils/auth-axios";
import { AxiosError } from "axios";

interface RegisterResponse {
  success: boolean;
  token: string;
  msg?: string;
  message?: string;
}

export async function register(
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
) {
  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const response = await axiosInstance.post("/api/register", {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    });

    const data: RegisterResponse = response.data;
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
  } catch (error) {
    if (error instanceof AxiosError) {
      return error?.response?.data;
    }
  }
}
