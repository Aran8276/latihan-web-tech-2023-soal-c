"use server";

import { getUniversityById } from "@/app/fetcher";
import EditForm from "./EditForm";

export default async function CreateForm({
  params,
}: {
  params: { id: string };
}) {
  const formFields = await getUniversityById(params.id);
  return (
    <section className="flex flex-col w-[400px] space-y-6 m-12">
      <h3 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
        Update Fakultas
      </h3>
      {formFields && <EditForm data={formFields.data} />}
    </section>
  );
}
