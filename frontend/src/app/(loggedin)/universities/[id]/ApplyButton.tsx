"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ApplyUniversityResponse } from "./action";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ApplyButton({
  id,
  handler,
  universityName,
  isApplied,
}: {
  id: string;
  handler: (is: string) => Promise<ApplyUniversityResponse>;
  universityName: string;
  isApplied: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const apply = async () => {
    setLoading(true);
    await handler(id);
    router.refresh();
    setLoading(false);
    toast(`Berhasil mendaftar di universitas "${universityName}"!`);
  };

  return (
    <>
      {loading ? (
        <Button disabled>
          <Loader2 className="animate-spin" />
        </Button>
      ) : (
        <>
          {isApplied ? (
            <Link href="/member" className="w-fit">
              <Button size={"lg"}>Lihat Status Penerimaan</Button>
            </Link>
          ) : (
            <Button size={"lg"} onClick={apply}>
              Daftar
            </Button>
          )}
        </>
      )}{" "}
    </>
  );
}
