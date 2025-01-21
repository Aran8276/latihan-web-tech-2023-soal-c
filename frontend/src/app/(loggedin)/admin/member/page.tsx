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
import UniversityGetter from "../../member/UniversityGetter";
import { Badge } from "@/components/ui/badge";
import { getAllMemberAcceptances } from "@/app/fetcher";
import AcceptAlert from "./AcceptAlert";
import DeclineAlert from "./DeclineAlert";
import BackButton from "@/components/back-button";
import {
  approveAcceptance,
  declineAcceptance,
  deleteAcceptance,
} from "./action";
import { DeleteButton } from "@/components/DeleteButton";

export default async function page() {
  const acceptances = (await getAllMemberAcceptances())?.data;
  return (
    <div className="flex flex-col space-y-6 m-12">
      <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
        Penerimaan Universitas
      </h3>
      <div>
        <BackButton />
      </div>

      <Table>
        <TableCaption>Daftar pendaftaran universitas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">No</TableHead>
            <TableHead>Nama Universitas</TableHead>
            <TableHead>Nama User</TableHead>
            <TableHead>Email User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
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
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{item.user.email}</TableCell>
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
                <TableCell>
                  {item.status == "pending" ? (
                    <div className="flex space-x-3">
                      <AcceptAlert id={item.id} handler={approveAcceptance} />
                      <DeclineAlert id={item.id} handler={declineAcceptance} />
                    </div>
                  ) : (
                    <span>
                      <DeleteButton
                        action={deleteAcceptance}
                        id={item.id}
                        labelText="Riwayat Penerimaan"
                      />
                    </span>
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
