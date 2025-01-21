"use server";

import React from "react";
import { Badge } from "./ui/badge";

export default async function ActiveBadge({
  isActive,
}: {
  isActive: boolean | number;
}) {
  return (
    <div>
      {isActive ? (
        <Badge className="bg-green-500 hover:bg-green-400">Aktif</Badge>
      ) : (
        <Badge variant={"destructive"}>Nonaktif</Badge>
      )}
    </div>
  );
}
