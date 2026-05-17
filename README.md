<div align="center">

# Invoice Generator

**Buat invoice profesional dengan mudah dan cepat — langsung download sebagai PDF.**

[![React](https://img.shields.io/badge/React-17.0.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.1.0-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![jsPDF](https://img.shields.io/badge/jsPDF-2.3.1-red?style=for-the-badge)](https://github.com/parallax/jsPDF)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen?style=for-the-badge&logo=github)](https://hanjarraes.github.io/generator-invoice)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[Live Demo](https://invoice.raess.fun/) · [GitHub Pages](https://hanjarraes.github.io/generator-invoice) · [Laporkan Bug](https://github.com/hanjarraes/generator-invoice/issues)

</div>

---

## Screenshots

> Tambahkan screenshot aplikasi kamu di bawah ini. Ganti path gambar dengan path foto yang kamu miliki.

<!-- Contoh cara menambahkan foto:
![Nama Screenshot](./screenshots/nama-file.png)
Atau gunakan link Imgur:
![Nama Screenshot](https://i.imgur.com/xxxxx.png)
-->

### Form Invoice
![Form Invoice](https://i.imgur.com/rWiRj47.png)

### Preview Invoice
![Preview Invoice](https://i.imgur.com/OCIdDpZ.jpg)

### Hasil PDF
![Hasil PDF](https://i.imgur.com/1EouOOn.png)

---

## Fitur

- **Buat Invoice Dinamis** — Tambah, edit, dan hapus item invoice secara real-time
- **Kalkulasi Otomatis** — Subtotal, pajak, diskon, dan total dihitung secara otomatis
- **9 Pilihan Mata Uang** — Rp, USD, GBP, JPY, CAD, AUD, SGD, CNY, BTC
- **Upload Logo** — Tambahkan logo perusahaan ke invoice
- **Info Bank** — Sertakan informasi transfer bank
- **Catatan Kustom** — Tambahkan catatan di bagian bawah invoice
- **Preview Modal** — Lihat tampilan invoice sebelum diunduh
- **Download PDF** — Ekspor invoice langsung ke file PDF
- **Responsive Design** — Tampil baik di desktop, tablet, dan mobile

---

## Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| [React](https://reactjs.org/) | 17.0.2 | UI Framework |
| [React Bootstrap](https://react-bootstrap.github.io/) | 2.0.0 | Komponen UI |
| [Bootstrap](https://getbootstrap.com/) | 5.1.0 | CSS Framework |
| [html2canvas](https://html2canvas.hertzen.com/) | 1.3.2 | Konversi HTML ke Canvas |
| [jsPDF](https://github.com/parallax/jsPDF) | 2.3.1 | Generate file PDF |
| [React Icons](https://react-icons.github.io/react-icons/) | 4.2.0 | Icon library |
| [file-saver](https://github.com/eligrey/FileSaver.js/) | 2.0.5 | Unduh file ke device |

---

## Instalasi & Menjalankan Lokal

### Prasyarat

Pastikan sudah terinstal:
- [Node.js](https://nodejs.org/) versi 14 atau lebih baru
- npm (sudah termasuk dalam Node.js)

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/hanjarraes/generator-invoice.git
   cd generator-invoice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm start
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

4. **Build untuk production**
   ```bash
   npm run build
   ```
   Hasil build akan ada di folder `/build`.

---

## Cara Penggunaan

1. **Isi informasi invoice** — Masukkan nomor invoice, tanggal, dan info penagihan
2. **Upload logo** *(opsional)* — Klik area logo untuk mengunggah logo perusahaan
3. **Tambah item** — Klik tombol **Add Item** untuk menambahkan item baru
4. **Edit item** — Klik langsung pada nama, deskripsi, harga, atau jumlah item untuk mengeditnya
5. **Atur pajak & diskon** — Masukkan persentase pajak dan/atau diskon
6. **Pilih mata uang** — Pilih mata uang yang sesuai dari dropdown
7. **Preview** — Klik **Review Invoice** untuk melihat tampilan invoice
8. **Download** — Klik **Download Invoice** di modal untuk mengunduh sebagai PDF

---

## Struktur Project

```
invoice-generator/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions untuk deploy ke GitHub Pages
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── InvoiceForm.js      # Form utama pembuatan invoice
│   │   ├── InvoiceItem.js      # Tabel item invoice (add/remove/edit)
│   │   ├── InvoiceModal.js     # Modal preview & generate PDF
│   │   └── EditableField.js    # Komponen input yang bisa diedit
│   ├── App.js                  # Root component + header & footer
│   ├── App.css                 # Styling App
│   ├── index.js                # Entry point React
│   └── index.css               # Global styles
├── package.json
└── README.md
```

---

## Deployment

Project ini di-deploy otomatis ke **GitHub Pages** menggunakan GitHub Actions.

Setiap kali ada push ke branch `main`, workflow akan:
1. Install dependencies
2. Build project
3. Deploy ke branch `gh-pages`

**Live:** [https://hanjarraes.github.io/generator-invoice](https://hanjarraes.github.io/generator-invoice)

---

## To-Do

- [x] Parsing data ke Preview Modal
- [x] Currency Picker
- [x] Kalkulasi pajak dan diskon
- [x] Deploy ke GitHub Pages
- [ ] Simpan invoice ke Firebase DB
- [ ] Riwayat invoice tersimpan
- [ ] Template invoice yang bisa dipilih

---

## Kontribusi

Kontribusi sangat diterima! Berikut caranya:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/NamaFitur`)
3. Commit perubahan (`git commit -m 'feat: tambah fitur X'`)
4. Push ke branch (`git push origin feature/NamaFitur`)
5. Buka Pull Request

---

## Penulis

**Muhammad Hanjarraes**

[![Portfolio](https://img.shields.io/badge/Portfolio-raess.fun-blue?style=flat-square&logo=google-chrome)](https://raess.fun/)
[![GitHub](https://img.shields.io/badge/GitHub-hanjarraes-181717?style=flat-square&logo=github)](https://github.com/hanjarraes)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-hanjarraes-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/hanjarraes)

---

## Lisensi

Didistribusikan di bawah lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://raess.fun">Muhammad Hanjarraes</a></sub>
</div>
