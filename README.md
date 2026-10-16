# Tugas Latihan Standar — Catatan Buku

Project latihan frontend PKL PT. LSKK, mengikuti Frontend Web Development Standard Stack LSKK v1.0.

## Menjalankan

```bash
npm install
cp .env.example .env
npm run dev
```

Di Windows Powershell, ganti baris cp dengan Copy-Item .env.example .env

## Konfigurasi (.env)

Variabel = `VITE_API_URL`
Fungsi = Alamat API backend

Variabel = `VITE_USE_MOCK`
Fungsi = true memakai server palsu di src/mocks/setupMock.ts Selain itu memanggil `VITE_API_URL`

Backend belum tersedia. Biarkan `VITE_USE_MOCK=true`. Service di `src/services/` sudah
memanggil api (src/lib/axios.ts). Kalau backend sudah ada, ubah `VITE_USE_MOCK=false` dan
ganti isi `VITE_API_URL`.

## Script

- `npm run lint` — ESLint (konfigurasi default Vite)
- `npm run format` / `npm run format:check` — Prettier
