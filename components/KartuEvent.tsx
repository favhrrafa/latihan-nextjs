import { rupiah, type Event } from "@/data/events";
import Link from "next/link";


export default function KartuEvent({event}: {event: Event}) {
    const sisa = event.kuota - event.terisi
    const laris = sisa >0 && event.terisi / event.kuota >=0.5
    return (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
            <span className="rounded bg-blue-100 px-2 py0.5 text-xs text-blue-700">{event.kategori}</span>
            {laris && (
                <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">Laris</span>
            )}
            <h3 className="mt-2 text-lg font-bold text-gray-500">{event.judul}</h3>
            <p className="text-sm text-slate-400">{event.tanggal} {event.lokasi}</p>
            <p className="mt-2 font-medium text-gray-450">{rupiah(event.harga)}</p>
            <p className = {sisa === 0 ? "text-sm text-red-600" : "text-sm text-green-700"}> {sisa === 0 ? "Tiket habis" : `Sisa ${sisa} tiket`}</p>
            <Link href={`/event/${event.id}`} className="mt-3 inline-block rounder bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">Lihat Detail</Link>
        </div>
    )
}