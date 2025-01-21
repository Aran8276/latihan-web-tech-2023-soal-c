"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { AcceptanceResponse } from "./action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AcceptAlert({
  handler,
  id,
}: {
  handler: (id: string) => Promise<AcceptanceResponse>;
  id: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleButton = async (id: string) => {
    setLoading(true);
    const res = await handler(id);
    if (!res.success) {
      router.refresh();
      toast(`Gagal menerima siswa ${id}: ${res.msg}`);
      setOpen(false);
      setLoading(false);
      return;
    }
    router.refresh();
    setOpen(false);
    toast(`Siswa ${id} berhasil diterima!`);
    setLoading(false);
    return;
  };
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-400">
          <Check />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Setelah anda menerima siswa ini, anda tidak dapat mengubahnya lagi
            dan siswa akan dinyatakan diterima. Apakah anda yakin?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tutup</AlertDialogCancel>
          {loading ? (
            <Button className="bg-green-500" disabled>
              <Loader2 className="animate-spin" /> Tunggu
            </Button>
          ) : (
            <Button
              onClick={() => handleButton(id)}
              className="bg-green-500 hover:bg-green-400"
            >
              <Check />
              Terima
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
