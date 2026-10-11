/*
  PENGATURAN PENYIMPANAN
  ----------------------
  1) Biarkan  window.JT_FIREBASE = null;  untuk MODE LOKAL.
     Data tersimpan hanya di peramban perangkat ini (cocok untuk mencoba aplikasi).
     Data TIDAK dibagikan ke perangkat lain, jadi anggota dan admin tidak saling melihat data.

  2) Isi konfigurasi Firebase di bawah untuk data bersama semua pegawai dan admin:
     - Buat proyek di https://console.firebase.google.com
     - Build > Firestore Database > Create database
     - Project settings > Your apps > Web app, salin firebaseConfig ke sini.
*/
window.JT_FIREBASE = null;

/* Contoh setelah diisi:
window.JT_FIREBASE = {
  apiKey: "AIza...",
  authDomain: "nama-proyek.firebaseapp.com",
  projectId: "nama-proyek",
  appId: "1:1234567890:web:abcdef"
};
*/