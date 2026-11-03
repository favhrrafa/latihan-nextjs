"use client";
import { useState } from "react";
import type { Event } from "@/data/events";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [hanyaAdaTiket, setHanyaAdaTiket] = useState(false);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === "Semua" || e.kategori === kategori) &&
      (!hanyaAdaTiket || e.kuota - e.terisi > 0)
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari Event"
          className="rounded border bg-white px-3 py-2 text-gray-500"
        />

        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="rounded border bg-white px-3 py-2 text-gray-500"
        >
          {daftarKategori.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={hanyaAdaTiket}
            onChange={(e) => setHanyaAdaTiket(e.target.checked)}
            className="rounded"
          />
          Hanya yang masih ada tiket
        </label>
      </div>

      {hasil.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((e) => (
            <KartuEvent key={e.id} event={e}></KartuEvent>
          ))}
        </div>
      )}
    </div>
  );
}