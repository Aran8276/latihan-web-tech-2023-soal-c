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
import { getUniversities } from "@/app/fetcher";
import Link from "next/link";
import BackButton from "@/components/back-button";
import { Pen } from "lucide-react";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteUniversity } from "./actions";
import UniModalDetail from "./ModalDetail";

export default async function page() {
  const universities = await getUniversities();
  return (
    <section className="flex flex-col space-y-6 m-12">
      <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
        Universitas
      </h3>
      <div className="flex space-x-3">
        <Link href="/admin/universities/create" className="w-fit">
          <Button>Tambah Universitas</Button>
        </Link>
        <BackButton />{" "}
      </div>
      <Table>
        <TableCaption>Daftar universitas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">No</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nama Universitas</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Akreditasi</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {universities?.data.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  {item.category.charAt(0).toUpperCase() +
                    String(item.category).slice(1)}
                </TableCell>
                <TableCell>{item.accreditation.toUpperCase()}</TableCell>
                <TableCell className="flex space-x-3">
                  <Link href={`/admin/universities/edit/${item.id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-400">
                      <Pen />
                    </Button>
                  </Link>
                  <DeleteButton
                    labelText="Universitas"
                    id={item.id}
                    action={deleteUniversity}
                  />
                  <UniModalDetail data={item} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
