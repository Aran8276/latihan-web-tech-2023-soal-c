"use server";

import {
  checkIfAlreadyApplied,
  getUniversityById,
  getUser,
} from "@/app/fetcher";
import BackButton from "@/components/back-button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ApplyButton from "./ApplyButton";
import { applyUniversity } from "./action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser();
  const university = (await getUniversityById(params.id))?.data;
  const isApplied = user
    ? (await checkIfAlreadyApplied(params.id))?.payload
    : false;
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="pro-detail w-full flex flex-col justify-center order-last lg:order-none max-lg:max-w-[608px] max-lg:mx-auto">
            <h2 className="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900">
              {university?.name}
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
              <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                Akreditasi: {university?.accreditation.toUpperCase()}
              </h6>
              <div className="flex items-center space-x-3">
                <p className="text-xl">
                  {university?.category.charAt(0).toUpperCase() +
                    String(university?.category).slice(1)}
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-base font-normal mb-8 ">
              {university?.overview}
            </p>
            <div className="block w-full">
              <div className="text">
                <div className="grid grid-cols-2 gap-6">
                  <aside>
                    <p className="font-bold text-lg leading-8 text-gray-900 mb-4">
                      Jurusan
                    </p>
                    <div className="flex flex-col justify-start md:gap-3 relative mb-6 ">
                      {university?.degree_data.map((item, index) => {
                        return (
                          <div key={index}>
                            <Badge className="bg-green-500 hover:bg-green-400 text-lg cursor-default">
                              {item.degree_name.toUpperCase()}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </aside>
                  <aside>
                    <div className="block w-full mb-6">
                      <p className="font-bold text-lg leading-8 text-gray-900 mb-4">
                        Fakultas
                      </p>
                      <div className="flex flex-col justify-start md:gap-3 relative mb-6 ">
                        {university?.faculty_data.map((item, index) => {
                          return (
                            <div key={index}>
                              <Badge className="bg-yellow-500 hover:bg-yellow-400 text-lg cursor-default">
                                {item.faculty_name.toUpperCase()}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </aside>
                </div>

                <div className="flex items-center space-x-3">
                  {university && (
                    <>
                      {user ? (
                        <ApplyButton
                          isApplied={isApplied || false}
                          universityName={university.name}
                          id={university.id}
                          handler={applyUniversity}
                        />
                      ) : (
                        <Link href="/login">
                          <Button size={"lg"}>Masuk untuk daftar</Button>
                        </Link>
                      )}
                    </>
                  )}
                  <BackButton isLarge />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              // style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
              className="swiper product-prev mb-6"
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <Image
                    height={500}
                    width={500}
                    src="/uni-preview.png"
                    alt="Universitas"
                    className="h-[500px] w-[500px] mx-auto object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="m-12">
        <Card className="flex flex-col space-y-3 bg-gray-100 rounded-xl p-8">
          <h3 className="w-full text-gray-900 text-2xl font-bold font-manrope leading-normal">
            Informasi Lainnya
          </h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col">
              <h3 className="font-bold text-lg">Website</h3>
              <Link
                target="_blank"
                className="w-fit"
                href={`https://${university?.website}`}
              >
                {university?.website}
              </Link>
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-lg">Kontak Telepon</h3>
              <p>{university?.tel}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-lg">Email</h3>
              <Link className="w-fit" href={`mailto:${university?.email}`}>
                {university?.email}
              </Link>
            </div>
            <div className="flex col-span-3 flex-col">
              <h3 className="font-bold text-lg">Alamat Universitas</h3>
              <p>{university?.address}</p>
            </div>
            <div className="flex grid-cols-3 flex-col">
              <h3 className="font-bold text-lg">Informasi Pendaftaran</h3>
              <p>
                Biaya Pendaftaran: Rp
                {university?.cost.registration_cost.toLocaleString()}
              </p>
              <p>
                Waktu Pendaftaran:{" "}
                {university?.cost.time_minutes == 200
                  ? "200+"
                  : university?.cost.time_minutes}{" "}
                menit
              </p>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
