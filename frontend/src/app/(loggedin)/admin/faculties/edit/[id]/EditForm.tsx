"use client";

import React, { useState } from "react";
import { FacultiesRequest, editFaculty } from "../../actions";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/back-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Faculties } from "@/app/fetcher";
import { toast } from "sonner";

export default function EditForm({ formFields }: { formFields: Faculties }) {
  const router = useRouter();
  const [state, setState] = useState({
    loading: false,
    error: "",
  });

  const editFunction = async (payload: FacultiesRequest) => {
    if (payload.faculty_name && payload.is_enabled) {
      setState({ loading: true, error: "" });
      const processCreate = await editFaculty(payload, formFields.id);
      console.log(processCreate);
      if (!processCreate.success) {
        setState({
          loading: false,
          error: processCreate.msg || "kesalahan",
        });
        return;
      }
      toast("Fakultas berhasil diedit!");
      router.replace("/admin/faculties");
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

    editFunction(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <div className="flex flex-col space-y-3">
        <Label>ID Fakultas</Label>
        <Input value={formFields.id} disabled type="text" />
      </div>

      <div className="flex flex-col space-y-3">
        <Label htmlFor="faculty_name">Nama Fakultas</Label>
        <Input
          defaultValue={formFields.faculty_name}
          id="faculty_name"
          name="faculty_name"
          type="text"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <Label htmlFor="is_enabled">Status</Label>
        <Select
          defaultValue={Number(formFields.is_enabled).toString()}
          name="is_enabled"
        >
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
          <Button>Update Fakultas</Button>
        )}
        <BackButton />
      </div>
    </form>
  );
}
