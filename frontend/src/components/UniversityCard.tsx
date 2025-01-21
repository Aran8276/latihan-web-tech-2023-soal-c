"use server";
import * as motion from "motion/react-client";
import { Universities } from "@/app/fetcher";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Card } from "./ui/card";

export default async function UniversityCard({ data }: { data: Universities }) {
  return (
    <Link
      className="text-black hover:no-underline"
      href={`/universities/${data.id}`}
    >
      <motion.div
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{ scale: 1 }}
      >
        <Card className="flex space-x-8 p-4 bg-gray-100 rounded-xl h-[170px]">
          <Image
            src="/uni-preview.png"
            className="object-cover w-[120px] h-[120px] rounded-xl"
            alt="preview"
            height={120}
            width={120}
          />
          <div className="flex flex-col">
            <h3 className="text-gray-900 text-xl font-semibold leading-8">
              {data.name}
            </h3>
            <p className="line-clamp-3 text-gray-400 text-sm">
              {data.overview}
            </p>
            <div className="pt-4">
              <span className="text-xl text-green-500">
                Akreditasi: {data.accreditation.toUpperCase()}
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
