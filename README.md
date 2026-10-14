# Portfolio motherbloodss

Personal portfolio Habib Risky Kurniawan (motherbloodss), dibangun dengan React, Vite, Tailwind CSS, dan Framer Motion.

## Menjalankan

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

## Environment variables

Salin `.env.example` menjadi `.env` (file ini tidak masuk Git).

| Variabel | Fungsi |
| --- | --- |
| `VITE_SITE_URL` | Domain final tanpa slash akhir, contoh `https://domain-anda.com`. Dipakai untuk canonical, Open Graph, sitemap.xml, dan JSON-LD WebSite. Jika kosong, bagian tersebut dilewati dan build menampilkan peringatan. |
| `VITE_DATA_BASE_URL` | Alamat dasar repository data (about.json dan project.json) beserta gambar project. |
| `VITE_LINKEDIN_URL` | URL profil LinkedIn. Jika kosong, tombol LinkedIn tidak ditampilkan. |

## SEO

- Metadata per halaman ada di `src/seo/routes.js`. Ubah di sana, lalu build ulang.
- `scripts/seoPlugin.js` menulis title, description, canonical, Open Graph, dan Twitter Card ke HTML setiap route saat build, serta membuat `robots.txt` dan `sitemap.xml`.
- `src/components/common/SeoManager.jsx` memperbarui metadata saat navigasi di browser.
- Gambar pratinjau sosial: `public/og-image.png` (1200x630). Ganti dengan desain Anda sendiri bila perlu, dengan ukuran yang sama.

## Deployment

Hosting harus mengembalikan `index.html` untuk URL yang tidak cocok dengan file statis (SPA fallback), sambil tetap melayani `/about/index.html`, `/projects/index.html`, dan `/contact/index.html` hasil build.
