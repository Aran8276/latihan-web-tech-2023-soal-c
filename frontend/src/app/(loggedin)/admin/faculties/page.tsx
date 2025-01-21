"use server";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getFaculties } from "@/app/fetcher";
import ActiveBadge from "@/components/ActiveBadge";
import Link from "next/link";
import BackButton from "@/components/back-button";
import { Pen } from "lucide-react";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteFaculty } from "./actions";

export default async function page() {
  const faculties = await getFaculties();
  return (
    <section className="flex flex-col space-y-6 m-12">
      <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
        Fakultas
      </h3>
      <div className="flex space-x-3">
        <Link href="/admin/faculties/create" className="w-fit">
          <Button>Tambah Fakultas</Button>
        </Link>
        <BackButton />{" "}
      </div>
      <Table>
        <TableCaption>Daftar fakultas universitas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">No</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nama Fakultas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faculties?.data.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.faculty_name}</TableCell>
                <TableCell>
                  <ActiveBadge isActive={item.is_enabled} />
                </TableCell>
                <TableCell className="flex space-x-3">
                  <Link href={`/admin/faculties/edit/${item.id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-400">
                      <Pen />
                    </Button>
                  </Link>
                  <DeleteButton
                    labelText="Fakultas"
                    id={item.id}
                    action={deleteFaculty}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
