"use server";

import { Button } from "@/components/ui/button";
// import * as motion from "motion/react-client";
// import Link from "next/link";
import { getUniversities, UniversitiesIndexResponse } from "@/app/fetcher";
import UniversityGrid from "@/components/UniversityGrid";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const universities: UniversitiesIndexResponse | null =
    await getUniversities();
  return (
    <>
      <section className="bg-[url('/jumbotron.jpg')] bg-center text-white">
        <div className="flex bg-[rgba(0,0,0,0.5)] flex-col md:flex-row items-center space-x-24 px-24 py-8 justify-between">
          <div className="w-[800px] space-y-4">
            <h3 className="w-full text-4xl font-bold font-manrope leading-normal">
              Website Universitas
            </h3>
            <p className="text-justify text-lg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
              fugit voluptates cupiditate, consequuntur, quisquam eveniet soluta
              illo cumque vero facere nesciunt fuga similique nihil iure?
              Quibusdam saepe veniam, repudiandae velit molestias adipisci eius
              odio cumque facilis ducimus nesciunt perspiciatis, eum quas
              excepturi voluptas ad sapiente veritatis rerum culpa dolores
              repellendus blanditiis doloremque. Iusto cumque possimus
              necessitatibus et temporibus amet excepturi eius autem expedita
              veniam.
            </p>
            <div className="pt-4">
              <Link href="/universities">
                <Button
                  variant={"secondary"}
                  className="group hover:bg-gray-200"
                  size={"lg"}
                >
                  Cari Universitas
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center m-12">
        <div className="flex flex-col space-y-12 w-full">
          <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
            Rekomendasi Universitas
          </h3>
          <div className="flex space-x-12">
            <section className="w-[3200px]">
              {universities?.data && (
                <UniversityGrid
                  gridcols="grid-cols-2"
                  universitiesMaxAmt={4}
                  data={universities?.data}
                />
              )}
            </section>
            <aside className="w-full">
              <Card className="flex flex-col space-y-4 w-full h-full p-8 bg-gray-100 rounded-xl">
                <h3 className="text-gray-900 text-xl font-semibold leading-8">
                  Tentang Universitas
                </h3>
                <p className="text-justify text-gray-600 text-base font-normal leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat autem quos laborum libero fuga incidunt laboriosam
                  harum optio, odit eligendi placeat hic error facilis enim
                  provident maxime consectetur nihil repellendus blanditiis sint
                  neque ad!
                </p>
                <div className="pt-4">
                  <Button>Tentang</Button>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </section>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full flex-col justify-start items-center lg:gap-12 gap-10 inline-flex">
            <div className="w-full flex-col justify-start items-center gap-3 flex">
              <h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">
                Cara Kerja
              </h2>
              <p className="max-w-2xl text-center text-gray-400 text-base font-normal leading-relaxed">
                Proses ini menjelaskan langkah-langkah yang perlu diikuti untuk
                mendaftar ke universitas melalui aplikasi website.
              </p>
            </div>
            <div className="w-full justify-start items-start gap-8 grid md:grid-cols-3 grid-cols-1">
              <div className="w-full flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="w-full flex justify-between relative">
                  <h4 className="text-gray-900 text-xl font-semibold leading-8">
                    Pilih Universitas Anda
                  </h4>
                  <h3 className="text-gray-100 text-7xl font-extrabold font-manrope leading-[100px] absolute -top-9 right-0">
                    1
                  </h3>
                </div>
                <p className="text-gray-400 text-base font-normal leading-relaxed">
                  Kumpulkan semua data atau materi yang diperlukan untuk proses
                  ini. Misalnya, dalam pendaftaran universitas, ini melibatkan
                  persiapan informasi pribadi, catatan akademik, dan dokumen
                  yang diperlukan seperti surat rekomendasi atau esai.
                </p>
              </div>
              <div className="w-full flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="w-full flex justify-between relative">
                  <h4 className="text-gray-900 text-xl font-semibold leading-8">
                    Tunggu Penerimaan
                  </h4>
                  <h3 className="text-gray-100 text-7xl font-extrabold font-manrope leading-[100px] absolute -top-9 right-0">
                    2
                  </h3>
                </div>
                <p className="text-gray-400 text-base font-normal leading-relaxed">
                  Laksanakan mekanisme inti atau operasi. Untuk pendaftaran
                  universitas, langkah ini mencakup pengiriman aplikasi melalui
                  portal online universitas dan menunggu keputusan penerimaan.
                  Universitas akan meninjau aplikasi Anda dan memberi tahu Anda
                  tentang keputusan mereka.
                </p>
              </div>
              <div className="w-full flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="w-full flex justify-between relative">
                  <h4 className="text-gray-900 text-xl font-semibold leading-8">
                    Kunjungi Universitas
                  </h4>
                  <h3 className="text-gray-100 text-7xl font-extrabold font-manrope leading-[100px] absolute -top-9 right-0">
                    3
                  </h3>
                </div>
                <p className="text-gray-400 text-base font-normal leading-relaxed">
                  Setelah menerima surat penerimaan, Anda dapat menyelesaikan
                  pendaftaran dengan menyelesaikan langkah tambahan yang
                  diperlukan oleh universitas, seperti membayar biaya kuliah,
                  menghadiri orientasi, dan mendaftar untuk kelas. Akhirnya,
                  Anda dapat mengunjungi kampus universitas untuk memulai
                  perjalanan akademis Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
