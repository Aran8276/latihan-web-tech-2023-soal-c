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
import BackButton from "@/components/back-button";
import { DeleteButton } from "@/components/DeleteButton";
import Searchbar from "@/components/Searchbar";
import { User } from "@/app/fetcher";
import ActiveBadge from "@/components/ActiveBadge";
import UpdateUserModal from "./UpdateUserModal";
import { deleteUser, updateUser } from "./action";

export default async function UserListView({ users }: { users?: User[] }) {
  return (
    <div className="flex flex-col space-y-6 m-12">
      <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
        Penerimaan Universitas
      </h3>
      <div>
        <BackButton />
      </div>
      <div>
        <Searchbar action="/admin/userlist" label="user" />
      </div>
      <Table>
        <TableCaption>Daftar pendaftaran universitas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">No</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Nama User</TableHead>
            <TableHead>Email User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <ActiveBadge isActive={item.is_active} />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-3">
                    <DeleteButton
                      action={deleteUser}
                      id={item.id.toString()}
                      labelText="User"
                    />
                    <UpdateUserModal
                      action={updateUser}
                      id={item.id.toString()}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
