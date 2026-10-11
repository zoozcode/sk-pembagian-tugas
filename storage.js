/*
  Penyimpanan untuk hosting sendiri.
  File ini menyediakan window.claude.use('db' | 'user' | 'downloads') yang dipakai app.js.
  Di dalam Claude, file ini tidak dipakai karena Claude sudah menyediakan penyimpanan sendiri.
*/
(function () {
  'use strict';
  if (window.claude && window.claude.use) return;

  var cfg = window.JT_FIREBASE || null;
  window.JT_MODE = cfg ? 'firebase' : 'lokal';
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.onload = res;
      s.onerror = function () { rej(new Error('gagal memuat ' + src)); };
      document.head.appendChild(s);
    });
  }

  /* ---------- Mode lokal: localStorage ---------- */
  function localDb() {
    var KEY = 'jt.local.db';
    var read = function () { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } };
    var write = function (m) {
      try { localStorage.setItem(KEY, JSON.stringify(m)); }
      catch (e) { var er = new Error('Penyimpanan peramban penuh'); er.code = 'quota_exceeded'; throw er; }
    };
    var subs = new Set();
    var notify = function () { subs.forEach(function (f) { try { f(); } catch (e) {} }); };
    window.addEventListener('storage', function (e) { if (e.key === KEY) notify(); });
    var snap = function (id, data) {
      return { id: id, exists: data !== undefined, data: function () { return data === undefined ? undefined : clone(data); } };
    };
    function docRef(path) {
      var id = path.split('/').pop();
      return {
        id: id, path: path,
        get: async function () { return snap(id, read()[path]); },
        set: async function (d) { var m = read(); m[path] = clone(d); write(m); notify(); },
        update: async function (d) { var m = read(); m[path] = Object.assign(m[path] || {}, clone(d)); write(m); notify(); },
        delete: async function () { var m = read(); delete m[path]; write(m); notify(); }
      };
    }
    function query(col, filters) {
      function run() {
        var m = read(), pre = col + '/';
        var rows = Object.keys(m)
          .filter(function (k) { return k.indexOf(pre) === 0 && k.slice(pre.length).indexOf('/') < 0; })
          .map(function (k) { return { id: k.slice(pre.length), d: m[k] }; });
        filters.forEach(function (f) {
          rows = rows.filter(function (r) {
            var v = r.d[f[0]];
            switch (f[1]) {
              case '>=': return v >= f[2];
              case '<=': return v <= f[2];
              case '>': return v > f[2];
              case '<': return v < f[2];
              case '==': return v === f[2];
              case '!=': return v !== f[2];
            }
            return true;
          });
        });
        rows.sort(function (a, b) { return a.id < b.id ? -1 : 1; });
        return { docs: rows.map(function (r) { return snap(r.id, r.d); }), size: rows.length, empty: !rows.length };
      }
      return {
        where: function (f, op, v) { return query(col, filters.concat([[f, op, v]])); },
        get: async function () { return run(); },
        onSnapshot: function (next) {
          var fn = function () { next(run()); };
          subs.add(fn); setTimeout(fn, 0);
          return function () { subs.delete(fn); };
        }
      };
    }
    return {
      doc: docRef,
      collection: function (p) { return Object.assign(query(p, []), { doc: function (id) { return docRef(p + '/' + id); } }); }
    };
  }

  /* ---------- Mode Firebase (Firestore) ---------- */
  async function firebaseDb() {
    var base = 'https://www.gstatic.com/firebasejs/10.12.2/';
    await loadScript(base + 'firebase-app-compat.js');
    await loadScript(base + 'firebase-firestore-compat.js');
    if (!firebase.apps.length) firebase.initializeApp(cfg);
    return firebase.firestore();
  }

  var downloads = {
    save: async function (req) {
      var b = req.data instanceof Blob ? req.data : new Blob([req.data]);
      var a = document.createElement('a');
      a.href = URL.createObjectURL(b); a.download = req.filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      return { status: 'saved' };
    }
  };
  var user = {
    can: function () { return true; },
    canEdit: function () { return true; },
    isOwner: function () { return true; },
    id: async function () { return 'web'; }
  };

  var dbPromise = null;
  window.claude = {
    use: async function (name) {
      if (name === 'db') {
        if (!dbPromise) dbPromise = (cfg ? firebaseDb() : Promise.resolve(localDb())).catch(function () { return null; });
        return dbPromise;
      }
      if (name === 'downloads') return downloads;
      if (name === 'user') return user;
      return null;
    }
  };
})();