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
import { Loader2, X } from "lucide-react";
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
      toast(`Gagal menolak siswa ${id}: ${res.msg}`);
      setOpen(false);
      setLoading(false);
      return;
    }
    router.refresh();
    setOpen(false);
    toast(`Siswa ${id} berhasil ditolak!`);
    setLoading(false);
    return;
  };
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-400">
          <X />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Setelah anda menolak siswa ini, anda tidak dapat menerima atau
            mengubahnya lagi dan siswa akan dinyatakan ditolak. Apakah anda
            yakin?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tutup</AlertDialogCancel>
          {loading ? (
            <Button disabled className="bg-red-500 hover:bg-red-400">
              <Loader2 className="animate-spin" />
              Tunggu
            </Button>
          ) : (
            <Button
              onClick={() => handleButton(id)}
              className="bg-red-500 hover:bg-red-400"
            >
              <X />
              Tolak
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
