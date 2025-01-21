"use server";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  GraduationCap,
  Users,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default async function AboutPage() {
  return (
    <div className="container mx-auto px-24 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Tentang Website Universitas
      </h1>

      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
        Selamat datang di platform utama untuk pendaftaran dan manajemen
        universitas. Kami menghubungkan siswa dengan berbagai universitas,
        menyederhanakan proses aplikasi dan membantu institusi mengelola data
        mereka secara efisien.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <FeatureCard
          icon={<Building2 className="h-8 w-8" />}
          title="Manajemen Data Universitas"
          description="Sistem terpusat untuk universitas dalam mengelola data institusional, program, dan kriteria penerimaan mereka."
        />
        <FeatureCard
          icon={<Users className="h-8 w-8" />}
          title="Informasi Fakultas"
          description="Profil fakultas yang komprehensif dan informasi departemen untuk membantu siswa membuat keputusan yang tepat."
        />
        <FeatureCard
          icon={<GraduationCap className="h-8 w-8" />}
          title="Penawaran Gelar"
          description="Informasi terperinci tentang berbagai program gelar yang ditawarkan oleh setiap universitas, termasuk persyaratan dan hasilnya."
        />
        <FeatureCard
          icon={<ClipboardList className="h-8 w-8" />}
          title="Pendaftaran Anggota yang Diterima"
          description="Sistem pendaftaran yang disederhanakan untuk siswa yang diterima, mempermudah proses pendaftaran."
        />
      </div>

      <div className="text-center">
        <Link href="/universities" className="w-fit">
          <Button size="lg" className="group">
            Lihat Daftar Universitas
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
