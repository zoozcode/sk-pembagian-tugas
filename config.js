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
// window.JT_FIREBASE = null;

/* Contoh setelah diisi:
window.JT_FIREBASE = {
  apiKey: "AIza...",
  authDomain: "nama-proyek.firebaseapp.com",
  projectId: "nama-proyek",
  appId: "1:1234567890:web:abcdef"
};
*/

/*
  PENGATURAN PENYIMPANAN
  ----------------------
  Firebase Firestore aktif: data jurnal dipakai bersama oleh semua anggota dan admin.
  Untuk kembali ke MODE LOKAL (demo, data hanya di peramban ini), ubah menjadi:
      window.JT_FIREBASE = null;
*/
window.JT_FIREBASE = {
  apiKey: "AIzaSyC23Rmt51ezpNfQYA3W6QBzNR74jlNozAQ",
  authDomain: "jurnal-tendik-958f2.firebaseapp.com",
  projectId: "jurnal-tendik-958f2",
  storageBucket: "jurnal-tendik-958f2.firebasestorage.app",
  messagingSenderId: "1071426666146",
  appId: "1:1071426666146:web:1f3fb5e20cda0cac9f61fb"
};