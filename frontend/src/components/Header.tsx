// "use server";

// import LogoutButton from "./logout-button";
// import Link from "next/link";
// import { Button } from "./ui/button";
// import { getUser } from "@/app/fetcher";
// import ApplicationLogo from "./ApplicationLogo";

// export default async function Header() {
//   // await new Promise((resolve) => setTimeout(resolve, 3000));
//   return (
//     <header className="flex justify-between items-center py-3 px-5 bg-sky-500 text-white">
//       <section className="flex space-x-8">
//         <ApplicationLogo />
//         <nav className="flex space-x-4  list-none">
//           <Link
//             className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
//             href="/"
//           >
//             Beranda
//           </Link>
//           <Link
//             className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
//             href="/universities"
//           >
//             Universitas
//           </Link>
//           <Link
//             className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
//             href="/about"
//           >
//             Tentang
//           </Link>
//           {user && (
//             <Link
//               className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
//               href="/member"
//             >
//               Member
//             </Link>
//           )}
//           {user && user?.role == "manager" && (
//             <Link
//               className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
//               href="/admin"
//             >
//               Admin
//             </Link>
//           )}
//         </nav>
//       </section>

//       <section className="flex items-center space-x-6">
//         {user && <p>{user.email}</p>}
//         {user ? (
//           <LogoutButton />
//         ) : (
//           <Link href="/login">
//             <Button>Login</Button>
//           </Link>
//         )}
//       </section>
//     </header>
//   );
// }
"use server";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ApplicationLogo from "./ApplicationLogo";
import { getUser } from "@/app/fetcher";
import LogoutButton from "./logout-button";

export default async function Header() {
  const user = await getUser();
  return (
    <header className="py-6">
      <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14 items-center">
            <Link href="#" className="flex items-center" prefetch={false}>
              <ApplicationLogo />
            </Link>
            <nav className="hidden md:flex gap-4">
              <Link
                href="/"
                className="font-medium flex items-center opacity-40 hover:opacity-100 text-sm transition-all text-black no-underline"
                prefetch={true}
              >
                Beranda
              </Link>
              <Link
                href="/about"
                className="font-medium flex items-center opacity-40 hover:opacity-100 text-sm transition-all text-black no-underline"
                prefetch={true}
              >
                Tentang
              </Link>
              <Link
                href="/universities"
                className="font-medium flex items-center opacity-40 hover:opacity-100 text-sm transition-all text-black no-underline"
                prefetch={true}
              >
                Universitas
              </Link>
              {user && (
                <>
                  <Link
                    href="/member"
                    className="font-medium flex items-center opacity-40 hover:opacity-100 text-sm transition-all text-black no-underline"
                    prefetch={false}
                  >
                    Member
                  </Link>

                  {user && user?.role == "manager" && (
                    <Link
                      href="/admin"
                      className="font-medium flex items-center opacity-40 hover:opacity-100 text-sm transition-all text-black no-underline"
                      prefetch={false}
                    >
                      Admin
                    </Link>
                  )}
                </>
              )}
            </nav>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <p className="text-sm">{user.email}</p>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/register" className="w-fit">
                    <Button size="sm">Daftar</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
