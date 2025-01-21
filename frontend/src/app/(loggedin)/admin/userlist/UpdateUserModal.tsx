"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Pen } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { DegreesActionResponse } from "../degrees/actions";
import { toast } from "sonner";

export default function UpdateUserModal({
  id,
  action,
}: {
  id: string;
  action: (id: string, payload: object) => Promise<DegreesActionResponse>;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const [open, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleUpdate = async (payload: object) => {
    setLoading(true);
    const res = await action(id, payload);
    if (!res.success) {
      setDialogOpen(false);
      toast(`Gagal meng-update user: "${id}":\n${res.msg}`);
      setLoading(false);
      router.refresh();
      return;
    }

    setDialogOpen(false);
    toast(`Berhasil meng-update user: "${id}"`);
    setLoading(false);
    router.refresh();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData);

    handleUpdate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-400">
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ubah Status user &quot;{id}&quot;</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Select name="is_active">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Aktif</SelectItem>
                <SelectItem value="0">Nonaktif</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Tutup</Button>
          </DialogClose>
          {loading ? (
            <Button disabled className="bg-blue-500 hover:bg-blue-400">
              <Loader2 className="animate-spin" />
              Tunggu
            </Button>
          ) : (
            <Button
              onClick={() => formRef?.current?.requestSubmit()}
              className="bg-blue-500 hover:bg-blue-400"
            >
              <Pen />
              Update
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
