"use server";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Form from "next/form";

export default async function Searchbar({
  action,
  label,
}: {
  action: string;
  label: string;
}) {
  return (
    <Form
      action={action}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input name="query" placeholder={`Cari ${label}...`} className="w-full" />
      <Button type="submit" className="px-8">
        Cari
      </Button>
    </Form>
  );
}
