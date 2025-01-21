"use server";

import { Button } from "@/components/ui/button";
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
import { Universities } from "@/app/fetcher";
import { Eye } from "lucide-react";
import Link from "next/link";
import FacultyList from "./FacultyList";
import DegreeList from "./DegreeList";

/*
|    "name": "universitas baru",
|    "overview": "lorem ipsum dolor sit amet",
|    "tel": "08123456",
|    "email": "foreign@whips.com",
|    "website": "whips.com",
|    "address": "jalan 1234567 ahmad yani",
|    "accreditation": "a",
|    "category": "swasta",
|    "degree": ["cC5p0GZlZ4hXLcLE"],
|    "faculty": ["tQ8OgVA8kXGMmE2m"],
|    "registration_cost": 500000,
|    "time_minutes": 60
*/

export default async function UniModalDetail({ data }: { data: Universities }) {
  const parsedDegrees: string[] = JSON.parse(data.degree);
  const parsedFaculties: string[] = JSON.parse(data.faculty);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-400">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail Universitas: {data.id}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid h-[400px] overflow-y-scroll grid-cols-2 gap-4 py-4">
          <section className="flex flex-col">
            <p className="font-bold">Nama</p>
            <p>{data.name}</p>
          </section>
          <section className="flex col-span-2 flex-col">
            <p className="font-bold">Overview</p>
            <p>{data.overview}</p>
          </section>
          <section className="flex flex-col">
            <p className="font-bold">No Telepon</p>
            <p>{data.tel}</p>
          </section>
          <section className="flex flex-col">
            <p className="font-bold">Email </p>
            <Link
              className="text-blue-500 hover:underline w-fit"
              href={`mailto:${data.email}`}
            >
              {data.email}
            </Link>
          </section>
          <section className="flex flex-col">
            <p className="font-bold">Website</p>
            <Link
              className="text-blue-500 hover:underline w-fit"
              href={`https://${data.website}`}
              target="_blank"
            >
              {data.website}
            </Link>
          </section>
          <section className="flex flex-col">
            <p className="font-bold">Alamat </p>
            <p>{data.address}</p>
          </section>
          <section className="flex flex-col">
            <p className="font-bold">Akreditasi</p>
            <p>{data.accreditation.toUpperCase()}</p>
          </section>
          <section className="flex flex-col">
            <p className="font-bold">Kategori</p>
            <p>
              {data.category.charAt(0).toUpperCase() +
                String(data.category).slice(1)}
            </p>
          </section>
          <section className="flex flex-col">
            <p className="font-bold">Jurusan Tersedia</p>
            <ul className="pl-5 list-disc">
              {parsedDegrees.map((item, index) => {
                return <DegreeList key={index} id={item} />;
              })}
            </ul>
          </section>
          <section className="flex flex-col">
            <p className="font-bold">Fakultas Tersedia</p>
            <ul className="pl-5 list-disc">
              <li>sad</li>
              {parsedFaculties.map((item, index) => {
                return <FacultyList key={index} id={item} />;
              })}
            </ul>
          </section>
          <section className="flex flex-col">
            <p className="font-bold">Biaya Pendaftaran</p>
            <p>{`Rp${data.cost.registration_cost.toLocaleString()}`}</p>
          </section>
          <section className="flex flex-col">
            <p className="font-bold">Waktu Pendaftaran</p>
            <p>{`${data.cost.time_minutes} menit`}</p>
          </section>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} type="button">
              Tutup
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
