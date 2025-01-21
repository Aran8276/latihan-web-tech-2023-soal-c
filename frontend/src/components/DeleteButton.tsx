"use client";

import { DegreesActionResponse } from "@/app/(loggedin)/admin/degrees/actions";
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
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteButton({
  labelText,
  id,
  action,
}: {
  labelText: string;
  id: string;
  action: (id: string) => Promise<DegreesActionResponse>;
}) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const res = await action(id);
    if (!res.success) {
      setDialogOpen(false);
      toast(`Gagal menghapus ${labelText}: "${id}":\n${res.msg}`);
      setLoading(false);
      router.refresh();
      return;
    }

    setDialogOpen(false);
    toast(`Berhasil menghapus ${labelText}: "${id}"`);
    setLoading(false);
    router.refresh();
    return;
  };
  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Konfirmasi Hapus {labelText}: &quot;{id}&quot; ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini akan menghapus {labelText} ini dari database dan tidak bisa
            dikembalikan. Apakah anda yakin?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tutup</AlertDialogCancel>
          {loading ? (
            <Button disabled variant="destructive">
              <Loader2 className="animate-spin" />
              Tunggu
            </Button>
          ) : (
            <Button onClick={handleDelete} variant="destructive">
              <Trash2 />
              Hapus
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
