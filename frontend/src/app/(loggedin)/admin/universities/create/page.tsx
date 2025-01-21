"use client";

// import { create } from "@/app/create/actions";
import React, { useEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
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
import { createUniversity } from "../actions";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Degrees, Faculties } from "@/app/fetcher";
import { fetchDegrees, fetchFaculties } from "./fetchData";

export interface Degree {
  id: string;
  degree_name: string;
  is_enabled: number;
}

export interface Faculty {
  id: string;
  faculty_name: string;
  is_enabled: number;
}

export default function CreateForm() {
  const router = useRouter();
  const [degrees, setDegrees] = useState<Degrees[] | undefined>();
  const [faculties, setFaculties] = useState<Faculties[] | undefined>();

  const mainFetchData = async () => {
    const degreesData = await fetchDegrees();
    const facultiesData = await fetchFaculties();
    setDegrees(degreesData);
    setFaculties(facultiesData);
  };

  useEffect(() => {
    mainFetchData();
  }, []);

  const [state, setState] = useState({
    loading: false,
    error: "",
  });

  const createFunction = async (payload: object) => {
    setState({ loading: true, error: "" });
    const processCreate = await createUniversity(payload);
    if (!processCreate || !processCreate.success) {
      setState({
        loading: false,
        error: processCreate?.msg || processCreate?.message || "kesalahan",
      });
      return;
    }
    toast("Universitas berhasil ditambah!");
    router.replace("/admin/universities");
    return;
  };

  const [checkedDegrees, setCheckedDegrees] = useState<{
    [key: string]: boolean;
  }>({});

  const [checkedFaculties, setCheckedFaculties] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    console.log(checkedDegrees);
  }, [checkedDegrees]);

  const handleCheckedChange = (degreeId: string, checked: boolean) => {
    setCheckedDegrees((prev) => ({
      ...prev,
      [degreeId]: checked,
    }));
  };

  const handleCheckedChangeFaculty = (facultyId: string, checked: boolean) => {
    setCheckedFaculties((prev) => ({
      ...prev,
      [facultyId]: checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData);

    createFunction({
      ...payload,
      degree: Object.keys(checkedDegrees).filter((key) => checkedDegrees[key]),
      faculty: Object.keys(checkedFaculties).filter(
        (key) => checkedFaculties[key]
      ),
    });
  };

  return (
    <section className="flex flex-col w-[400px] space-y-6 m-12">
      <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
        Tambah Universitas
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex col-span-2 flex-col space-y-3">
            <Label htmlFor="name">Nama Universitas</Label>
            <Input id="name" name="name" type="text" />
          </div>

          <div className="flex col-span-2 flex-col space-y-3">
            <Label htmlFor="overview">Overview Universitas</Label>
            <Textarea id="overview" name="overview" />
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="tel">No Telepon Universitas</Label>
            <Input id="tel" name="tel" type="text" />
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="email">Email Universitas</Label>
            <Input id="email" name="email" type="email" />
          </div>

          <div className="flex col-span-2 flex-col space-y-3">
            <Label htmlFor="website">Website Universitas</Label>
            <Input id="website" name="website" type="text" />
          </div>

          <div className="flex col-span-2 flex-col space-y-3">
            <Label htmlFor="address">Alamat Universitas</Label>
            <Textarea id="address" name="address" />
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="accreditation">Akreditasi</Label>
            <Select name="accreditation">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Akreditasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">A</SelectItem>
                <SelectItem value="b">B</SelectItem>
                <SelectItem value="c">C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="category">Kategori Universitas</Label>
            <Select name="category">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="politeknik">Politeknik</SelectItem>
                <SelectItem value="swasta">Swasta</SelectItem>
                <SelectItem value="negeri">Negeri</SelectItem>
                <SelectItem value="institut">Institut</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="registration_cost">Biaya Registrasi</Label>
            <Input
              defaultValue={0}
              id="registration_cost"
              name="registration_cost"
              type="number"
            />
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="time_minutes">Waktu Registrasi</Label>
            <Select name="time_minutes">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 menit</SelectItem>
                <SelectItem value="60">60 menit</SelectItem>
                <SelectItem value="120">120 menit</SelectItem>
                <SelectItem value="160">160 menit</SelectItem>
                <SelectItem value="200">200+ menit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="category">Jurusan Tersedia</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex justify-between" variant="outline">
                  Pilih Jurusan <ChevronDown className="text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {degrees?.map((item) => (
                  <DropdownMenuCheckboxItem
                    key={item.id}
                    checked={checkedDegrees[item.id] || false}
                    onCheckedChange={(checked) =>
                      handleCheckedChange(item.id, checked)
                    }
                  >
                    {item.degree_name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col space-y-3">
            <Label htmlFor="category">Fakultas Tersedia</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex justify-between" variant="outline">
                  Pilih Fakultas <ChevronDown className="text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {faculties?.map((item) => (
                  <DropdownMenuCheckboxItem
                    key={item.id}
                    checked={checkedFaculties[item.id] || false}
                    onCheckedChange={(checked) =>
                      handleCheckedChangeFaculty(item.id, checked)
                    }
                  >
                    {item.faculty_name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {state.error && <p className="text-red-500">{state.error}</p>}
        <div className="flex space-x-3">
          {state.loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Tunggu
            </Button>
          ) : (
            <Button>Buat Universitas</Button>
          )}
          <BackButton />
        </div>
      </form>
    </section>
  );
}
