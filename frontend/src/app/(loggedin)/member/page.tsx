"use server";

import React from "react";
import { getPersonalMemberAcceptances } from "@/app/fetcher";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UniversityGetter from "./UniversityGetter";
import { Badge } from "@/components/ui/badge";

export default async function page() {
  const acceptances = (await getPersonalMemberAcceptances())?.data;
  return (
    <div className="flex flex-col space-y-6 m-12">
      <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
        Penerimaan Universitas
      </h3>
      <Table>
        <TableCaption>Daftar pendaftaran universitas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">No</TableHead>
            <TableHead>Nama Universitas</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {acceptances?.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <UniversityGetter id={item.universities_id} />
                </TableCell>
                <TableCell>
                  {item.status == "pending" ? (
                    <Badge className="bg-gray-500 cursor-default hover:bg-gray-400">
                      Menunggu
                    </Badge>
                  ) : item.status == "accepted" ? (
                    <Badge className="bg-green-500 cursor-default hover:bg-gray-400">
                      Diterima
                    </Badge>
                  ) : (
                    item.status == "declined" && (
                      <Badge className="bg-red-500 cursor-default hover:bg-gray-400">
                        Ditolak
                      </Badge>
                    )
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
