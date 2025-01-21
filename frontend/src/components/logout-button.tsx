"use client";

import { useRouter } from "next/navigation";
import { handleLogout } from "./action/logout-button";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogoutClick = async () => {
    await handleLogout();
    router.push("/login");
  };

  return (
    <Button size="sm" onClick={handleLogoutClick}>
      Keluar
    </Button>
  );
}
