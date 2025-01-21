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
import { getDegrees } from "@/app/fetcher";
import ActiveBadge from "@/components/ActiveBadge";
import Link from "next/link";
import BackButton from "@/components/back-button";
import { Pen } from "lucide-react";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteDegree } from "./actions";

export default async function page() {
  const degrees = await getDegrees();
  return (
    <section className="flex flex-col space-y-6 m-12">
      <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
        Jurusan
      </h3>
      <div className="flex space-x-3">
        <Link href="/admin/degrees/create" className="w-fit">
          <Button>Tambah Jurusan</Button>
        </Link>
        <BackButton />{" "}
      </div>
      <Table>
        <TableCaption>Daftar jurusan universitas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">No</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nama Jurusan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {degrees?.data.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.degree_name}</TableCell>
                <TableCell>
                  <ActiveBadge isActive={item.is_enabled} />
                </TableCell>
                <TableCell className="flex space-x-3">
                  <Link href={`/admin/degrees/edit/${item.id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-400">
                      <Pen />
                    </Button>
                  </Link>
                  <DeleteButton
                    labelText="Jurusan"
                    id={item.id}
                    action={deleteDegree}
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
