import Loader from "@/app/loading";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
      </Suspense>
      <main className="min-h-screen my-12">{children}</main>
      <Footer />
    </>
  );
}
