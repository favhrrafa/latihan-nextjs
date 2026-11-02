export type Event = {
  id: number;
  judul: string;
  kategori: string; 
  tanggal: string;
  lokasi: string;
  harga: number;
  kuota: number;
  terisi: number;
};


export const events: Event[] = [
  {
    id: 1,
    judul: "Konser Musik Musikaria",
    kategori: "Musik",
    tanggal: "2026-12-15",
    lokasi: "Jakarta Convention Center",
    harga: 150000,
    kuota: 500,
    terisi: 350,
  },
  {
    id: 2,
    judul: "Workshop Web Development",
    kategori: "Edukasi",
    tanggal: "2026-11-20",
    lokasi: "Online (Zoom)",
    harga: 50000,
    kuota: 100,
    terisi: 85,
  },
  {
    id: 3,
    judul: "Pameran Seni Modern",
    kategori: "Seni & Budaya",
    tanggal: "2026-12-01",
    lokasi: "Galeri Nasional Indonesia",
    harga: 25000,
    kuota: 200,
    terisi: 120,
  },
  {
    id: 4,
    judul: "Turnamen Esport Championship",
    kategori: "Gaming",
    tanggal: "2026-11-28",
    lokasi: "Surabaya Expo Center",
    harga: 75000,
    kuota: 300,
    terisi: 300,
  },
  {
    id: 5,
    judul: "Seminar Tech Trends 2027",
    kategori: "Teknologi",
    tanggal: "2026-12-10",
    lokasi: "Bandung Tech Park",
    harga: 0,
    kuota: 150,
    terisi: 90,
  },
];