"use client";

import { register } from "@/app/register/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "./ui/icons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get(
      "password_confirmation"
    ) as string;

    if (!name || !email || !password || !passwordConfirmation) {
      setError("Masukan email, password, dan konfirmasi password");
      setIsLoading(false);
      return;
    }

    const processRegister = await register(
      name,
      email,
      password,
      passwordConfirmation
    );
    if (!processRegister.success) {
      setError(
        processRegister.msg ||
          processRegister.message ||
          "Kesalahan tidak diketahui, coba lagi nanti."
      );
      setIsLoading(false);
      return;
    }

    router.push("/");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Daftar</CardTitle>
        <CardDescription>
          Daftarkan email dan password anda dan masuk ke Website Universitas.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Nama</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Aran Aran"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="aran@8276.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading ? "Tunggu..." : "Daftar"}
          </Button>
          <div className="text-sm text-muted-foreground text-center">
            Sudah punya akun?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Masuk
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
