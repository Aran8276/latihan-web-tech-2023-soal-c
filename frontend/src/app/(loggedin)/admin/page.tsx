import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <section className="flex flex-col space-y-6 m-12">
        <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
          Dashboard Admin
        </h3>

        <div className="flex flex-col space-y-3">
          <Link href="/admin/faculties" className="w-fit">
            <Button size="lg" className="group">
              Fakultas
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/admin/degrees" className="w-fit">
            <Button size="lg" className="group">
              Jurusan
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/admin/universities" className="w-fit">
            <Button size="lg" className="group">
              Universitas
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/admin/member" className="w-fit">
            <Button size="lg" className="group">
              Penerimaan
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/admin/userlist" className="w-fit">
            <Button size="lg" className="group">
              User
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
