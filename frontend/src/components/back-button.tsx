"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function BackButton({ isLarge }: { isLarge?: boolean }) {
  const router = useRouter();
  return (
    <Button
      size={isLarge ? "lg" : "default"}
      onClick={() => router.back()}
      type="button"
      variant={"outline"}
    >
      Kembali
    </Button>
  );
}
