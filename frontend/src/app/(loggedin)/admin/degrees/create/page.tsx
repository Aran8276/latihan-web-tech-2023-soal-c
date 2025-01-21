"use client";

// import { create } from "@/app/create/actions";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDegree, DegreesRequest } from "../actions";
import { toast } from "sonner";

export default function CreateForm() {
  const router = useRouter();

  const [state, setState] = useState({
    loading: false,
    error: "",
  });

  const createFunction = async (payload: DegreesRequest) => {
    if (payload.degree_name && payload.is_enabled) {
      setState({ loading: true, error: "" });
      const processCreate = await createDegree(payload);
      if (!processCreate.success) {
        setState({
          loading: false,
          error: processCreate.msg || "kesalahan",
        });
        return;
      }
      toast("Jurusan berhasil ditambah!");
      router.replace("/admin/degrees");
      return;
    }

    setState({
      loading: false,
      error: "kolum kurang lengkap",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData);

    createFunction(payload);
  };

  return (
    <section className="flex flex-col w-[400px] space-y-6 m-12">
      <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
        Tambah Jurusan
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <div className="flex flex-col space-y-3">
          <Label htmlFor="degree_name">Nama Jurusan</Label>
          <Input id="degree_name" name="degree_name" type="text" />
        </div>

        <div className="flex flex-col space-y-3">
          <Label htmlFor="is_enabled">Status</Label>
          <Select name="is_enabled">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Aktif</SelectItem>
              <SelectItem value="0">Nonaktif</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {state.error && <p className="text-red-500">{state.error}</p>}
        <div className="flex space-x-3">
          {state.loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Tunggu
            </Button>
          ) : (
            <Button>Buat Jurusan</Button>
          )}
          <BackButton />
        </div>
      </form>
    </section>
  );
}
