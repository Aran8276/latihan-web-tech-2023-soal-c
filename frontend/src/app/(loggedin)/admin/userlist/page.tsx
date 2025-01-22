"use server";

import React from "react";
import { getAllUsers, searchUsers } from "@/app/fetcher";
import UserListView from "./UserListView";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const query = (await searchParams)?.query;
  if (query) {
    const users = (await searchUsers(query))?.data;
    return <UserListView users={users} />;
  }
  const users = (await getAllUsers())?.users;
  return <UserListView users={users} />;
}
