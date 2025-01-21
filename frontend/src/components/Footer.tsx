"use server";

import Link from "next/link";
import React from "react";
import ApplicationLogo from "./ApplicationLogo";

export default async function Footer() {
  return (
    <footer className="flex text-white bg-black py-8 px-16 space-x-20">
      <section className="flex flex-col space-y-4 w-[500px]">
        <ApplicationLogo />
        <p className="text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam,
          maiores iusto. Magnam cum consequatur ullam dicta corporis consectetur
          delectus placeat, ipsam harum magni adipisci assumenda qui aut ratione
          nemo natus?
        </p>
      </section>
      <section className="flex justify-between w-[500px]">
        <ul className="flex flex-col space-y-2">
          <Link
            className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
            href="https://github.com/aran8276/"
          >
            GitHub
          </Link>
          <Link
            className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
            href="https://youtube.com/@Aran8276/"
          >
            YouTube
          </Link>
          <Link
            className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
            href="https://www.instagram.com/aran8276/"
          >
            Instagram
          </Link>
        </ul>
        <nav className="flex flex-col space-y-2">
          <Link
            className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
            href="/"
          >
            Beranda
          </Link>
          <Link
            className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
            href="/universities"
          >
            Universitas
          </Link>
          <Link
            className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
            href="/about"
          >
            Tentang
          </Link>
        </nav>
        <nav className="flex flex-col space-y-2">
          <Link
            className="text-white opacity-70 hover:opacity-100 transition-all hover:no-underline"
            href="#"
          >
            (Link Lainnya)
          </Link>
        </nav>
      </section>
    </footer>
  );
}
