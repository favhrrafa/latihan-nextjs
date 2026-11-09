"use client";

import { useState } from "react";
import { rupiah, type Event } from "@/data/events";
import KartuEvent from "./KartuEvent";
import KontrolKatalog from "./KontrolKatalog";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [hanyaAdaTiket, setHanyaAdaTiket] = useState(false);
  const [hargaMaksimal, setHargaMaksimal] = useState("");

  // State baru untuk mengontrol apakah semua event ditampilkan
  const [tampilSemua, setTampilSemua] = useState(false);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  const hasil = events.filter((e) => {
    const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = kategori === "Semua" || e.kategori === kategori;
    const sisaTiket = e.kuota - e.terisi;
    const cocokTiket = !hanyaAdaTiket || sisaTiket > 0;
    const cocokHarga = hargaMaksimal === "" || e.harga <= Number(hargaMaksimal);

    return cocokCari && cocokKategori && cocokTiket && cocokHarga;
  });

  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  const totalHarga = hasil.reduce((acc, e) => acc + e.harga, 0);
  const totalSisaTiket = hasil.reduce(
    (acc, e) => acc + (e.kuota - e.terisi),
    0,
  );
  const rataRataHarga = hasil.length > 0 ? totalHarga / hasil.length : 0;

  const eventDitampilkan = tampilSemua ? tersusun : tersusun.slice(0, 4);

  const handleCari = (val: string) => {
    setCari(val);
    setTampilSemua(false);
  };
  const handleKategori = (val: string) => {
    setKategori(val);
    setTampilSemua(false);
  };
  const handleUrut = (val: string) => {
    setUrut(val);
    setTampilSemua(false);
  };
  const handleHanyaAdaTiket = (val: boolean) => {
    setHanyaAdaTiket(val);
    setTampilSemua(false);
  };
  const handleHargaMaksimal = (val: string) => {
    setHargaMaksimal(val);
    setTampilSemua(false);
  };

  return (
    <div>
      <KontrolKatalog
        cari={cari}
        setCari={handleCari}
        kategori={kategori}
        setKategori={handleKategori}
        urut={urut}
        setUrut={handleUrut}
        hanyaAdaTiket={hanyaAdaTiket}
        setHanyaAdaTiket={handleHanyaAdaTiket}
        hargaMaksimal={hargaMaksimal}
        setHargaMaksimal={handleHargaMaksimal}
        daftarKategori={daftarKategori}
      />

      <div className="mb-4 text-sm text-slate-600">
        <p>{hasil.length} event ditemukan</p>
        <p>
          Rata-rata harga {rupiah(rataRataHarga)} · Total sisa tiket{" "}
          {totalSisaTiket}
        </p>
      </div>

      {hasil.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventDitampilkan.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>

          {!tampilSemua && tersusun.length > 4 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setTampilSemua(true)}
                className="rounded-lg border  bg-blue-500 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-blue-700"
              >
                Tampilkan lagi
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
