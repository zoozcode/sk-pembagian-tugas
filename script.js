(function () {
  "use strict";
  const MON = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const DAY = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const $ = (s) => document.querySelector(s);
  const esc = (s) =>
    String(s == null ? "" : s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const pad = (n) => String(n).padStart(2, "0");
  const ymd = (d) =>
    d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  const parse = (s) => {
    const a = s.split("-").map(Number);
    return new Date(a[0], a[1] - 1, a[2]);
  };
  const longDate = (s) => {
    const d = parse(s);
    return (
      DAY[d.getDay()] +
      ", " +
      d.getDate() +
      " " +
      MON[d.getMonth()] +
      " " +
      d.getFullYear()
    );
  };
  const midDate = (s) => {
    const d = parse(s);
    return d.getDate() + " " + MON[d.getMonth()] + " " + d.getFullYear();
  };
  const fmtTs = (ms) => {
    if (!ms) return "";
    const d = new Date(ms);
    return (
      d.getDate() +
      " " +
      MON[d.getMonth()].slice(0, 3) +
      " " +
      d.getFullYear() +
      " " +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds())
    );
  };
  const monLabel = (m) => {
    const a = m.split("-");
    return MON[+a[1] - 1] + " " + a[0];
  };
  const jabP = (s) => s.jab + (s.pos ? " · Penempatan: " + s.pos : "");
  const fmtNip = (n) =>
    n ? n.replace(/^(\d{8})(\d{6})(\d)(\d{3})$/, "$1 $2 $3 $4") : "-";
  const ST = {
    draft: "Draf",
    menunggu: "Menunggu verifikasi",
    disetujui: "Disetujui",
    ditolak: "Perlu perbaikan",
  };

  /* Data pegawai dari lampiran SK 800/050/2026 (rev 01) */
  const STAFF = [
    {
      id: "s01",
      nama: "Agus Pramono, S.TP",
      nip: "197208252007011015",
      jab: "Pengadministrasi Perkantoran",
      jobs: [
        "Koordinator dan Administrasi Kepegawaian",
        "Admin Presensi",
        "Pengelolaan E-Kinerja",
        "Penanggung Jawab Kendaraan Dinas",
      ],
    },
    {
      id: "s02",
      nama: "Sri Handayani",
      nip: "198004092009012003",
      jab: "Pengadministrasi Perkantoran",
      jobs: [
        "Bendahara BOP dan Gaji",
        "Administrasi Kesiswaan",
        "Kebersihan Lingkungan",
      ],
    },
    {
      id: "s03",
      nama: "Mochamad Sodik",
      nip: "198402052008011005",
      jab: "Pengadministrasi Perkantoran",
      jobs: [
        "Administrasi Takola, Arkas dan SiPerkasa",
        "Membantu Bendahara BOS dan BOP",
        "Kebersihan Lingkungan",
      ],
    },
    {
      id: "s04",
      nama: "Ulfah Misnawati, SM",
      nip: "198011272009012005",
      jab: "Pengadministrasi Perkantoran",
      jobs: [
        "Administrasi Perkantoran Bidang Perpustakaan",
        "Kebersihan Ruang Perpustakaan",
        "Kebersihan Lingkungan",
      ],
    },
    {
      id: "s05",
      nama: "Nur Rohman",
      nip: "197412012009011002",
      pos: "ADM",
      jab: "Operator Layanan Operasional",
      jobs: [
        "Kebersihan R. Kepala Sekolah, Kantor dan R. Quase",
        "Penanggung Jawab Aula 1 dan Aula 2",
        "Kebersihan Masjid dan Taman sekitar Kantor",
      ],
    },
    {
      id: "s06",
      nama: "Didik Santoso",
      nip: "198312272014061001",
      jab: "Pengadministrasi Perkantoran",
      jobs: [
        "Administrasi Perkantoran Bidang Sarana Prasarana dan Takola",
        "Pengurus Barang dan Inventaris",
        "Kebersihan Lingkungan",
      ],
    },
    {
      id: "s07",
      nama: "Ayu Setyaningrum, S.Pd.",
      nip: "199503272022212017",
      jab: "Guru Ahli Pertama",
      jobs: [
        "Bendahara BOS",
        "Membuat SPJ BOS dan buku kas umum tiap bulan (diketahui Ka. Subag TU)",
      ],
    },
    {
      id: "s08",
      nama: "Eko Suprihatin, S.Pi",
      nip: "198510012025211057",
      pos: "APPL",
      jab: "Penata Layanan Operasional",
      jobs: [
        "Toolman APPL",
        "Mempersiapkan alat bahan praktik Kons. Keahlian APPL",
        "Inventarisasi dan pemeliharaan barang Kons. Keahlian APPL",
        "Kebersihan dan keamanan Lingkungan APPL",
      ],
    },
    {
      id: "s09",
      nama: "Khafit Irawan",
      nip: "198605312025211053",
      jab: "Operator Layanan Operasional",
      jobs: [
        "Toolman APAT",
        "Mempersiapkan alat bahan praktik Kons. Keahlian APAT",
        "Inventarisasi dan pemeliharaan barang Kons. Keahlian APAT",
        "Kebersihan dan keamanan Lingkungan APAT",
      ],
    },
    {
      id: "s10",
      nama: "Tri Novi Sugiyati, SM",
      nip: "198611152025212062",
      jab: "Penata Layanan Operasional",
      jobs: [
        "Toolman APHP",
        "Menyiapkan alat bahan praktik Kons. Keahlian APHP",
        "Inventarisasi dan pemeliharaan barang Kons. Keahlian APHP",
        "Kebersihan Lingkungan APHP",
      ],
    },
    {
      id: "s11",
      nama: "Eko Sulistiyono",
      nip: "198705162025211069",
      pos: "NKPI",
      jab: "Operator Layanan Operasional",
      jobs: [
        "Toolman NKPI",
        "Mempersiapkan alat bahan praktik Kons. Keahlian NKPI",
        "Inventarisasi dan pemeliharaan barang Kons. Keahlian NKPI",
        "Kebersihan Lingkungan NKPI",
        "Kebersihan Mangrove TKP",
      ],
    },
    {
      id: "s12",
      nama: "Sukoco",
      nip: "198602092025211048",
      pos: "Aset",
      jab: "Operator Layanan Operasional",
      jobs: [
        "Administrasi Perkantoran Bidang Sarana Prasarana dan Takola",
        "Pengurus Barang dan Inventaris",
        "Membantu Kebersihan Masjid",
        "Kebersihan Lingkungan",
        "Kebersihan Mangrove",
      ],
    },
    {
      id: "s13",
      nama: "Muhlisin",
      nip: "198402172025211044",
      pos: "TKP",
      jab: "Operator Layanan Operasional",
      jobs: [
        "Toolman TKP",
        "Mempersiapkan alat bahan praktik Kons. Keahlian TKP",
        "Inventarisasi dan pemeliharaan barang Kons. Keahlian TKP",
        "Kebersihan Lingkungan dan R. TKP",
        "Kebersihan Mangrove",
      ],
    },
    {
      id: "s14",
      nama: "M. Khoirur Roziqin, S.Pd.",
      nip: "199601262025211051",
      jab: "Penata Layanan Operasional",
      jobs: [
        "Toolman TKR",
        "Mempersiapkan alat bahan praktik Kons. Keahlian TKR",
        "Inventarisasi dan pemeliharaan barang Kons. Keahlian TKR",
        "Kebersihan Lingkungan dan Ruang TKR",
      ],
    },
    {
      id: "s29",
      nama: "Alfan Cahya Sanjaya",
      nip: "199305112025211062",
      pos: "APHP",
      jab: "Operator Layanan Operasional",
      jobs: [
        "Pengelola UP Air Minum Quase",
        "Pemasaran dan Pendistribusian Air Minum Quase",
        "Kebersihan Ruang Quase dan Lingkungan APHP",
      ],
    },
    {
      id: "s15",
      nama: "Cholisatus Salamah, S.P",
      nip: "199504102025212083",
      jab: "Penata Layanan Operasional",
      jobs: [
        "Toolman APHPi",
        "Menyiapkan alat bahan praktik Kons. Keahlian APHPi",
        "Membantu Tim Publikasi Sekolah",
        "Kebersihan Lingkungan APHPi",
      ],
    },
    {
      id: "s16",
      nama: "Erfina, S.Kom",
      nip: "199804222025212039",
      jab: "Penata Layanan Operasional",
      jobs: [
        "Administrasi Persuratan",
        "Administrasi Bidang Pendidikan (Kurikulum)",
        "Melayani pengambilan ijazah dan legalisir siswa",
        "Kebersihan Lingkungan",
      ],
    },
    {
      id: "s30",
      nama: "Ria Liani Dewi, S.Kom",
      nip: "199708312025212079",
      pos: "TKJ",
      jab: "Penata Layanan Operasional",
      jobs: [
        "Toolman TKJ",
        "Menyiapkan alat bahan praktik Kons. Keahlian TKJ",
        "Inventarisasi dan pemeliharaan barang Kons. Keahlian TKJ",
        "Kebersihan Lingkungan",
      ],
    },
    {
      id: "s17",
      nama: "Achmad Daroini M, S.Pd",
      nip: "199409262025211039",
      jab: "Penata Layanan Operasional",
      jobs: [
        "Administrasi Perkantoran Bidang Operator Sekolah",
        "Membantu Administrasi Kepegawaian (Presensi)",
        "Kebersihan Lingkungan",
      ],
    },
    {
      id: "s18",
      nama: "Davit",
      nip: "",
      out: true,
      grp: "Outsourcing - Keamanan",
      jab: "Tenaga Outsourcing (Keamanan)",
      jobs: ["Keamanan dan Penjagaan Sekolah", "Patroli Lingkungan Sekolah"],
    },
    {
      id: "s19",
      nama: "Rainov",
      nip: "",
      out: true,
      grp: "Outsourcing - Keamanan",
      jab: "Tenaga Outsourcing (Keamanan)",
      jobs: ["Keamanan dan Penjagaan Sekolah", "Patroli Lingkungan Sekolah"],
    },
    {
      id: "s20",
      nama: "Eko",
      nip: "",
      out: true,
      grp: "Outsourcing - Keamanan",
      jab: "Tenaga Outsourcing (Keamanan)",
      jobs: ["Keamanan dan Penjagaan Sekolah", "Patroli Lingkungan Sekolah"],
    },
    {
      id: "s21",
      nama: "Amin",
      nip: "",
      out: true,
      grp: "Outsourcing - Keamanan",
      jab: "Tenaga Outsourcing (Keamanan)",
      jobs: ["Keamanan dan Penjagaan Sekolah", "Patroli Lingkungan Sekolah"],
    },
    {
      id: "s22",
      nama: "Lukman",
      nip: "",
      out: true,
      grp: "Outsourcing - Keamanan",
      jab: "Tenaga Outsourcing (Keamanan)",
      jobs: ["Keamanan dan Penjagaan Sekolah", "Patroli Lingkungan Sekolah"],
    },
    {
      id: "s23",
      nama: "Juned",
      nip: "",
      out: true,
      grp: "Outsourcing - Kebersihan",
      jab: "Tenaga Outsourcing (Kebersihan)",
      jobs: ["Kebersihan Lingkungan", "Kebersihan Ruang dan Fasilitas"],
    },
    {
      id: "s24",
      nama: "Jadug",
      nip: "",
      out: true,
      grp: "Outsourcing - Kebersihan",
      jab: "Tenaga Outsourcing (Kebersihan)",
      jobs: ["Kebersihan Lingkungan", "Kebersihan Ruang dan Fasilitas"],
    },
    {
      id: "s25",
      nama: "Afif",
      nip: "",
      out: true,
      grp: "Outsourcing - Kebersihan",
      jab: "Tenaga Outsourcing (Kebersihan)",
      jobs: ["Kebersihan Lingkungan", "Kebersihan Ruang dan Fasilitas"],
    },
    {
      id: "s26",
      nama: "Rangga",
      nip: "",
      out: true,
      grp: "Outsourcing - Kebersihan",
      jab: "Tenaga Outsourcing (Kebersihan)",
      jobs: ["Kebersihan Lingkungan", "Kebersihan Ruang dan Fasilitas"],
    },
    {
      id: "s27",
      nama: "Suladi",
      nip: "",
      out: true,
      grp: "Outsourcing - Kebersihan",
      pos: "Area Mas Afif",
      jab: "Tenaga Outsourcing (Kebersihan)",
      jobs: ["Kebersihan Lingkungan", "Kebersihan Ruang dan Fasilitas"],
    },
    {
      id: "s28",
      nama: "Warsono",
      nip: "",
      out: true,
      grp: "Outsourcing - Kebersihan",
      jab: "Tenaga Outsourcing (Kebersihan)",
      jobs: ["Kebersihan Lingkungan", "Kebersihan Ruang dan Fasilitas"],
    },
  ];
  const BY = {};
  STAFF.forEach((s, i) => {
    BY[s.id] = s;
    s.ord = i;
  });

  /* Daftar kegiatan bawaan per job */
  const RULES = [
    [
      /masjid/i,
      [
        "Menyapu dan mengepel masjid",
        "Merapikan perlengkapan ibadah",
        "Mengumpulkan dan membuang sampah",
      ],
    ],
    [
      /^keamanan dan penjagaan/i,
      [
        "Menjaga gerbang dan mencatat tamu",
        "Memeriksa keamanan gedung, pintu dan jendela",
        "Mengatur lalu lintas kendaraan dan parkir",
      ],
    ],
    [
      /patroli/i,
      [
        "Patroli lingkungan sekolah",
        "Memeriksa kondisi lampu, listrik dan air",
        "Membuat catatan serah terima jaga",
      ],
    ],
    [
      /^kebersihan.*perpustakaan/i,
      [
        "Menyapu dan mengepel ruang perpustakaan",
        "Merapikan meja, kursi dan rak buku",
      ],
    ],
    [
      /^kebersihan.*mangrove/i,
      [
        "Membersihkan area mangrove",
        "Mengumpulkan dan membuang sampah",
        "Merapikan area dan jalur",
      ],
    ],
    [
      /^kebersihan.*keamanan/i,
      [
        "Menyapu dan membersihkan lingkungan",
        "Mengumpulkan dan membuang sampah",
        "Memeriksa keamanan area (pintu, jendela, listrik)",
      ],
    ],
    [
      /^kebersihan.*kantor/i,
      [
        "Menjaga kerapian ruang kerja administrasi",
        "Menyapu dan mengepel ruang kepala sekolah dan kantor",
        "Merapikan area kantor",
        "Mengumpulkan dan membuang sampah",
      ],
    ],
    [
      /^kebersihan/i,
      [
        "Menyapu dan membersihkan lingkungan",
        "Mengumpulkan dan membuang sampah",
        "Merapikan area tugas",
      ],
    ],
    [
      /koordinator/i,
      [
        "Mengkoordinasikan kegiatan administrasi sekolah",
        "Membagi tugas dan mengawasi pelaksanaan pekerjaan staf TU",
        "Memeriksa kelengkapan dan ketertiban dokumen administrasi",
        "Mengelola data guru dan tenaga kependidikan",
        "Mengarsipkan dokumen identitas dan SK pengangkatan atau penugasan pegawai",
        "Memperbarui data pegawai yang mengalami perubahan",
        "Menyiapkan surat tugas dan surat perjalanan dinas",
        "Mengadministrasikan permohonan cuti",
        "Mengelola dokumen kenaikan pangkat, kenaikan gaji berkala, dan pensiun",
        "Membantu menyiapkan dokumen sertifikasi dan tunjangan guru",
        "Menyusun laporan administrasi kepegawaian",
        "Melaporkan pelaksanaan tugas kepada kepala sekolah",
      ],
    ],
    [
      /e-kinerja/i,
      [
        "Memeriksa laporan e-Kinerja pegawai",
        "Merekap capaian kinerja",
        "Menindaklanjuti laporan yang perlu revisi",
        "Memperbarui data kepegawaian pada sistem yang digunakan",
        "Menyusun laporan administrasi kepegawaian",
      ],
    ],
    [
      /membantu administrasi kepegawaian/i,
      [
        "Membantu merekapitulasi kehadiran pegawai",
        "Membantu mengadministrasikan permohonan cuti",
        "Membantu memperbarui data pegawai",
        "Mengarsipkan dokumen kepegawaian",
        "Menjaga kerahasiaan dokumen pegawai",
      ],
    ],
    [
      /presensi/i,
      [
        "Mengadministrasikan daftar hadir guru dan tenaga kependidikan",
        "Merekapitulasi kehadiran pegawai sesuai prosedur",
        "Memeriksa keterlambatan, izin dan sakit",
        "Memperbarui data presensi pada sistem yang digunakan",
        "Menyiapkan rekapitulasi kehadiran bulanan",
      ],
    ],
    [
      /aula/i,
      [
        "Menyiapkan ruang dan perlengkapan rapat atau kegiatan",
        "Memeriksa kondisi dan kebersihan aula",
        "Mengatur jadwal penggunaan aula",
        "Mengadministrasikan peminjaman aula",
        "Merapikan aula setelah kegiatan",
      ],
    ],
    [
      /kendaraan/i,
      [
        "Memeriksa kendaraan dinas (BBM, kebersihan, kondisi)",
        "Mencatat penggunaan kendaraan dinas",
        "Mengatur jadwal pemakaian kendaraan dinas",
        "Mengelola dokumen pemeliharaan kendaraan dinas",
      ],
    ],
    [
      /membantu bendahara/i,
      [
        "Membantu mencatat transaksi keuangan",
        "Membantu memeriksa kelengkapan dokumen pengeluaran",
        "Membantu menyiapkan kuitansi dan dokumen transaksi",
        "Mengarsipkan faktur, nota, dan bukti pembayaran",
        "Membantu pencatatan penggunaan dana operasional sekolah",
        "Membantu menyiapkan laporan realisasi anggaran",
      ],
    ],
    [
      /spj/i,
      [
        "Mengelola dokumen pertanggungjawaban penggunaan dana BOS",
        "Menyusun buku kas umum bulanan",
        "Membantu menyiapkan laporan realisasi anggaran",
        "Menyiapkan dokumen untuk pemeriksaan keuangan",
        "Menyerahkan berkas kepada Ka. Subag TU untuk diketahui",
      ],
    ],
    [
      /bendahara bos/i,
      [
        "Mengadministrasikan dokumen anggaran pendapatan dan belanja sekolah",
        "Mencatat transaksi keuangan BOS",
        "Mengelola bukti penerimaan dan pengeluaran",
        "Menyiapkan kuitansi dan dokumen transaksi",
        "Mengarsipkan faktur, nota, dan bukti pembayaran",
        "Memeriksa kelengkapan dokumen pengeluaran",
        "Mencatat penggunaan dana operasional sekolah",
        "Mengarsipkan dokumen perpajakan yang terkait transaksi sekolah",
        "Menyiapkan laporan realisasi anggaran",
        "Menjaga keamanan dokumen keuangan",
        "Melaporkan administrasi keuangan kepada pejabat yang berwenang",
      ],
    ],
    [
      /bendahara bop/i,
      [
        "Mengadministrasikan dokumen anggaran pendapatan dan belanja sekolah",
        "Mencatat transaksi keuangan BOP",
        "Memproses dan memeriksa data gaji",
        "Mengelola bukti penerimaan dan pengeluaran",
        "Menyiapkan kuitansi dan dokumen transaksi",
        "Mengarsipkan faktur, nota, dan bukti pembayaran",
        "Memeriksa kelengkapan dokumen pengeluaran",
        "Mengelola dokumen pertanggungjawaban penggunaan dana",
        "Mengarsipkan dokumen perpajakan yang terkait transaksi sekolah",
        "Menyiapkan laporan realisasi anggaran",
        "Menjaga keamanan dokumen keuangan",
        "Melaporkan administrasi keuangan kepada pejabat yang berwenang",
      ],
    ],
    [
      /kesiswaan/i,
      [
        "Mengelola data identitas siswa",
        "Memperbarui data siswa aktif",
        "Menginput data siswa baru ke dalam sistem",
        "Memeriksa kelengkapan berkas pendaftaran siswa",
        "Mengelola dokumen perpindahan siswa masuk dan keluar",
        "Menyiapkan surat keterangan aktif sekolah",
        "Menyiapkan surat keterangan pindah",
        "Mengadministrasikan kenaikan kelas",
        "Mengadministrasikan data siswa penerima bantuan pendidikan",
        "Membantu pengelolaan data kehadiran siswa",
        "Menyiapkan daftar siswa untuk keperluan kegiatan sekolah",
        "Menjaga kerahasiaan data pribadi siswa",
      ],
    ],
    [
      /sarana prasarana/i,
      [
        "Mendata barang inventaris sekolah",
        "Mencatat barang yang diterima sekolah",
        "Mencatat barang yang dipindahkan atau dikeluarkan",
        "Memperbarui daftar inventaris",
        "Mengarsipkan dokumen pengadaan barang",
        "Membantu administrasi pengadaan peralatan sekolah",
        "Mencatat kondisi barang dan peralatan",
        "Mengelola dokumen pemeliharaan fasilitas sekolah",
        "Membantu pendataan kebutuhan peralatan kelas dan kantor",
        "Menyusun dokumen dan laporan Takola",
        "Menyiapkan laporan inventaris secara berkala",
        "Membantu pelaporan kondisi sarana dan prasarana",
      ],
    ],
    [
      /takola|arkas|siperkasa/i,
      [
        "Input data di aplikasi Takola",
        "Input atau pembaruan di Arkas",
        "Input atau pembaruan di SiPerkasa",
        "Memeriksa kesesuaian data pada dokumen sumber",
        "Menyimpan bukti pembaruan dan dokumen pendukung",
        "Membantu menyiapkan data untuk pelaporan sekolah",
      ],
    ],
    [
      /perpustakaan/i,
      [
        "Membantu administrasi peminjaman dan pengembalian buku",
        "Mengarsipkan daftar inventaris buku",
        "Mendata koleksi perpustakaan",
        "Mengadministrasikan pengadaan buku",
        "Menyiapkan laporan administrasi perpustakaan",
      ],
    ],
    [
      /toolman/i,
      [
        "Melayani peminjaman alat praktik",
        "Mencatat penggunaan dan peminjaman peralatan",
        "Mencatat keluar masuk alat dan bahan",
        "Memeriksa kondisi alat setelah praktik",
        "Menyiapkan dokumen serah terima alat dan bahan",
        "Mengadministrasikan dokumen praktik di bengkel atau laboratorium",
      ],
    ],
    [
      /menyiapkan alat|mempersiapkan alat/i,
      [
        "Menyiapkan alat dan bahan praktik",
        "Membantu pendataan kebutuhan bahan praktik",
        "Memeriksa ketersediaan bahan habis pakai",
        "Menyiapkan dokumen serah terima alat dan bahan",
        "Merapikan kembali alat dan bahan setelah praktik",
      ],
    ],
    [
      /inventarisasi/i,
      [
        "Membantu mendata peralatan laboratorium",
        "Mencatat inventaris barang",
        "Mengarsipkan dokumen pemeliharaan peralatan",
        "Memelihara barang dan alat",
        "Melaporkan barang rusak atau hilang",
      ],
    ],
    [
      /pengurus barang/i,
      [
        "Memberikan kode atau nomor inventaris barang",
        "Mencatat barang masuk dan keluar",
        "Memperbarui kartu dan daftar inventaris",
        "Mencatat kondisi barang dan peralatan",
        "Mengadministrasikan peminjaman dan pengembalian barang",
        "Mendokumentasikan penghapusan barang sesuai prosedur",
        "Mengarsipkan berita acara serah terima barang",
        "Menyiapkan laporan inventaris secara berkala",
      ],
    ],
    [
      /persuratan/i,
      [
        "Menerima dan memeriksa kelengkapan surat masuk",
        "Mencatat surat masuk dalam buku agenda atau sistem elektronik",
        "Memberikan lembar disposisi dan mendistribusikan surat",
        "Menyiapkan konsep dan memformat surat keluar",
        "Memberikan nomor dan tanggal surat sesuai prosedur",
        "Memproses surat untuk ditandatangani pejabat berwenang",
        "Mengirim dan mencatat surat keluar dalam buku agenda",
        "Mengelola surat undangan, surat tugas, surat edaran, dan surat pemberitahuan",
        "Mengelola surat keputusan (SK) dan surat keterangan",
        "Menyimpan dokumen berdasarkan klasifikasi arsip",
        "Memindai dokumen untuk arsip digital",
        "Menjaga keamanan dan kerahasiaan arsip",
      ],
    ],
    [
      /kurikulum/i,
      [
        "Mengerjakan administrasi kurikulum",
        "Menyiapkan dokumen administrasi pembelajaran",
        "Membantu menyiapkan administrasi ujian sekolah",
        "Mengelola daftar peserta ujian",
        "Menyiapkan dokumen administrasi pengawas ujian",
        "Menyiapkan berita acara pelaksanaan ujian",
        "Mengadministrasikan dokumen hasil ujian",
        "Mengarsipkan berkas kurikulum",
      ],
    ],
    [
      /ijazah|legalisir/i,
      [
        "Melayani pengambilan ijazah",
        "Memproses legalisasi dokumen sesuai kewenangan",
        "Mengelola arsip ijazah dan dokumen kelulusan",
        "Menyiapkan surat keterangan lulus (SKL) sesuai kewenangan",
        "Melayani orang tua atau wali siswa yang membutuhkan dokumen",
        "Mencatat dokumen yang diserahkan atau diterima",
      ],
    ],
    [
      /operator sekolah/i,
      [
        "Memperbarui data peserta didik",
        "Memperbarui data guru dan tenaga kependidikan",
        "Memperbarui data rombongan belajar sesuai kewenangan",
        "Memeriksa kesesuaian data pada dokumen sumber",
        "Membantu pengelolaan Dapodik sesuai hak akses",
        "Memeriksa kelengkapan data sebelum dikirimkan",
        "Menindaklanjuti data yang tidak sesuai atau belum lengkap",
        "Menyimpan bukti pembaruan dan dokumen pendukung",
        "Melakukan pencadangan data sesuai kebijakan sekolah",
        "Membantu menyiapkan data untuk pelaporan sekolah",
      ],
    ],
    [
      /pengelola up air/i,
      [
        "Mengelola produksi air minum Quase",
        "Mencatat stok dan penjualan",
        "Merawat peralatan produksi",
      ],
    ],
    [
      /pemasaran/i,
      [
        "Memasarkan air minum Quase",
        "Mengantar pesanan",
        "Mencatat penjualan dan pembayaran",
      ],
    ],
    [
      /publikasi/i,
      [
        "Mendokumentasikan kegiatan sekolah",
        "Membantu menyiapkan konten publikasi",
        "Mengunggah konten ke media sekolah",
        "Menyiapkan dokumen kegiatan peringatan hari besar dan kegiatan sekolah lainnya",
      ],
    ],
  ];
  const tmpl = (j) => {
    for (const r of RULES) {
      if (r[0].test(j)) return r[1];
    }
    return [
      "Mengerjakan tugas harian sesuai job",
      "Mengarsipkan hasil pekerjaan",
    ];
  };

  const S = {
    db: null,
    user: null,
    dl: null,
    canEdit: false,
    canWrite: true,
    uid: null,
    role: null,
    lap: {},
    tokL: {},
    delId: null,
    mustChange: false,
    lrole: "member",
    tab: "isi",
    sid: null,
    tgl: ymd(new Date()),
    sel: {},
    fotos: [],
    removed: [],
    cur: null,
    curV: null,
    locked: false,
    month: ymd(new Date()).slice(0, 7),
    entries: [],
    verifs: {},
    unsub: [],
    busy: false,
    tok: 0,
    confirmAll: false,
  };
  const TODAY = ymd(new Date());
  const fotoCache = new Map();
  const lsGet = (k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  };
  const lsSet = (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  };

  let tt;
  function toast(m) {
    const t = $("#toast");
    t.textContent = m;
    t.hidden = false;
    clearTimeout(tt);
    tt = setTimeout(() => {
      t.hidden = true;
    }, 3800);
  }
  const jid = (tgl, sid) => tgl + "_" + sid;
  const statusOf = (j, v) => {
    if (!j || j.status !== "terkirim") return "draft";
    if (v && v.rev === j.ts) return v.status;
    return "menunggu";
  };

  /* ---------- bulan ---------- */
  function monthOptions() {
    const out = [];
    let y = 2026,
      m = 7;
    for (let i = 0; i < 12; i++) {
      out.push(y + "-" + pad(m));
      m++;
      if (m > 12) {
        m = 1;
        y++;
      }
    }
    if (out.indexOf(S.month) < 0) out.push(S.month);
    out.sort();
    return out;
  }
  function fillMonthSelect(el, val) {
    el.innerHTML = monthOptions()
      .map((m) => `<option value="${m}">${monLabel(m)}</option>`)
      .join("");
    el.value = val;
  }
  function staffOpts() {
    const g = {},
      order = [];
    STAFF.forEach((s) => {
      const k = s.grp || "Tenaga Kependidikan";
      if (!g[k]) {
        g[k] = [];
        order.push(k);
      }
      g[k].push(`<option value="${s.id}">${esc(s.nama)}</option>`);
    });
    return order
      .map((k) => `<optgroup label="${k}">${g[k].join("")}</optgroup>`)
      .join("");
  }
  function fillSidSelect(el, val, allLabel) {
    el.innerHTML = `<option value="all">${allLabel}</option>` + staffOpts();
    el.value = val;
  }

  /* ---------- langganan data bulan berjalan ---------- */
  function subRange() {
    return S.role === "admin" && S.rng
      ? [S.rng.a, S.rng.b]
      : [S.month + "-01", S.month + "-31"];
  }
  function resub() {
    S.unsub.forEach((u) => {
      try {
        u();
      } catch (e) {}
    });
    S.unsub = [];
    if (!S.db) return;
    const rg = subRange(),
      a = rg[0],
      b = rg[1];
    try {
      S.unsub.push(
        S.db
          .collection("jurnal")
          .where("tgl", ">=", a)
          .where("tgl", "<=", b)
          .onSnapshot(
            (s) => {
              S.entries = s.docs.map((d) =>
                Object.assign({ id: d.id }, d.data()),
              );
              renderLive();
            },
            (e) => {
              setConn("bad", "gagal memuat");
            },
          ),
      );
      S.unsub.push(
        S.db
          .collection("verifikasi")
          .where("tgl", ">=", a)
          .where("tgl", "<=", b)
          .onSnapshot(
            (s) => {
              const o = {};
              s.docs.forEach((d) => {
                o[d.id] = d.data();
              });
              S.verifs = o;
              renderLive();
            },
            (e) => {},
          ),
      );
    } catch (e) {
      setConn("bad", "gagal memuat");
    }
  }
  function setMonth(m) {
    if (m === S.month) return;
    S.month = m;
    S.entries = [];
    S.verifs = {};

    resub();
    renderLive();
  }
  function setConn(k, t) {
    const c = $("#conn");
    c.className = "conn " + (k || "");
    c.textContent = t;
  }

  /* ---------- render formulir ---------- */
  function renderNames() {
    $("#names").innerHTML = STAFF.filter(
      (s) => S.role === "member" && s.id === S.sid,
    )
      .map(
        (s) =>
          `<button type="button" class="nm" data-a="pick" data-id="${s.id}" aria-pressed="${S.sid === s.id}"><b>${esc(s.nama)}</b><span>${esc(s.jab)}</span>${s.nip ? `<span class="nip">NIP ${fmtNip(s.nip)}</span>` : ""}${s.pos ? `<span class="nip">Penempatan: ${esc(s.pos)}</span>` : ""}</button>`,
      )
      .join("");
  }
  function renderJobs() {
    const p = BY[S.sid];
    if (!p) {
      $("#jobs").innerHTML =
        '<div class="empty" style="width:100%">Pilih nama di langkah 1 untuk menampilkan job Anda.</div>';
      return;
    }
    $("#jobs").innerHTML = p.jobs
      .map(
        (j, i) =>
          `<button type="button" class="chip" data-a="job" data-j="${i}" aria-pressed="${S.sel[i] ? "true" : "false"}">${esc(j)}</button>`,
      )
      .join("");
  }
  function renderTasks() {
    const p = BY[S.sid];
    const box = $("#tasks");
    if (!p) {
      box.innerHTML = '<div class="empty">Belum ada nama yang dipilih.</div>';
      return;
    }
    const idx = Object.keys(S.sel)
      .map(Number)
      .sort((a, b) => a - b);
    if (!idx.length) {
      box.innerHTML =
        '<div class="empty">Pilih satu atau lebih job di langkah 2, lalu daftar kegiatannya muncul di sini.</div>';
      return;
    }
    box.innerHTML = idx
      .map((i) => {
        const o = S.sel[i];
        const done = o.items.filter((x) => x.d).length;
        return `<div class="jobcard" data-jc="${i}"><div class="jh"><h4>${esc(p.jobs[i])}</h4><span class="cnt">${done}/${o.items.length}</span></div>
    <div>${o.items.map((it, k) => `<div class="itrow"><label class="it ${it.d ? "on" : ""}"><input type="checkbox" data-a="tk" data-j="${i}" data-i="${k}" ${it.d ? "checked" : ""}><span>${esc(it.t)}</span></label>${it.c ? `<button type="button" class="x" data-a="delc" data-j="${i}" data-i="${k}">Hapus</button>` : ""}</div>`).join("")}</div>
    <div class="addrow"><input type="text" id="add-${i}" maxlength="160" placeholder="Tambah kegiatan lain…"><button type="button" class="btn alt sm" data-a="addc" data-j="${i}">Tambah</button></div>
    <textarea id="nt-${i}" data-a="note" data-j="${i}" rows="2" maxlength="400" placeholder="Keterangan untuk job ini (opsional)">${esc(o.note)}</textarea></div>`;
      })
      .join("");
  }
  function renderFotos() {
    const pg = $("#pg");
    $("#fhint").textContent = S.fotos.length + " dari 1 foto";
    if (!S.fotos.length) {
      pg.innerHTML =
        '<div class="empty" style="grid-column:1/-1">Belum ada foto. Pilih satu foto kegiatan.</div>';
      return;
    }
    pg.innerHTML = S.fotos
      .map(
        (f, i) =>
          `<div class="ph"><img alt="Foto ${i + 1}" data-a="lb" data-i="${i}" ${f.d ? `src="${f.d}"` : `data-fid="${f.id}"`}><button type="button" class="rm" data-a="rmf" data-i="${i}">Hapus</button>${f.at ? `<span class="tm">${fmtTs(f.at)}</span>` : ""}</div>`,
      )
      .join("");
    pg.querySelectorAll("img[data-fid]").forEach(async (im) => {
      const d = await getFoto(im.dataset.fid);
      if (d) {
        const f = S.fotos.find((x) => x.id === im.dataset.fid);
        if (f) f.d = d;
        im.src = d;
      }
    });
  }
  function renderBanner() {
    const b = $("#banner");
    const p = BY[S.sid];
    if (!p || !S.cur) {
      b.hidden = true;
      return;
    }
    const st = statusOf(S.cur, S.curV);
    let t = `<span class="pill st-${st}">${ST[st]}</span><span style="font-family:var(--f-mono);font-size:12px;color:var(--muted)">${S.cur.status === "terkirim" ? "Dikirim" : "Disimpan"} ${fmtTs(S.cur.ts)}</span>`;
    if (st === "menunggu")
      t +=
        "<span>Jurnal sudah dikirim. Anda masih bisa mengubah dan mengirim ulang sampai atasan memverifikasi.</span>";
    if (st === "disetujui")
      t += `<span>Disetujui oleh ${esc(S.curV.oleh)}. Jurnal ini terkunci.</span>`;
    if (st === "ditolak")
      t += `<span>Atasan meminta perbaikan${S.curV.catatan ? ": " + esc(S.curV.catatan) : "."} Ubah lalu kirim ulang.</span>`;
    if (st === "draft")
      t += "<span>Draf tersimpan, belum dikirim ke atasan.</span>";
    b.innerHTML = t;
    b.hidden = false;
  }
  function applyLock() {
    const st = S.cur ? statusOf(S.cur, S.curV) : "new";
    S.locked = st === "disetujui";
    const off = S.locked || !S.canWrite || !S.db;
    $("#fs").disabled = off;
    $("#b-draft").disabled = off || S.busy;
    $("#b-send").disabled = off || S.busy;
    $("#b-send").textContent =
      st === "menunggu" || st === "ditolak"
        ? "Kirim ulang ke atasan"
        : "Kirim ke atasan";
    if (!S.canWrite && S.db) {
      setConn("bad", "mode baca");
    }
  }
  function renderKal() {
    const p = BY[S.sid];
    const [y, m] = S.month.split("-").map(Number);
    const n = new Date(y, m, 0).getDate();
    $("#kal-t").textContent =
      "Isian " + monLabel(S.month) + (p ? " · " + p.nama : "");
    if (!p) {
      $("#kal").innerHTML = "";
      $("#kal-p").textContent = "";
      return;
    }
    const mine = {};
    S.entries.forEach((j) => {
      if (j.sid === S.sid) mine[j.tgl] = statusOf(j, S.verifs[j.id]);
    });
    let cnt = 0,
      h = "";
    for (let d = 1; d <= n; d++) {
      const k = y + "-" + pad(m) + "-" + pad(d);
      const dow = new Date(y, m - 1, d).getDay();
      const st = mine[k];
      if (st) cnt++;
      const fut = S.role === "member" && k !== ymd(new Date());
      h += `<button type="button" ${fut ? "disabled" : ""} class="dy ${dow === 0 || dow === 6 ? "we" : ""} ${st ? "st-" + st : ""} ${k === S.tgl ? "sel" : ""}" data-a="kal" data-d="${k}" title="${longDate(k)}${st ? " · " + ST[st] : ""}">${d}</button>`;
    }
    $("#kal").innerHTML = h;
    $("#kal-p").textContent = cnt + " hari terisi";
  }
  function fullRender() {
    renderNames();
    renderJobs();
    renderTasks();
    renderFotos();
    renderKal();
    renderBanner();
    applyLock();
    $("#cat").value = S.catatan || "";
  }

  /* ---------- muat isian tanggal+nama ---------- */
  async function loadEntry() {
    const my = ++S.tok;
    S.sel = {};
    S.fotos = [];
    S.removed = [];
    S.cur = null;
    S.curV = null;
    S.catatan = "";
    const p = BY[S.sid];
    if (p && S.db) {
      try {
        const id = jid(S.tgl, S.sid);
        const [a, v] = await Promise.all([
          S.db.doc("jurnal/" + id).get(),
          S.db.doc("verifikasi/" + id).get(),
        ]);
        if (my !== S.tok) return;
        if (a.exists) {
          const d = a.data();
          S.cur = Object.assign({ id: id }, d);
          S.curV = v.exists ? v.data() : null;
          (d.jobs || []).forEach((o) => {
            const i = p.jobs.indexOf(o.job);
            if (i >= 0)
              S.sel[i] = {
                items: (o.items || []).map((x) => ({
                  t: x.t,
                  d: !!x.d,
                  c: !!x.c,
                })),
                note: o.note || "",
              };
          });
          S.fotos = (d.fotos || []).map((id) => ({
            id: id,
            d: fotoCache.get(id) || null,
            at: (d.fat || {})[id] || d.ts,
          }));
          S.catatan = d.catatan || "";
        }
      } catch (e) {
        toast("Gagal memuat data tersimpan.");
      }
    }
    if (my !== S.tok) return;
    fullRender();
  }

  /* ---------- foto ---------- */
  const readFile = (f) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(f);
    });
  const loadImg = (src) =>
    new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = src;
    });
  async function compress(file) {
    const img = await loadImg(await readFile(file));
    let max = 800,
      q = 0.62,
      out = "";
    for (let k = 0; k < 9; k++) {
      const sc = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(img.width * sc));
      c.height = Math.max(1, Math.round(img.height * sc));
      const x = c.getContext("2d");
      x.fillStyle = "#fff";
      x.fillRect(0, 0, c.width, c.height);
      x.drawImage(img, 0, 0, c.width, c.height);
      out = c.toDataURL("image/jpeg", q);
      if (out.length < 60000) break;
      max *= 0.85;
      q = Math.max(0.4, q - 0.05);
    }
    return out;
  }
  async function getFoto(id) {
    if (fotoCache.has(id)) return fotoCache.get(id);
    if (!S.db) return null;
    try {
      const d = await S.db.doc("foto/" + id).get();
      const v = d.exists ? d.data().d : null;
      if (v) fotoCache.set(id, v);
      return v;
    } catch (e) {
      return null;
    }
  }
  async function addFiles(files) {
    const list = Array.from(files);
    let added = 0;
    for (const f of list) {
      if (S.fotos.length >= 1) {
        toast("Maksimal 1 foto. Hapus foto yang ada untuk menggantinya.");
        break;
      }
      try {
        const d = await compress(f);
        const id =
          "f" +
          Date.now().toString(36) +
          Math.random().toString(36).slice(2, 7);
        S.fotos.push({ id: id, d: d, isNew: true, at: Date.now() });
        fotoCache.set(id, d);
        added++;
      } catch (e) {
        toast('Foto "' + f.name + '" tidak bisa dibaca.');
      }
    }
    if (added) renderFotos();
  }

  /* ---------- simpan ---------- */
  function collectJobs() {
    const p = BY[S.sid];
    return Object.keys(S.sel)
      .map(Number)
      .sort((a, b) => a - b)
      .map((i) => ({
        job: p.jobs[i],
        items: S.sel[i].items.map((x) => ({
          t: x.t,
          d: x.d ? 1 : 0,
          c: x.c ? 1 : 0,
        })),
        note: S.sel[i].note || "",
      }));
  }
  async function save(send) {
    if (S.busy) return;
    const p = BY[S.sid];
    if (!S.db) {
      toast("Penyimpanan belum aktif di tampilan ini.");
      return;
    }
    if (!p) {
      toast("Pilih nama dahulu.");
      return;
    }
    if (S.role === "member" && S.tgl !== ymd(new Date())) {
      toast(
        "Jurnal hanya bisa diisi untuk hari ini. Muat ulang halaman jika tanggal sudah berganti.",
      );
      return;
    }
    const jobs = collectJobs();
    if (!jobs.length) {
      toast("Pilih minimal satu job.");
      return;
    }
    if (send && !jobs.some((o) => o.items.some((x) => x.d))) {
      toast("Centang minimal satu kegiatan yang sudah dikerjakan.");
      return;
    }
    S.busy = true;
    applyLock();
    const id = jid(S.tgl, S.sid);
    try {
      for (const f of S.fotos) {
        if (f.isNew) {
          await S.db.doc("foto/" + f.id).set({ j: id, tgl: S.tgl, d: f.d });
          f.isNew = false;
        }
      }
      for (const rid of S.removed) {
        await S.db.doc("foto/" + rid).delete();
      }
      S.removed = [];
      const ts = Date.now();
      S.fotos.forEach((f) => {
        if (!f.at) f.at = ts;
      });
      const doc = {
        tgl: S.tgl,
        sid: S.sid,
        nama: p.nama,
        jobs: jobs,
        catatan: $("#cat").value.trim(),
        fotos: S.fotos.map((f) => f.id),
        fat: Object.fromEntries(S.fotos.map((f) => [f.id, f.at])),
        status: send ? "terkirim" : "draft",
        ts: ts,
        by: S.uid || "",
      };
      await S.db.doc("jurnal/" + id).set(doc);
      S.cur = Object.assign({ id: id }, doc);
      toast(
        send
          ? "Jurnal terkirim. Menunggu verifikasi atasan."
          : "Draf tersimpan.",
      );
    } catch (e) {
      toast(
        e && e.code === "quota_exceeded"
          ? "Penyimpanan penuh. Hubungi admin."
          : "Gagal menyimpan. Coba lagi.",
      );
    }
    S.busy = false;
    renderBanner();
    applyLock();
    renderKal();
  }

  /* ---------- kartu entri ---------- */
  function entryHtml(j, mode) {
    const v = S.verifs[j.id];
    const st = statusOf(j, v);
    const jobs = (j.jobs || [])
      .map((o) => {
        const dn = o.items.filter((x) => x.d);
        return `<li><b>${esc(o.job)}</b> <span class="sub">${dn.length}/${o.items.length}</span><small>${dn.length ? dn.map((x) => esc(x.t)).join("; ") : "Belum ada kegiatan dicentang"}</small>${o.note ? `<small>Ket: ${esc(o.note)}</small>` : ""}</li>`;
      })
      .join("");
    const nf = (j.fotos || []).length;
    let h = `<article class="ent" data-e="${esc(j.id)}"><header><div><div class="who">${esc(j.nama)}</div><div class="sub">${longDate(j.tgl)}</div><div class="sub">${j.status === "terkirim" ? "Dikirim" : "Disimpan"} ${fmtTs(j.ts)}</div></div><span class="pill st-${st}">${ST[st]}</span></header><ul>${jobs}</ul>`;
    if (j.catatan) h += `<div class="note">${esc(j.catatan)}</div>`;
    if (v && v.rev === j.ts)
      h += `<div class="note vn">${v.status === "disetujui" ? "Disetujui" : "Perlu perbaikan"} oleh ${esc(v.oleh)} · ${fmtTs(v.waktu)}${v.catatan ? ": " + esc(v.catatan) : ""}</div>`;
    h += `<div class="eact">`;
    if (nf)
      h += `<button class="btn alt sm" data-a="showf" data-id="${esc(j.id)}">Lihat ${nf} foto</button>`;
    if (mode === "riwayat" && j.sid === S.sid && st !== "disetujui")
      h += `<button class="btn alt sm" data-a="open" data-id="${esc(j.id)}">Buka di formulir</button>`;
    if (mode === "riwayat" && S.role === "admin") {
      if (S.delId === j.id)
        h += `<span style="color:var(--bad);font-size:14px;margin-left:auto">Hapus jurnal ini beserta fotonya?</span><button class="btn no sm" data-a="delyes" data-id="${esc(j.id)}">Ya, hapus</button><button class="btn alt sm" data-a="delno">Batal</button>`;
      else
        h += `<button class="btn no sm" style="margin-left:auto" data-a="del" data-id="${esc(j.id)}">Hapus</button>`;
    }
    if (mode === "verif" && st !== "draft") {
      h += `<input type="text" id="vn-${esc(j.id)}" maxlength="200" placeholder="Catatan atasan (wajib jika minta perbaikan)">`;
      if (st !== "disetujui")
        h += `<button class="btn ok sm" data-a="appr" data-id="${esc(j.id)}">Setujui</button>`;
      if (st !== "ditolak")
        h += `<button class="btn no sm" data-a="rej" data-id="${esc(j.id)}">Minta perbaikan</button>`;
    }
    h += `</div><div class="pg ft" style="margin-top:10px" hidden></div></article>`;
    return h;
  }
  function renderRiwayat() {
    const fs = $("#xSid").value || "all",
      ft = $("#fSt").value || "all";
    let all =
      S.role === "member"
        ? S.entries.filter((j) => j.sid === S.sid)
        : S.entries.filter((j) => j.status === "terkirim");
    const c = { draft: 0, menunggu: 0, disetujui: 0, ditolak: 0 };
    all.forEach((j) => {
      if (fs === "all" || j.sid === fs) c[statusOf(j, S.verifs[j.id])]++;
    });
    $("#sum").innerHTML =
      `<span><b>${c.menunggu}</b> menunggu</span><span><b>${c.disetujui}</b> disetujui</span><span><b>${c.ditolak}</b> perlu perbaikan</span><span><b>${c.draft}</b> draf saya</span>`;
    let rows = all.filter(
      (j) =>
        (fs === "all" || j.sid === fs) &&
        (ft === "all" || statusOf(j, S.verifs[j.id]) === ft),
    );
    rows.sort(
      (a, b) => b.tgl.localeCompare(a.tgl) || BY[a.sid].ord - BY[b.sid].ord,
    );
    const key = [fs, ft, $("#xFrom").value, $("#xTo").value].join("|");
    if (key !== S.pgKey) {
      S.pgKey = key;
      S.pgR = 1;
    }
    const pages = Math.max(1, Math.ceil(rows.length / PER));
    S.pgR = Math.min(Math.max(1, S.pgR || 1), pages);
    if (!rows.length) {
      $("#list").innerHTML =
        '<div class="empty">Belum ada jurnal untuk filter ini. Isian yang sudah dikirim akan tampil di sini.</div>';
      renderPager(0, 1, 1);
      return;
    }
    const start = (S.pgR - 1) * PER,
      part = rows.slice(start, start + PER);
    let last = "",
      h = "";
    part.forEach((j) => {
      if (j.tgl !== last) {
        h += `<div class="dgroup">${longDate(j.tgl)}</div>`;
        last = j.tgl;
      }
      h += entryHtml(j, "riwayat");
    });
    keepOpen("#list", h);
    renderPager(rows.length, S.pgR, pages);
  }
  const PER = 10;
  function renderPager(total, cur, pages, kind) {
    kind = kind || "r";
    const el = $(kind === "v" ? "#vpager" : "#pager");
    if (total <= PER) {
      el.hidden = true;
      el.innerHTML = "";
      return;
    }
    const nums = [];
    for (let p = 1; p <= pages; p++) {
      if (p === 1 || p === pages || Math.abs(p - cur) <= 1) nums.push(p);
      else if (nums[nums.length - 1] !== "…") nums.push("…");
    }
    const from = (cur - 1) * PER + 1,
      to = Math.min(total, cur * PER);
    el.innerHTML =
      `<div class="info">Menampilkan ${from}-${to} dari ${total} jurnal</div>` +
      `<button type="button" class="btn alt sm" data-a="pg" data-k="${kind}" data-p="${cur - 1}" ${cur <= 1 ? "disabled" : ""}>Sebelumnya</button>` +
      nums
        .map((p) =>
          p === "…"
            ? '<span class="dots">…</span>'
            : `<button type="button" class="btn alt sm" data-a="pg" data-k="${kind}" data-p="${p}" ${p === cur ? 'aria-current="page"' : ""}>${p}</button>`,
        )
        .join("") +
      `<button type="button" class="btn alt sm" data-a="pg" data-k="${kind}" data-p="${cur + 1}" ${cur >= pages ? "disabled" : ""}>Berikutnya</button>`;
    el.hidden = false;
  }
  function renderVerif() {
    if (S.role !== "admin") return;
    const ft = $("#vSt").value || "menunggu";
    let rows = S.entries.filter(
      (j) =>
        j.status === "terkirim" &&
        (ft === "all" || statusOf(j, S.verifs[j.id]) === ft),
    );
    rows.sort(
      (a, b) => b.tgl.localeCompare(a.tgl) || BY[a.sid].ord - BY[b.sid].ord,
    );
    const waiting = S.entries.filter(
      (j) => statusOf(j, S.verifs[j.id]) === "menunggu",
    ).length;
    $("#vinfo").textContent =
      waiting +
      " jurnal menunggu pada " +
      (S.rng
        ? S.rng.a === S.rng.b
          ? midDate(S.rng.a)
          : midDate(S.rng.a) + " s.d. " + midDate(S.rng.b)
        : monLabel(S.month));
    $("#b-all").disabled = !waiting || S.busy;
    $("#b-all").textContent = S.confirmAll
      ? "Ya, setujui " + waiting + " jurnal"
      : "Setujui semua yang menunggu";
    const key = [ft, $("#vFrom").value, $("#vTo").value].join("|");
    if (key !== S.pgVKey) {
      S.pgVKey = key;
      S.pgV = 1;
    }
    const pages = Math.max(1, Math.ceil(rows.length / PER));
    S.pgV = Math.min(Math.max(1, S.pgV || 1), pages);
    if (!rows.length) {
      $("#vlist").innerHTML =
        '<div class="empty">Tidak ada jurnal pada daftar ini.</div>';
      renderPager(0, 1, 1, "v");
      return;
    }
    const start = (S.pgV - 1) * PER,
      part = rows.slice(start, start + PER);
    let last = "",
      h = "";
    part.forEach((j) => {
      if (j.tgl !== last) {
        h += `<div class="dgroup">${longDate(j.tgl)}</div>`;
        last = j.tgl;
      }
      h += entryHtml(j, "verif");
    });
    keepOpen("#vlist", h);
    renderPager(rows.length, S.pgV, pages, "v");
  }
  /* ganti isi daftar tanpa menghapus teks catatan yang sedang diketik */
  function keepOpen(sel, html) {
    const box = $(sel);
    const keep = {};
    box.querySelectorAll('input[id^="vn-"]').forEach((i) => {
      if (i.value) keep[i.id] = i.value;
    });
    box.innerHTML = html;
    Object.keys(keep).forEach((k) => {
      const el = document.getElementById(k);
      if (el) el.value = keep[k];
    });
  }
  function renderLive() {
    renderKal();
    renderRiwayat();
    renderVerif();
    renderLap();
  }

  /* ---------- verifikasi ---------- */
  async function setVerif(id, status, cat) {
    const j = S.entries.find((x) => x.id === id);
    if (!j) return false;
    await S.db
      .doc("verifikasi/" + id)
      .set({
        tgl: j.tgl,
        sid: j.sid,
        status: status,
        catatan: cat || "",
        rev: j.ts,
        oleh: $("#vWho").value,
        waktu: Date.now(),
        uid: S.uid || "",
      });
    return true;
  }
  async function verifOne(id, status) {
    if (S.busy) return;
    const cat = (
      document.getElementById("vn-" + id) || { value: "" }
    ).value.trim();
    if (status === "ditolak" && !cat) {
      toast("Tulis catatan perbaikan untuk pegawai.");
      return;
    }
    S.busy = true;
    try {
      await setVerif(id, status, cat);
      toast(
        status === "disetujui"
          ? "Jurnal disetujui."
          : "Permintaan perbaikan dikirim.",
      );
    } catch (e) {
      toast("Gagal menyimpan verifikasi.");
    }
    S.busy = false;
    renderVerif();
  }
  async function verifAll() {
    if (S.busy) return;
    if (!S.confirmAll) {
      S.confirmAll = true;
      renderVerif();
      setTimeout(() => {
        S.confirmAll = false;
        renderVerif();
      }, 5000);
      return;
    }
    S.confirmAll = false;
    S.busy = true;
    const w = S.entries.filter(
      (j) => statusOf(j, S.verifs[j.id]) === "menunggu",
    );
    let n = 0;
    try {
      for (const j of w) {
        await setVerif(j.id, "disetujui", "");
        n++;
      }
      toast(n + " jurnal disetujui.");
    } catch (e) {
      toast("Berhenti setelah " + n + " jurnal. Coba lagi.");
    }
    S.busy = false;
    renderVerif();
  }

  /* ---------- Excel ---------- */
  async function pool(items, n, fn) {
    const out = new Array(items.length);
    let i = 0;
    await Promise.all(
      Array.from({ length: Math.min(n, items.length) }, async () => {
        while (i < items.length) {
          const k = i++;
          out[k] = await fn(items[k]);
        }
      }),
    );
    return out;
  }
  function kegText(j) {
    return (j.jobs || [])
      .map((o) => {
        const dn = o.items.filter((x) => x.d).map((x) => "✔ " + x.t);
        const nd = o.items
          .filter((x) => !x.d)
          .map((x) => "○ " + x.t + " (belum)");
        return (
          o.job +
          "\n" +
          dn.concat(nd).join("\n") +
          (o.note ? "\nKet: " + o.note : "")
        );
      })
      .join("\n\n");
  }
  const lineCount = (t) =>
    t
      .split("\n")
      .reduce((a, l) => a + Math.max(1, Math.ceil(l.length / 58)), 0);
  async function exportXlsx() {
    if (S.role !== "admin") {
      toast("Unduh Excel hanya untuk admin.");
      return;
    }
    if (!S.db) {
      toast("Penyimpanan belum aktif.");
      return;
    }
    if (!S.dl) {
      toast("Unduhan tidak tersedia di tampilan ini.");
      return;
    }
    if (typeof ExcelJS === "undefined") {
      toast("Pustaka Excel belum termuat. Muat ulang halaman.");
      return;
    }
    const sid = $("#xSid").value,
      withFoto = $("#xFoto").checked;
    const a = $("#xFrom").value,
      b = $("#xTo").value;
    if (!a || !b) {
      toast("Pilih tanggal dahulu.");
      return;
    }
    if (a > b) {
      toast("Tanggal awal harus sebelum tanggal akhir.");
      return;
    }
    if (daysBetween(a, b).length > 366) {
      toast("Rentang maksimal 1 tahun.");
      return;
    }
    const mode = a === b ? "hari" : "bulan",
      key = a;
    const btn = $("#b-exp");
    btn.disabled = true;
    btn.textContent = "Menyiapkan…";
    try {
      const [js, vs] = await Promise.all([
        S.db
          .collection("jurnal")
          .where("tgl", ">=", a)
          .where("tgl", "<=", b)
          .get(),
        S.db
          .collection("verifikasi")
          .where("tgl", ">=", a)
          .where("tgl", "<=", b)
          .get(),
      ]);
      const V = {};
      vs.docs.forEach((d) => {
        V[d.id] = d.data();
      });
      const rows = js.docs
        .map((d) => Object.assign({ id: d.id }, d.data()))
        .filter(
          (j) => j.status === "terkirim" && (sid === "all" || j.sid === sid),
        );
      rows.sort(
        (x, y) => x.tgl.localeCompare(y.tgl) || BY[x.sid].ord - BY[y.sid].ord,
      );
      if (!rows.length) {
        toast("Belum ada jurnal terkirim pada periode ini.");
        btn.disabled = false;
        btn.textContent = "Unduh Excel";
        return;
      }
      const NF = 1;
      const photos = {};
      if (withFoto) {
        const jobsF = rows.filter((j) => (j.fotos || []).length);
        let done = 0;
        await pool(jobsF, 4, async (j) => {
          const ids = j.fotos.slice(0, NF);
          photos[j.id] = (await pool(ids, 2, getFoto)).filter(Boolean);
          done++;
          btn.textContent = "Memuat foto " + done + "/" + jobsF.length;
        });
      }
      btn.textContent = "Menyusun Excel…";
      const wb = new ExcelJS.Workbook();
      wb.creator = "SMK Negeri 1 Jepara";
      wb.created = new Date();
      const ws = wb.addWorksheet("Jurnal", {
        pageSetup: {
          orientation: "landscape",
          paperSize: 9,
          fitToPage: true,
          fitToWidth: 1,
          fitToHeight: 0,
        },
        views: [{ state: "frozen", ySplit: 6 }],
      });
      const widths = [5, 14, 26, 22, 22, 30, 56, 30, 22, 22, 28];
      widths.forEach((w, i) => {
        ws.getColumn(i + 1).width = w;
      });
      const LAST = "K";
      const title = (r, t, sz, bold) => {
        ws.mergeCells("A" + r + ":" + LAST + r);
        const c = ws.getCell("A" + r);
        c.value = t;
        c.font = { bold: !!bold, size: sz, name: "Calibri" };
        c.alignment = { horizontal: "center", vertical: "middle" };
      };
      title(1, "JURNAL KEGIATAN TENAGA KEPENDIDIKAN", 15, true);
      title(2, "SMK NEGERI 1 JEPARA", 13, true);
      title(
        3,
        mode === "hari"
          ? "Hari/Tanggal: " + longDate(a)
          : "Periode: " + midDate(a) + " s.d. " + midDate(b),
        11,
        false,
      );
      title(
        4,
        "Pegawai: " +
          (sid === "all" ? "Seluruh staf tata usaha" : BY[sid].nama),
        11,
        false,
      );
      const head = [
        "No",
        "Tanggal",
        "Nama",
        "NIP",
        "Jabatan",
        "Job",
        "Kegiatan yang dikerjakan",
        "Catatan",
        "Waktu kirim",
        "Verifikasi",
        "Foto",
      ];
      const hr = ws.getRow(6);
      head.forEach((h, i) => {
        hr.getCell(i + 1).value = h;
      });
      hr.height = 26;
      hr.eachCell((c) => {
        c.font = { bold: true, color: { argb: "FFFFFFFF" }, name: "Calibri" };
        c.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF0E5A6B" },
        };
        c.alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
        c.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      let r = 7;
      const stat = {};
      for (let n = 0; n < rows.length; n++) {
        const j = rows[n],
          p = BY[j.sid],
          v = V[j.id];
        const st = statusOf(j, v);
        stat[j.sid] = stat[j.sid] || {
          h: 0,
          disetujui: 0,
          menunggu: 0,
          ditolak: 0,
        };
        stat[j.sid].h++;
        stat[j.sid][st]++;
        const keg = kegText(j);
        const vt =
          ST[st] +
          (st === "disetujui" || st === "ditolak"
            ? "\n" + (v.oleh || "").replace(/\s*\(.*\)/, "")
            : "") +
          (v &&
          v.rev === j.ts &&
          v.waktu &&
          (st === "disetujui" || st === "ditolak")
            ? "\n" + fmtTs(v.waktu)
            : "") +
          (v && v.rev === j.ts && v.catatan ? "\n" + v.catatan : "");
        const ft0 = (j.fotos || [])[0] && j.fat ? j.fat[j.fotos[0]] : 0;
        const wk = fmtTs(j.ts) + (ft0 ? "\nFoto diunggah:\n" + fmtTs(ft0) : "");
        const row = ws.getRow(r);
        const vals = [
          n + 1,
          midDate(j.tgl),
          p.nama,
          fmtNip(p.nip),
          jabP(p),
          (j.jobs || []).map((o) => o.job).join("\n"),
          keg,
          j.catatan || "",
          wk,
          vt,
        ];
        vals.forEach((x, i) => {
          row.getCell(i + 1).value = x;
        });
        const ph = photos[j.id] || [];
        row.height = Math.max(
          ph.length ? 92 : 30,
          Math.min(400, lineCount(keg) * 14.5 + 6),
        );
        for (let c = 1; c <= 11; c++) {
          const cell = row.getCell(c);
          cell.alignment = {
            vertical: "top",
            wrapText: true,
            horizontal: c === 1 ? "center" : "left",
          };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          cell.font = { name: "Calibri", size: 10 };
        }
        for (let k = 0; k < ph.length; k++) {
          try {
            const im = await loadImg(ph[k]);
            const sc = Math.min(176 / im.width, 112 / im.height);
            const id = wb.addImage({ base64: ph[k], extension: "jpeg" });
            ws.addImage(id, {
              tl: { col: 10 + 0.04, row: r - 1 + 0.05 },
              ext: {
                width: Math.round(im.width * sc),
                height: Math.round(im.height * sc),
              },
              editAs: "oneCell",
            });
          } catch (e) {}
        }
        r++;
      }
      r += 2;
      const put = (col, row, t, bold) => {
        const c = ws.getCell(col + row);
        c.value = t;
        c.font = { name: "Calibri", size: 11, bold: !!bold };
        c.alignment = { horizontal: "center" };
      };
      ws.mergeCells("C" + r + ":E" + r);
      ws.mergeCells("H" + r + ":I" + r);
      put("C", r, "Mengetahui,");
      put("H", r, "Jepara, " + midDate(TODAY));
      ws.mergeCells("C" + (r + 1) + ":E" + (r + 1));
      ws.mergeCells("H" + (r + 1) + ":I" + (r + 1));
      put("C", r + 1, "Kepala SMKN 1 Jepara");
      put("H", r + 1, "Plt. Kasubag. TU");
      ws.mergeCells("C" + (r + 5) + ":E" + (r + 5));
      ws.mergeCells("H" + (r + 5) + ":I" + (r + 5));
      ws.mergeCells("C" + (r + 6) + ":E" + (r + 6));
      ws.mergeCells("H" + (r + 6) + ":I" + (r + 6));
      put("C", r + 5, "Dr. SUGIYANTO, S.Pd., M.Pd.", true);
      put("H", r + 5, "POPI LIA MARISA, S.Kom", true);
      put("C", r + 6, "NIP. 19700510 199702 1 003");
      put("H", r + 6, "NIP. 19830705 200902 2 008");
      if (mode === "bulan") {
        const rs = wb.addWorksheet("Rekap");
        [5, 28, 24, 28, 14, 14, 14, 16].forEach((w, i) => {
          rs.getColumn(i + 1).width = w;
        });
        rs.mergeCells("A1:H1");
        rs.getCell("A1").value =
          "REKAP JURNAL TENAGA KEPENDIDIKAN · " +
          (a === b
            ? midDate(a)
            : midDate(a) + " s.d. " + midDate(b)
          ).toUpperCase();
        rs.getCell("A1").font = { bold: true, size: 13 };
        rs.getCell("A1").alignment = { horizontal: "center" };
        const hh = rs.getRow(3);
        [
          "No",
          "Nama",
          "NIP",
          "Jabatan",
          "Hari terisi",
          "Disetujui",
          "Menunggu",
          "Perlu perbaikan",
        ].forEach((h, i) => {
          hh.getCell(i + 1).value = h;
        });
        hh.eachCell((c) => {
          c.font = { bold: true, color: { argb: "FFFFFFFF" } };
          c.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF0E5A6B" },
          };
          c.alignment = {
            horizontal: "center",
            vertical: "middle",
            wrapText: true,
          };
        });
        const list = STAFF.filter((s) => sid === "all" || s.id === sid);
        list.forEach((s, i) => {
          const t = stat[s.id] || {
            h: 0,
            disetujui: 0,
            menunggu: 0,
            ditolak: 0,
          };
          const rr = rs.getRow(4 + i);
          [
            i + 1,
            s.nama,
            fmtNip(s.nip),
            jabP(s),
            t.h,
            t.disetujui,
            t.menunggu,
            t.ditolak,
          ].forEach((x, k) => {
            const c = rr.getCell(k + 1);
            c.value = x;
            c.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
            if (k >= 4 || k === 0) c.alignment = { horizontal: "center" };
            else if (k === 3) c.alignment = { wrapText: true, vertical: "top" };
          });
        });
      }
      const buf = await wb.xlsx.writeBuffer();
      const fn =
        "Jurnal-Tendik_" +
        (mode === "hari" ? a : a + "_sd_" + b) +
        (sid === "all"
          ? ""
          : "_" + BY[sid].nama.split(",")[0].replace(/\s+/g, "-")) +
        ".xlsx";
      await S.dl.save({
        filename: fn,
        data: new Blob([buf], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
      });
      toast("File Excel siap disimpan.");
    } catch (e) {
      if (e && e.code === "declined") toast("Unduhan dibatalkan.");
      else toast("Gagal membuat Excel. Coba lagi.");
    }
    btn.disabled = false;
    btn.textContent = "Unduh Excel";
  }

  /* ---------- tab ---------- */
  function showTab(t) {
    S.tab = t;
    document
      .querySelectorAll(".tabs button")
      .forEach((b) =>
        b.setAttribute("aria-selected", String(b.dataset.t === t)),
      );
    ["isi", "riwayat", "verif", "lap", "lapm", "akun"].forEach((k) => {
      $("#p-" + k).hidden = k !== t;
    });
    if (t === "riwayat") renderRiwayat();
    if (t === "verif") renderVerif();
    if (t === "akun") renderAkun();
    if (t === "lap") loadLap("l");
    if (t === "lapm") loadLap("m");
    window.scrollTo(0, 0);
  }

  /* ---------- event ---------- */
  document.addEventListener("click", async (e) => {
    const t = e.target.closest("[data-a]");
    if (!t) return;
    const a = t.dataset.a;
    if (a === "tab") {
      showTab(t.dataset.t);
    } else if (a === "pick") {
      S.sid = t.dataset.id;
      lsSet("jt.sid", S.sid);
      loadEntry();
    } else if (a === "job") {
      const i = +t.dataset.j,
        p = BY[S.sid];
      if (S.sel[i]) delete S.sel[i];
      else
        S.sel[i] = {
          items: tmpl(p.jobs[i]).map((x) => ({ t: x, d: false, c: false })),
          note: "",
        };
      renderJobs();
      renderTasks();
    } else if (a === "addc") {
      const i = +t.dataset.j,
        inp = document.getElementById("add-" + i),
        v = inp.value.trim();
      if (!v) return;
      S.sel[i].items.push({ t: v, d: true, c: true });
      renderTasks();
    } else if (a === "delc") {
      S.sel[+t.dataset.j].items.splice(+t.dataset.i, 1);
      renderTasks();
    } else if (a === "rmf") {
      const f = S.fotos.splice(+t.dataset.i, 1)[0];
      if (f && !f.isNew) S.removed.push(f.id);
      renderFotos();
    } else if (a === "lb") {
      const f = S.fotos[+t.dataset.i];
      if (f && f.d) {
        $("#lbi").src = f.d;
        $("#lb").hidden = false;
      }
    } else if (a === "lbx") {
      $("#lb").hidden = true;
    } else if (a === "kal") {
      if (S.role === "member" && t.dataset.d !== ymd(new Date())) {
        toast("Jurnal hanya bisa diisi untuk hari ini.");
        return;
      }
      S.tgl = t.dataset.d;
      $("#tgl").value = S.tgl;
      if (S.sid) loadEntry();
      else renderKal();
    } else if (a === "save") {
      save(t.dataset.send === "1");
    } else if (a === "open") {
      const j = S.entries.find((x) => x.id === t.dataset.id);
      if (j) {
        S.sid = j.sid;
        S.tgl = j.tgl;
        $("#tgl").value = j.tgl;
        await loadEntry();
        showTab("isi");
      }
    } else if (a === "showf") {
      const box = t.closest(".ent").querySelector(".ft");
      const j = S.entries.find((x) => x.id === t.dataset.id);
      if (!box.hidden) {
        box.hidden = true;
        return;
      }
      box.hidden = false;
      box.innerHTML = (j.fotos || [])
        .map(() => '<div class="ph"></div>')
        .join("");
      const ims = await Promise.all((j.fotos || []).map(getFoto));
      box.innerHTML = ims
        .map(
          (d, i) =>
            `<div class="ph">${d ? `<img alt="Foto ${i + 1}" src="${d}" data-a="lbsrc">` : ""}<span class="tm">${fmtTs((j.fat || {})[j.fotos[i]] || j.ts)}</span></div>`,
        )
        .join("");
    } else if (a === "lbsrc") {
      $("#lbi").src = t.src;
      $("#lb").hidden = false;
    } else if (a === "appr") {
      verifOne(t.dataset.id, "disetujui");
    } else if (a === "rej") {
      verifOne(t.dataset.id, "ditolak");
    } else if (a === "apprall") {
      verifAll();
    } else if (a === "export") {
      exportXlsx();
    } else if (a === "logout") {
      logout();
    } else if (a === "explap") {
      exportLaporan();
    } else if (a === "lq") {
      const r = t.dataset.r;
      let a1, b1;
      if (r === "today") {
        a1 = b1 = ymd(new Date());
      } else if (r === "7") {
        const s7 = new Date();
        s7.setDate(s7.getDate() - 6);
        a1 = ymd(s7);
        b1 = ymd(new Date());
      } else {
        const mr = monthRange(ymd(new Date()).slice(0, 7));
        a1 = mr[0];
        b1 = mr[1];
      }
      setListRange(a1, b1);
    } else if (a === "pg") {
      const v = t.dataset.k === "v";
      if (v) {
        S.pgV = +t.dataset.p;
        renderVerif();
      } else {
        S.pgR = +t.dataset.p;
        renderRiwayat();
      }
      const L = $(v ? "#vlist" : "#list");
      if (L && L.scrollIntoView) L.scrollIntoView({ block: "start" });
    } else if (a === "del") {
      const id = t.dataset.id;
      S.delId = id;
      renderRiwayat();
      setTimeout(() => {
        if (S.delId === id) {
          S.delId = null;
          renderRiwayat();
        }
      }, 6000);
    } else if (a === "delno") {
      S.delId = null;
      renderRiwayat();
    } else if (a === "delyes") {
      await deleteEntry(t.dataset.id);
    } else if (a === "lupa") {
      $("#lhelp").hidden = !$("#lhelp").hidden;
    } else if (a === "lrole") {
      S.lrole = t.dataset.r;
      document
        .querySelectorAll(".seg button")
        .forEach((b) =>
          b.setAttribute("aria-pressed", String(b.dataset.r === S.lrole)),
        );
      $("#lm").hidden = S.lrole === "admin";
      $("#la").hidden = S.lrole !== "admin";
      $("#lerr").hidden = true;
      setNew(false);
      if (S.lrole === "member") updNew();
    } else if (a === "resetpw") {
      if (S.role !== "admin" || !S.db) return;
      try {
        await S.db.doc("akun/" + t.dataset.id).delete();
        toast(
          "Password " +
            BY[t.dataset.id].nama +
            " direset. Ybs membuat password baru saat masuk.",
        );
        renderAkun();
      } catch (err) {
        toast("Gagal mereset password.");
      }
    }
  });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset && t.dataset.a === "tk") {
      const o = S.sel[+t.dataset.j],
        it = o.items[+t.dataset.i];
      it.d = t.checked;
      t.closest(".it").classList.toggle("on", t.checked);
      t.closest(".jobcard").querySelector(".cnt").textContent =
        o.items.filter((x) => x.d).length + "/" + o.items.length;
    }
  });
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.dataset && t.dataset.a === "note") S.sel[+t.dataset.j].note = t.value;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.id && e.target.id.indexOf("add-") === 0) {
      e.preventDefault();
      const b = e.target.parentNode.querySelector('[data-a="addc"]');
      if (b) b.click();
    }
    if (e.key === "Escape") $("#lb").hidden = true;
  });
  $("#lb").addEventListener("click", (e) => {
    if (e.target.id === "lb") $("#lb").hidden = true;
  });
  $("#foto").addEventListener("change", async (e) => {
    await addFiles(e.target.files);
    e.target.value = "";
  });
  $("#tgl").addEventListener("change", (e) => {
    if (!e.target.value) return;
    if (S.role === "member" && e.target.value !== ymd(new Date())) {
      e.target.value = ymd(new Date());
      toast("Jurnal hanya bisa diisi untuk hari ini.");
    }
    S.tgl = e.target.value;
    setMonth(S.tgl.slice(0, 7));
    loadEntry();
  });
  function setListRange(a, b) {
    S.rng = { a: a, b: b };
    ["v", "x"].forEach((p) => {
      $("#" + p + "From").value = a;
      $("#" + p + "To").value = b;
    });
    S.entries = [];
    S.verifs = {};
    resub();
    renderLive();
  }
  function onListRange(p) {
    const a = $("#" + p + "From").value,
      b = $("#" + p + "To").value;
    if (!a || !b) return;
    if (a > b) {
      toast("Tanggal awal harus sebelum tanggal akhir.");
      return;
    }
    const n = daysBetween(a, b).length;
    if (p === "x") {
      if (n > 366) {
        toast("Rentang maksimal 1 tahun.");
        return;
      }
      if (n > 93) {
        toast(
          "Rentang lebih dari 93 hari: daftar tidak diperbarui, tetapi Unduh Excel memakai seluruh rentang.",
        );
        return;
      }
    } else if (n > 93) {
      toast("Rentang daftar maksimal 93 hari.");
      return;
    }
    setListRange(a, b);
  }
  ["x", "v"].forEach((p) => {
    $("#" + p + "From").addEventListener("change", () => onListRange(p));
    $("#" + p + "To").addEventListener("change", () => onListRange(p));
  });
  ["l", "m"].forEach((p) => {
    $("#" + p + "From").addEventListener("change", () => onRange(p));
    $("#" + p + "To").addEventListener("change", () => onRange(p));
  });
  $("#lHK").addEventListener("input", () => renderLap());
  $("#mHK").addEventListener("input", () => renderLapMember());
  $("#xSid").addEventListener("change", renderRiwayat);
  $("#fSt").addEventListener("change", renderRiwayat);
  $("#vSt").addEventListener("change", renderVerif);
  $("#vWho").addEventListener("change", (e) => lsSet("jt.who", e.target.value));

  /* ---------- hapus jurnal (admin) ---------- */
  async function deleteEntry(id) {
    if (S.role !== "admin" || !S.db || S.busy) return;
    S.busy = true;
    try {
      const j = S.entries.find((x) => x.id === id);
      let ids = j ? j.fotos || [] : [];
      if (!j) {
        const d = await S.db.doc("jurnal/" + id).get();
        if (d.exists) ids = d.data().fotos || [];
      }
      for (const f of ids) {
        await S.db.doc("foto/" + f).delete();
        fotoCache.delete(f);
      }
      await S.db.doc("verifikasi/" + id).delete();
      await S.db.doc("jurnal/" + id).delete();
      toast("Jurnal dihapus.");
    } catch (e) {
      toast("Gagal menghapus. Coba lagi.");
    }
    S.delId = null;
    S.busy = false;
    renderLive();
  }

  /* ---------- laporan (pilih rentang tanggal sendiri) ---------- */
  function daysBetween(a, b) {
    const out = [];
    let d = parse(a);
    const e = parse(b);
    while (d <= e && out.length < 400) {
      out.push(ymd(d));
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    }
    return out;
  }
  function hkRange(a, b) {
    return daysBetween(a, b).filter((k) => {
      const w = parse(k).getDay();
      return w > 0 && w < 6;
    }).length;
  }
  function monthRange(m) {
    const a = m.split("-").map(Number);
    return [m + "-01", m + "-" + pad(new Date(a[0], a[1], 0).getDate())];
  }
  function initRange() {
    const r = monthRange(S.month);
    ["l", "m"].forEach((p) => {
      $("#" + p + "From").value = r[0];
      $("#" + p + "To").value = r[1];
      $("#" + p + "HK").value = hkRange(r[0], r[1]);
    });
  }
  function onRange(p) {
    const a = $("#" + p + "From").value,
      b = $("#" + p + "To").value;
    if (!a || !b) return;
    if (a > b) {
      toast("Tanggal awal harus sebelum tanggal akhir.");
      return;
    }
    if (daysBetween(a, b).length > 366) {
      toast("Rentang maksimal 1 tahun.");
      return;
    }
    $("#" + p + "HK").value = hkRange(a, b);
    loadLap(p);
  }
  async function loadLap(p) {
    const a = $("#" + p + "From").value,
      b = $("#" + p + "To").value;
    if (!S.db || !a || !b || a > b) {
      S.lap[p] = { a: a, b: b, entries: [], verifs: {} };
      p === "l" ? renderLap() : renderLapMember();
      return;
    }
    const my = (S.tokL[p] = (S.tokL[p] || 0) + 1);
    try {
      const res = await Promise.all([
        S.db
          .collection("jurnal")
          .where("tgl", ">=", a)
          .where("tgl", "<=", b)
          .get(),
        S.db
          .collection("verifikasi")
          .where("tgl", ">=", a)
          .where("tgl", "<=", b)
          .get(),
      ]);
      if (my !== S.tokL[p]) return;
      const v = {};
      res[1].docs.forEach((d) => {
        v[d.id] = d.data();
      });
      S.lap[p] = {
        a: a,
        b: b,
        entries: res[0].docs.map((d) => Object.assign({ id: d.id }, d.data())),
        verifs: v,
      };
    } catch (e) {
      toast("Gagal memuat laporan.");
    }
    p === "l" ? renderLap() : renderLapMember();
  }
  function lapData(p) {
    const L = S.lap[p] || { entries: [], verifs: {}, a: "", b: "" };
    const hk = Math.max(0, +$("#" + p + "HK").value || 0);
    const list = p === "m" ? STAFF.filter((s) => s.id === S.sid) : STAFF;
    const rows = list.map((s) => {
      const mine = L.entries.filter(
        (j) => j.sid === s.id && (p === "m" || j.status === "terkirim"),
      );
      const c = {
        h: 0,
        draft: 0,
        disetujui: 0,
        menunggu: 0,
        ditolak: 0,
        keg: 0,
        tot: 0,
      };
      mine.forEach((j) => {
        const st = statusOf(j, L.verifs[j.id]);
        c[st]++;
        if (st !== "draft") c.h++;
        (j.jobs || []).forEach((o) =>
          o.items.forEach((x) => {
            c.tot++;
            if (x.d) c.keg++;
          }),
        );
      });
      c.pct = hk ? Math.min(100, Math.round((c.h / hk) * 100)) : 0;
      return { s: s, c: c, mine: mine };
    });
    const T = {
      h: 0,
      draft: 0,
      disetujui: 0,
      menunggu: 0,
      ditolak: 0,
      keg: 0,
      tot: 0,
    };
    rows.forEach((r) => {
      for (const k in T) T[k] += r.c[k];
    });
    T.pct = rows.length
      ? Math.round(rows.reduce((a, r) => a + r.c.pct, 0) / rows.length)
      : 0;
    return { hk: hk, rows: rows, T: T, L: L };
  }
  const tileH = (l, v) =>
    `<div class="tile"><small>${l}</small><b>${v}</b></div>`;
  function renderLap() {
    if (S.role !== "admin") return;
    const D = lapData("l"),
      T = D.T;
    $("#lapT").innerHTML =
      tileH("Jurnal terkirim", T.h) +
      tileH("Disetujui", T.disetujui) +
      tileH("Menunggu", T.menunggu) +
      tileH("Perlu perbaikan", T.ditolak) +
      tileH("Kegiatan selesai", T.keg + "/" + T.tot) +
      tileH("Rata-rata kelengkapan", T.pct + "%");
    $("#lapTbl").innerHTML =
      `<thead><tr><th class="n">No</th><th>Pegawai</th><th class="n">Hari terisi</th><th class="n">Disetujui</th><th class="n">Menunggu</th><th class="n">Perlu perbaikan</th><th class="n">Kegiatan selesai</th><th>Kelengkapan</th></tr></thead><tbody>` +
      D.rows
        .map(
          (r, i) =>
            `<tr><td class="n">${i + 1}</td><td>${esc(r.s.nama)}</td><td class="n">${r.c.h}</td><td class="n">${r.c.disetujui}</td><td class="n">${r.c.menunggu}</td><td class="n">${r.c.ditolak}</td><td class="n">${r.c.keg}/${r.c.tot}</td><td><span class="meter"><i style="width:${r.c.pct}%"></i></span>${r.c.pct}%</td></tr>`,
        )
        .join("") +
      `</tbody><tfoot><tr><td></td><td>Total</td><td class="n">${T.h}</td><td class="n">${T.disetujui}</td><td class="n">${T.menunggu}</td><td class="n">${T.ditolak}</td><td class="n">${T.keg}/${T.tot}</td><td>${T.pct}%</td></tr></tfoot>`;
  }
  function renderLapMember() {
    if (S.role !== "member") return;
    const D = lapData("m"),
      T = D.T,
      r = D.rows[0];
    $("#mapT").innerHTML =
      tileH("Jurnal terkirim", T.h) +
      tileH("Disetujui", T.disetujui) +
      tileH("Menunggu", T.menunggu) +
      tileH("Perlu perbaikan", T.ditolak) +
      tileH("Draf", T.draft) +
      tileH("Kelengkapan", T.pct + "%");
    const body = r.mine
      .slice()
      .sort((a, b) => a.tgl.localeCompare(b.tgl))
      .map((j) => {
        const st = statusOf(j, D.L.verifs[j.id]);
        const dn = (j.jobs || []).reduce(
            (a, o) => a + o.items.filter((x) => x.d).length,
            0,
          ),
          tot = (j.jobs || []).reduce((a, o) => a + o.items.length, 0);
        return `<tr><td>${longDate(j.tgl)}</td><td style="white-space:normal;min-width:220px">${esc((j.jobs || []).map((o) => o.job).join(", "))}</td><td class="n">${dn}/${tot}</td><td>${fmtTs(j.ts)}</td><td><span class="pill st-${st}">${ST[st]}</span></td></tr>`;
      })
      .join("");
    $("#lapmTbl").innerHTML =
      `<thead><tr><th>Tanggal</th><th>Job</th><th class="n">Kegiatan selesai</th><th>Waktu</th><th>Status</th></tr></thead><tbody>${body || '<tr><td colspan="5" style="color:var(--muted)">Belum ada jurnal pada rentang tanggal ini.</td></tr>'}</tbody>`;
  }
  async function exportLaporan() {
    if (S.role !== "admin") {
      toast("Laporan hanya untuk admin.");
      return;
    }
    if (!S.dl) {
      toast("Unduhan tidak tersedia di tampilan ini.");
      return;
    }
    if (typeof ExcelJS === "undefined") {
      toast("Pustaka Excel belum termuat. Muat ulang halaman.");
      return;
    }
    const btn = $("#b-lap");
    btn.disabled = true;
    btn.textContent = "Menyiapkan…";
    try {
      await loadLap("l");
      const D = lapData("l"),
        a = D.L.a,
        b = D.L.b;
      if (!a || !b || a > b) {
        toast("Pilih rentang tanggal yang benar.");
        btn.disabled = false;
        btn.textContent = "Unduh Laporan Excel";
        return;
      }
      const bd = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      const HEAD = {
        font: { bold: true, color: { argb: "FFFFFFFF" }, name: "Calibri" },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF0E5A6B" },
        },
        alignment: { horizontal: "center", vertical: "middle", wrapText: true },
      };
      const wb = new ExcelJS.Workbook();
      wb.creator = "SMK Negeri 1 Jepara";
      wb.created = new Date();
      const page = {
        orientation: "landscape",
        paperSize: 9,
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 0,
      };
      const periode =
        a === b ? longDate(a) : midDate(a) + " s.d. " + midDate(b);
      const sig = (ws, rw, a1, a2, b1, b2) => {
        const put = (col, row, t, bold) => {
          const c = ws.getCell(col + row);
          c.value = t;
          c.font = { name: "Calibri", size: 11, bold: !!bold };
          c.alignment = { horizontal: "center" };
        };
        [
          [0, "Mengetahui,", "Jepara, " + midDate(TODAY)],
          [1, "Kepala SMKN 1 Jepara", "Plt. Kasubag. TU"],
          [5, "Dr. SUGIYANTO, S.Pd., M.Pd.", "POPI LIA MARISA, S.Kom"],
          [6, "NIP. 19700510 199702 1 003", "NIP. 19830705 200902 2 008"],
        ].forEach((x) => {
          ws.mergeCells(a1 + (rw + x[0]) + ":" + a2 + (rw + x[0]));
          ws.mergeCells(b1 + (rw + x[0]) + ":" + b2 + (rw + x[0]));
          put(a1, rw + x[0], x[1], x[0] === 5);
          put(b1, rw + x[0], x[2], x[0] === 5);
        });
      };
      const ws = wb.addWorksheet("Laporan", { pageSetup: page });
      [5, 28, 24, 28, 12, 12, 12, 14, 16, 16].forEach((w, i) => {
        ws.getColumn(i + 1).width = w;
      });
      const ttl = (r, t, sz, bo) => {
        ws.mergeCells("A" + r + ":J" + r);
        const c = ws.getCell("A" + r);
        c.value = t;
        c.font = { bold: !!bo, size: sz, name: "Calibri" };
        c.alignment = { horizontal: "center" };
      };
      ttl(1, "LAPORAN JURNAL KEGIATAN TENAGA KEPENDIDIKAN", 15, true);
      ttl(2, "SMK NEGERI 1 JEPARA", 13, true);
      ttl(3, "Periode: " + periode, 11, false);
      ttl(4, "Hari kerja: " + D.hk + " hari (Senin sampai Jumat)", 11, false);
      const hr = ws.getRow(6);
      [
        "No",
        "Nama",
        "NIP",
        "Jabatan",
        "Hari terisi",
        "Disetujui",
        "Menunggu",
        "Perlu perbaikan",
        "Kegiatan selesai",
        "Kelengkapan",
      ].forEach((h, i) => {
        const c = hr.getCell(i + 1);
        c.value = h;
        Object.assign(c, HEAD);
        c.border = bd;
      });
      hr.height = 28;
      let r = 7;
      D.rows.forEach((x, i) => {
        const row = ws.getRow(r);
        [
          i + 1,
          x.s.nama,
          fmtNip(x.s.nip),
          jabP(x.s),
          x.c.h,
          x.c.disetujui,
          x.c.menunggu,
          x.c.ditolak,
          x.c.keg + " / " + x.c.tot,
          x.c.pct / 100,
        ].forEach((v, k) => {
          const c = row.getCell(k + 1);
          c.value = v;
          c.border = bd;
          c.font = { name: "Calibri", size: 11 };
          c.alignment = {
            vertical: "middle",
            wrapText: true,
            horizontal: k >= 4 || k === 0 ? "center" : "left",
          };
          if (k === 9) c.numFmt = "0%";
        });
        r++;
      });
      const tr = ws.getRow(r);
      [
        "",
        "Total",
        "",
        "",
        D.T.h,
        D.T.disetujui,
        D.T.menunggu,
        D.T.ditolak,
        D.T.keg + " / " + D.T.tot,
        D.T.pct / 100,
      ].forEach((v, k) => {
        const c = tr.getCell(k + 1);
        c.value = v;
        c.border = bd;
        c.font = { bold: true, name: "Calibri", size: 11 };
        c.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE5EBEE" },
        };
        c.alignment = { horizontal: k >= 4 ? "center" : "left" };
        if (k === 9) c.numFmt = "0%";
      });
      sig(ws, r + 3, "B", "D", "H", "J");
      const days = daysBetween(a, b);
      if (days.length <= 93) {
        const multi = a.slice(0, 7) !== b.slice(0, 7);
        const nd = days.length;
        const ms = wb.addWorksheet("Matriks Harian", { pageSetup: page });
        ms.getColumn(1).width = 5;
        ms.getColumn(2).width = 28;
        for (let d = 1; d <= nd; d++)
          ms.getColumn(2 + d).width = multi ? 5.6 : 4.3;
        ms.getColumn(3 + nd).width = 9;
        ms.mergeCells(1, 1, 1, 3 + nd);
        ms.getCell(1, 1).value =
          "MATRIKS KELENGKAPAN JURNAL HARIAN · " + periode.toUpperCase();
        ms.getCell(1, 1).font = { bold: true, size: 13, name: "Calibri" };
        ms.getCell(1, 1).alignment = { horizontal: "center" };
        ms.mergeCells(2, 1, 2, 3 + nd);
        ms.getCell(2, 1).value =
          "✔ disetujui   … menunggu verifikasi   ✖ perlu perbaikan   (kosong = belum ada jurnal terkirim)";
        ms.getCell(2, 1).alignment = { horizontal: "center" };
        ms.getCell(2, 1).font = { size: 10, name: "Calibri" };
        const mh = ms.getRow(4);
        mh.getCell(1).value = "No";
        mh.getCell(2).value = "Nama";
        days.forEach((k, i) => {
          const d = parse(k);
          mh.getCell(3 + i).value = multi
            ? d.getDate() + "/" + (d.getMonth() + 1)
            : d.getDate();
        });
        mh.getCell(3 + nd).value = "Jumlah";
        for (let c = 1; c <= 3 + nd; c++) {
          const cell = mh.getCell(c);
          Object.assign(cell, HEAD);
          cell.border = bd;
        }
        const FILL = {
          disetujui: "FFDCF1E5",
          menunggu: "FFFBEBD0",
          ditolak: "FFF9DEDB",
        };
        const SYM = { disetujui: "✔", menunggu: "…", ditolak: "✖" };
        D.rows.forEach((x, i) => {
          const row = ms.getRow(5 + i);
          row.getCell(1).value = i + 1;
          row.getCell(2).value = x.s.nama;
          const byDay = {};
          x.mine.forEach((j) => {
            byDay[j.tgl] = statusOf(j, D.L.verifs[j.id]);
          });
          days.forEach((k, di) => {
            const dow = parse(k).getDay(),
              cell = row.getCell(3 + di),
              st = byDay[k];
            if (st) {
              cell.value = SYM[st];
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: FILL[st] },
              };
            } else if (dow === 0 || dow === 6) {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFE5EBEE" },
              };
            }
          });
          row.getCell(3 + nd).value = x.c.h;
          for (let c = 1; c <= 3 + nd; c++) {
            const cell = row.getCell(c);
            cell.border = bd;
            cell.font = { name: "Calibri", size: 10 };
            cell.alignment = {
              horizontal: c === 2 ? "left" : "center",
              vertical: "middle",
            };
          }
        });
      }
      const buf = await wb.xlsx.writeBuffer();
      await S.dl.save({
        filename: "Laporan-Jurnal_" + a + (a === b ? "" : "_sd_" + b) + ".xlsx",
        data: new Blob([buf], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
      });
      toast("Laporan siap disimpan.");
    } catch (e) {
      if (e && e.code === "declined") toast("Unduhan dibatalkan.");
      else toast("Gagal membuat laporan. Coba lagi.");
    }
    btn.disabled = false;
    btn.textContent = "Unduh Laporan Excel";
  }

  /* ---------- login & akun ---------- */
  const ADMIN_MAILS = ["admin", "admin@smkn1jepara.sch.id"];
  const norm = (s) =>
    String(s || "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  const hex = (u8) =>
    Array.from(u8)
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  async function sha(pw, salt) {
    const b = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(salt + ":" + pw),
    );
    return hex(new Uint8Array(b));
  }
  const rndSalt = () => hex(crypto.getRandomValues(new Uint8Array(12)));
  async function checkPw(id, pw) {
    const d = await S.db.doc("akun/" + id).get();
    if (d.exists) {
      const a = d.data();
      return { ok: (await sha(pw, a.salt)) === a.hash, isDefault: false };
    }
    if (id === "admin") return { ok: pw === "admin", isDefault: true };
    return { ok: false, needNew: true };
  }
  async function setPw(id, pw) {
    const salt = rndSalt();
    await S.db
      .doc("akun/" + id)
      .set({ salt: salt, hash: await sha(pw, salt), ts: Date.now() });
  }
  function findStaff(txt) {
    const n = norm(txt);
    if (!n) return null;
    const ex = STAFF.find((s) => norm(s.nama) === n);
    if (ex) return ex;
    const m = STAFF.filter((s) => norm(s.nama).indexOf(n) >= 0);
    return m.length === 1 ? m[0] : null;
  }
  function lerr(t) {
    const e = $("#lerr");
    e.textContent = t;
    e.hidden = false;
  }
  function enter(sess, isDef) {
    S.role = sess.role;
    S.sid = sess.sid || null;
    S.mustChange = !!isDef;
    S.sel = {};
    S.fotos = [];
    try {
      sessionStorage.setItem("jt.sess", JSON.stringify(sess));
    } catch (e) {}
    $("#login").hidden = true;
    $("#main").hidden = false;
    $("#b-out").hidden = false;
    $("#who").textContent = S.role === "admin" ? "Admin" : BY[S.sid].nama;
    $("#who").hidden = false;
    $("#tab-verif").hidden = S.role !== "admin";
    $("#tab-lap").hidden = S.role !== "admin";
    $("#tab-lapm").hidden = S.role !== "member";
    $("#exp").hidden = S.role !== "admin";
    document.querySelector('.tabs [data-t="riwayat"]').hidden =
      S.role !== "admin";
    document.querySelector('.tabs [data-t="isi"]').hidden = S.role === "admin";
    fillSidSelect($("#xSid"), S.sid || "all", "Semua pegawai");
    $("#xSid").disabled = S.role === "member";
    if (S.role === "member") {
      S.tgl = ymd(new Date());
      S.month = S.tgl.slice(0, 7);
      $("#tgl").value = S.tgl;
      $("#tgl").max = S.tgl;
      $("#tgl").min = S.tgl;
    }
    $("#tgl").disabled = S.role === "member";
    S.entries = [];
    S.verifs = {};
    resub();
    fullRender();
    renderLive();
    showTab(S.role === "admin" ? "verif" : "isi");
    if (S.role === "member") loadEntry();
    if (S.mustChange) {
      toast("Password masih bawaan. Ganti di tab Akun.");
    }
  }
  function logout() {
    try {
      sessionStorage.removeItem("jt.sess");
    } catch (e) {}
    S.role = null;
    S.sid = null;
    S.sel = {};
    S.fotos = [];
    S.cur = null;
    S.curV = null;
    S.mustChange = false;
    $("#main").hidden = true;
    $("#login").hidden = false;
    $("#b-out").hidden = true;
    $("#who").hidden = true;
    $("#lPass").value = "";
    $("#lerr").hidden = true;
    setNew(false);
    updNew();
  }
  async function renderAkun() {
    $("#pwbanner").hidden = !S.mustChange;
    $("#akunwho").textContent =
      S.role === "admin"
        ? "Akun: Admin"
        : "Akun: " + (BY[S.sid] ? BY[S.sid].nama : "");
    $("#kelola").hidden = S.role !== "admin";
    if (S.role !== "admin" || !S.db) return;
    let changed = {};
    try {
      const q = await S.db.collection("akun").get();
      q.docs.forEach((d) => {
        changed[d.id] = true;
      });
    } catch (e) {}
    $("#akunlist").innerHTML = STAFF.map(
      (s) =>
        `<div class="arow"><b>${esc(s.nama)}</b><span class="pill ${changed[s.id] ? "st-disetujui" : "st-draft"}">${changed[s.id] ? "Sudah dibuat" : "Belum dibuat"}</span><button class="btn alt sm" data-a="resetpw" data-id="${s.id}" ${changed[s.id] ? "" : "disabled"}>Reset</button></div>`,
    ).join("");
  }
  function setNew(on) {
    $("#lnew").hidden = !on;
    $("#lnewmsg").hidden = !on;
    $("#lPassLbl").textContent = on ? "Password baru" : "Password";
    $("#b-login").textContent = on ? "Buat password & masuk" : "Masuk";
    if (!on) $("#lPass2").value = "";
  }
  async function updNew() {
    const s = BY[$("#lNama").value];
    let need = false;
    if (s && S.db && S.lrole === "member") {
      try {
        const d = await S.db.doc("akun/" + s.id).get();
        need = !d.exists;
      } catch (e) {}
    }
    if (BY[$("#lNama").value] !== s) return;
    setNew(need);
  }
  $("#lNama").addEventListener("change", updNew);
  const EYE =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  const EYEOFF =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.9 17.9A10.9 10.9 0 0 1 12 19C5 19 1 12 1 12a19.8 19.8 0 0 1 5.1-5.9M9.9 5.1A10.4 10.4 0 0 1 12 5c7 0 11 7 11 7a19.9 19.9 0 0 1-3.2 4.2M1 1l22 22"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/></svg>';
  function addEyes() {
    document.querySelectorAll("input[type=password]").forEach((inp) => {
      if (inp.parentNode.classList.contains("pw")) return;
      const w = document.createElement("span");
      w.className = "pw";
      inp.parentNode.insertBefore(w, inp);
      w.appendChild(inp);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "eye";
      b.innerHTML = EYE;
      b.setAttribute("aria-label", "Tampilkan password");
      b.addEventListener("click", () => {
        const show = inp.type === "password";
        inp.type = show ? "text" : "password";
        b.innerHTML = show ? EYEOFF : EYE;
        b.setAttribute(
          "aria-label",
          show ? "Sembunyikan password" : "Tampilkan password",
        );
      });
      w.appendChild(b);
    });
  }
  $("#f-login").addEventListener("submit", async (e) => {
    e.preventDefault();
    $("#lerr").hidden = true;
    if (!S.db) {
      lerr(
        "Penyimpanan belum aktif. Muat ulang halaman, atau minta akses Contributor.",
      );
      return;
    }
    if (!(window.crypto && crypto.subtle)) {
      lerr("Browser ini tidak mendukung login aman.");
      return;
    }
    const pw = $("#lPass").value;
    if (!pw) {
      lerr("Isi password.");
      return;
    }
    const btn = $("#b-login");
    btn.disabled = true;
    try {
      if (S.lrole === "admin") {
        if (ADMIN_MAILS.indexOf($("#lMail").value.trim().toLowerCase()) < 0) {
          lerr("Email atau password salah.");
        } else {
          const r = await checkPw("admin", pw);
          if (r.ok) enter({ role: "admin" }, r.isDefault);
          else lerr("Email atau password salah.");
        }
      } else {
        const s = BY[$("#lNama").value];
        if (!s) lerr("Pilih nama Anda dahulu.");
        else {
          const r = await checkPw(s.id, pw);
          if (r.needNew) {
            if (pw.length < 6) {
              setNew(true);
              lerr("Password baru minimal 6 karakter.");
            } else if ($("#lnew").hidden) {
              setNew(true);
              lerr("Ulangi password baru di kolom bawah.");
            } else if (pw !== $("#lPass2").value)
              lerr("Ulangi password dengan sama.");
            else {
              await setPw(s.id, pw);
              setNew(false);
              enter({ role: "member", sid: s.id }, false);
            }
          } else if (r.ok) enter({ role: "member", sid: s.id }, r.isDefault);
          else lerr("Nama atau password salah.");
        }
      }
    } catch (ex) {
      lerr("Gagal masuk. Coba lagi.");
    }
    btn.disabled = false;
  });
  $("#f-pw").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = S.role === "admin" ? "admin" : S.sid;
    const o = $("#pwOld").value,
      n = $("#pwNew").value,
      n2 = $("#pwNew2").value;
    if (n.length < 6) {
      toast("Password baru minimal 6 karakter.");
      return;
    }
    if (n !== n2) {
      toast("Ulangi password baru dengan sama.");
      return;
    }
    try {
      const r = await checkPw(id, o);
      if (!r.ok) {
        toast("Password lama salah.");
        return;
      }
      await setPw(id, n);
      S.mustChange = false;
      $("#pwbanner").hidden = true;
      $("#pwOld").value = $("#pwNew").value = $("#pwNew2").value = "";
      toast("Password diganti.");
      if (S.role === "admin") renderAkun();
    } catch (ex) {
      toast("Gagal menyimpan password.");
    }
  });
  async function restoreSession() {
    let s = null;
    try {
      s = JSON.parse(sessionStorage.getItem("jt.sess") || "null");
    } catch (e) {}
    if (s && S.db && (s.role === "admin" || (s.role === "member" && BY[s.sid])))
      enter(s, false);
  }

  /* ---------- mulai ---------- */
  async function init() {
    initRange();
    {
      const r = monthRange(S.month);
      S.rng = { a: r[0], b: r[1] };
      ["v", "x"].forEach((p) => {
        $("#" + p + "From").value = r[0];
        $("#" + p + "To").value = r[1];
      });
    }
    S.sid = null;
    $("#lNama").innerHTML =
      '<option value="">Pilih nama Anda</option>' + staffOpts();
    addEyes();
    fillSidSelect($("#xSid"), "all", "Semua pegawai");
    $("#tgl").value = S.tgl;
    const w = lsGet("jt.who");
    if (w) $("#vWho").value = w;
    fullRender();
    renderRiwayat();
    const C = window.claude;
    try {
      S.db = C && C.use ? await C.use("db") : null;
    } catch (e) {
      S.db = null;
    }
    try {
      S.user = C && C.use ? await C.use("user") : null;
    } catch (e) {
      S.user = null;
    }
    try {
      S.dl = C && C.use ? await C.use("downloads") : null;
    } catch (e) {
      S.dl = null;
    }
    if (S.user) {
      try {
        S.uid = await S.user.id();
      } catch (e) {}
      try {
        if (S.user.can && S.user.can("data.write") === false)
          S.canWrite = false;
      } catch (e) {}
    }
    if (!S.db) setConn("bad", "penyimpanan tidak aktif");
    else if (!S.canWrite) setConn("bad", "mode baca");
    else
      setConn(
        "ok",
        window.JT_MODE === "lokal" ? "mode lokal (demo)" : "tersimpan di cloud",
      );
    resub();
    await restoreSession();
  }
  init();
})();
