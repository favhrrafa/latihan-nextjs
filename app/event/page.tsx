
import type { Metadata } from "next";
import KatalogInteraktif from "@/components/KatalogInteraktif";
import { ambilEvents } from "@/data/ambil";

export const metadata: Metadata = { title: "Katalog Event" };


export default async function Kataglog() {
  const events = await ambilEvents()
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Katalog Event</h1>
        <KatalogInteraktif events={events}></KatalogInteraktif>
    </div>
  );
}
