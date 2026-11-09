"use client";

import { useState, useActionState } from "react";
import { rupiah, type Event } from "@/data/events";
import { pesanTiket, type HasilPesan } from "@/app/action";

export default function FormPesan({ event, namaAwal }: { event: Event; namaAwal: string }) {
  const sisa = event.kuota - event.terisi;
  const awal: HasilPesan = {
    berhasil: false,
    pesan: "",
    galat: {},
    isian: { nama: namaAwal, email: "" },
  };

  const [jumlah, setJumlah] = useState(1);
  const [hasil, kirim, sedangKirim] = useActionState(pesanTiket, awal);

  if (sisa === 0) {
    return <p className="mt-6 font-medium text-red-600">Tiket sudah habis</p>;
  }

  return (
    <form action={kirim} className="mt-6 space-y-3 border-t pt-4">
      <h2 className="text-lg font-semibold text-gray-500">Pesan tiket</h2>

      <input type="hidden" name="eventId" value={event.id} />

      <div>
        <input
          name="nama"
          defaultValue={hasil.isian?.nama}
          placeholder="Nama pemesan"
          className="block w-full rounded border px-3 py-2"
        />
        {hasil.galat.nama && (
          <p className="mt-1 text-sm text-red-600">{hasil.galat.nama}</p>
        )}
      </div>

      <div>
        <input
          type="email"  
          name="email"
          defaultValue={hasil.isian?.email}
          placeholder="Email pemesan"
          className="block w-full rounded border px-3 py-2"
        />
        {hasil.galat.email && (
          <p className="mt-1 text-sm text-red-600">{hasil.galat.email}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="jumlah"
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          placeholder="Jumlah tiket"
          className="block w-32 rounded border px-3 py-2"
        />
        {hasil.galat.jumlah && (
          <p className="mt-1 text-sm text-red-600">{hasil.galat.jumlah}</p>
        )}
      </div>

      <p className="text-slate-700">
        Total: <b className="text-black">{rupiah(event.harga * jumlah)}</b>
      </p>

      {hasil.pesan && (
        <p
          className={`text-sm font-medium ${
            hasil.berhasil ? "text-green-700" : "text-red-600"
          }`}
        >
          {hasil.pesan}
        </p>
      )}

      <button
        type="submit"
        disabled={sedangKirim}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {sedangKirim ? "Mengirim..." : "Pesan"}
      </button>
    </form>
  );
}
