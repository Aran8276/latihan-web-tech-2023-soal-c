"use server";

import UniversityGrid from "@/components/UniversityGrid";
import { getUniversities, searchUniversities } from "@/app/fetcher";
import Searchbar from "@/components/Searchbar";

export default async function Universities({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const query = (await searchParams)?.query;
  if (query) {
    const universities = await searchUniversities(query);
    return (
      <>
        <section className="flex flex-col space-y-12 m-12">
          <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
            Universitas
          </h3>
          <div className="w-full">
            <Searchbar label="universitas" action="/universities" />
          </div>
          {universities?.data && (
            <UniversityGrid gridcols="grid-cols-1" data={universities?.data} />
          )}
        </section>
      </>
    );
  }

  const universities = await getUniversities();
  return (
    <>
      <section className="flex flex-col space-y-12 m-12">
        <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
          Universitas
        </h3>
        <div className="w-full">
          <Searchbar label="universitas" action="/universities" />
        </div>
        {universities?.data && (
          <UniversityGrid gridcols="grid-cols-1" data={universities?.data} />
        )}
      </section>
    </>
  );
}
