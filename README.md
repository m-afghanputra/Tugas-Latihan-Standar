# Tugas Latihan Standar — Catatan Buku

Project latihan frontend PKL PT. LSKK, mengikuti Frontend Web Development Standard Stack LSKK v1.0.

## Menjalankan

```bash
npm install
npm run dev
```

Backend belum tersedia. Data list, form, dan login memakai mock sementara di
`src/services/` (bentuk kembalian sudah `IResponseEntity`). Saat backend siap, ganti isinya
dengan pemanggilan `api` dari `src/lib/axios.ts`.

## Script

- `npm run lint` — ESLint (konfigurasi default Vite)
- `npm run format` / `npm run format:check` — Prettier
