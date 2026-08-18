/* =========================================================
   KONFIGURASI JSONBIN — WAJIB DIISI SEBELUM DIGUNAKAN
   1. Buat akun gratis di https://jsonbin.io
   2. Buat BIN BARU (jangan pakai bin milik undangan lain),
      isi konten awal dengan: []
   3. Salin "Bin ID" dan "X-Master-Key" ke bawah ini
   PENTING: bin di bawah ini masih bin contoh dari template
   sebelumnya. Ganti dengan bin baru milik Anda sendiri agar
   ucapan tamu tidak tercampur dengan undangan lain.
========================================================= */
const JSONBIN_BIN_ID  = "6a83b408f5f4af5e29226cd5";
const JSONBIN_API_KEY = "$2a$10$nou5c3yZntdxwBqnGEEOvuCkZpg9GT4CfSp1IXgNhJpKQzhxI8NYO";
const JSONBIN_URL     = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

/* ================= NAMA TAMU DARI URL ================= */
(function setGuestName(){
  const params = new URLSearchParams(window.location.search);
  const to = params.get('to');
  if(to){
    document.getElementById('guest-name').textContent = decodeURIComponent(to.replace(/\+/g,' '));
  }
})();

/* ================= EFEK DAUN BERGUGURAN ================= */
(function initLeaves(){
  const container = document.getElementById('leaf-container');
  if(!container) return;
  const jumlah = window.innerWidth < 500 ? 22 : 40;

  // Beberapa bentuk daun SVG sederhana, monokrom (menyesuaikan tema hitam & putih)
  const leafShapes = [
    `<svg viewBox="0 0 32 32" width="1em" height="1em"><path d="M16 2C8 8 4 16 8 24c2 4 6 6 8 6s6-2 8-6c4-8 0-16-8-22Z" fill="currentColor" opacity="0.85"/><path d="M16 4v24" stroke="rgba(255,255,255,.35)" stroke-width="1"/></svg>`,
    `<svg viewBox="0 0 32 32" width="1em" height="1em"><path d="M16 3C6 10 6 22 16 29 26 22 26 10 16 3Z" fill="currentColor" opacity="0.8"/><path d="M16 5v22" stroke="rgba(255,255,255,.3)" stroke-width="1"/></svg>`,
    `<svg viewBox="0 0 32 32" width="1em" height="1em"><path d="M4 16c6-10 16-13 24-11-2 9-9 17-19 18-3-2-5-4-5-7Z" fill="currentColor" opacity="0.8"/></svg>`
  ];

  for(let i = 0; i < jumlah; i++){
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.innerHTML = leafShapes[Math.floor(Math.random() * leafShapes.length)];

    const left = Math.random() * 100;
    const size = (Math.random() * 14 + 12).toFixed(1);
    const duration = (Math.random() * 8 + 10).toFixed(1);
    const delay = (Math.random() * duration).toFixed(1);
    const drift1 = (Math.random() * 70 - 35).toFixed(0);
    const drift2 = (Math.random() * 70 - 35).toFixed(0);
    const opacity = (Math.random() * 0.45 + 0.4).toFixed(2);
    // warna daun bervariasi antara hitam pekat dan abu-abu, sesuai tema
    const tones = ['#1c1c1a', '#3a3a36', '#54534d', '#0a0a0a'];
    const tone = tones[Math.floor(Math.random() * tones.length)];

    leaf.style.left = left + '%';
    leaf.style.fontSize = size + 'px';
    leaf.style.color = tone;
    leaf.style.opacity = opacity;
    leaf.style.animationDuration = duration + 's';
    leaf.style.animationDelay = '-' + delay + 's';
    leaf.style.setProperty('--drift1', drift1 + 'px');
    leaf.style.setProperty('--drift2', drift2 + 'px');

    container.appendChild(leaf);
  }
})();

/* ================= BURUNG MERPATI MEMBAWA MAWAR ================= */
(function initDoves(){
  const container = document.getElementById('dove-container');
  if(!container) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  // SVG merpati (tampak samping, sayap terpisah agar bisa "mengepak")
  // beserta setangkai mawar merah kecil di paruhnya.
  const doveSVG = `
  <svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <!-- sayap belakang (lebih redup, memberi kedalaman) -->
    <g class="dove-wing wing-back">
      <path d="M64,48 C54,28 34,16 12,18 C28,25 40,33 46,42 C52,37 60,39 64,48 Z"
            fill="#efeee9" stroke="#cfcdc4" stroke-width="1"/>
    </g>
    <!-- ekor -->
    <polygon points="24,54 4,44 10,58 2,68 24,63" fill="#fdfdfb" stroke="#d8d6cf" stroke-width="1"/>
    <!-- badan -->
    <path d="M20,58 C15,50 18,42 28,40 C40,38 55,40 66,46 C74,40 84,36 94,38
             C100,40 104,44 106,48 C102,52 96,54 90,52 C82,58 68,64 50,64
             C38,66 26,66 20,58 Z" fill="#fdfdfb" stroke="#d8d6cf" stroke-width="1.2"/>
    <!-- kepala -->
    <circle cx="100" cy="42" r="9" fill="#fdfdfb" stroke="#d8d6cf" stroke-width="1.1"/>
    <circle cx="103" cy="39.5" r="1.3" fill="#2a2a27"/>
    <!-- paruh -->
    <polygon points="108,42 121,45 108,49" fill="#c9a24a"/>
    <!-- tangkai mawar dari paruh -->
    <path d="M110,46 Q116,49 121,45" stroke="#4a5d3a" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <ellipse cx="112.5" cy="49.5" rx="3.2" ry="1.6" fill="#3f6b3f" transform="rotate(30 112.5 49.5)"/>
    <!-- kuntum mawar merah -->
    <ellipse cx="122" cy="41" rx="4" ry="3" fill="#9c1330" transform="rotate(-20 122 41)"/>
    <ellipse cx="128" cy="42.5" rx="4" ry="3" fill="#c81f3c" transform="rotate(25 128 42.5)"/>
    <ellipse cx="124.5" cy="46" rx="4" ry="3" fill="#a10f28" transform="rotate(5 124.5 46)"/>
    <ellipse cx="123.5" cy="43" rx="3" ry="2.4" fill="#e0335a"/>
    <!-- sayap depan (utama, animasi mengepak) -->
    <g class="dove-wing wing-front">
      <path d="M66,46 C58,25 40,12 15,14 C30,22 42,30 50,40 C55,35 62,38 66,46 Z"
            fill="#ffffff" stroke="#d8d6cf" stroke-width="1.2"/>
    </g>
  </svg>`;

  function spawnDove(){
    const dove = document.createElement('div');
    dove.className = 'dove-fly';
    if(Math.random() < 0.5) dove.classList.add('dove-reverse');
    dove.innerHTML = doveSVG;

    const size = (Math.random() * 40 + 70).toFixed(0); // 70–110px
    const top = (Math.random() * 55 + 5).toFixed(1); // 5%–60% tinggi layar
    const duration = (Math.random() * 6 + 16).toFixed(1); // 16–22 detik melintas

    dove.style.width = size + 'px';
    dove.style.top = top + 'vh';
    dove.style.animationDuration = duration + 's';

    container.appendChild(dove);
    dove.addEventListener('animationend', () => dove.remove());

    // Jadwalkan merpati berikutnya setelah jeda acak, supaya terasa
    // alami dan tidak mengganggu (sesekali muncul saat tamu scroll).
    const nextDelay = (Math.random() * 9000 + 9000); // 9–18 detik
    setTimeout(spawnDove, nextDelay);
  }

  // Kemunculan pertama diberi sedikit jeda setelah undangan dibuka.
  setTimeout(spawnDove, 3500);
})();

/* ================= TIRAI / OPENING SCREEN ================= */
const openingScreen = document.getElementById('opening-screen');
const btnOpen = document.getElementById('btn-open');
const invitation = document.getElementById('invitation');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

btnOpen.addEventListener('click', () => {
  // Tampilkan panel tirai (kondisi tertutup) tepat saat tombol diklik
  openingScreen.classList.add('curtain-active');

  // Paksa reflow lalu di frame berikutnya trigger animasi tirai terbuka
  void openingScreen.offsetWidth;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      openingScreen.classList.add('open');
    });
  });

  music.play().catch(()=>{});
  musicToggle.classList.add('spin');

  setTimeout(() => {
    openingScreen.classList.add('hidden');
    document.body.classList.remove('lock');
    invitation.classList.add('show');
    startCountdown();
  }, 1500);
});

musicToggle.addEventListener('click', () => {
  if(music.paused){
    music.play().catch(()=>{});
    musicToggle.classList.add('spin');
  }else{
    music.pause();
    musicToggle.classList.remove('spin');
  }
});

/* ================= COUNTDOWN ================= */
/* Pemberkatan: Jumat, 11 September 2026, pukul 15:00 WITA (UTC+8) */
const WEDDING_DATE = new Date("2026-09-11T15:00:00+08:00").getTime();
function startCountdown(){
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
function updateCountdown(){
  const now = new Date().getTime();
  const diff = WEDDING_DATE - now;
  if(diff <= 0){
    document.getElementById('countdown').innerHTML = '<div style="min-width:auto"><span>Selamat Menempuh Hidup Baru</span></div>';
    return;
  }
  const hari = Math.floor(diff/(1000*60*60*24));
  const jam = Math.floor((diff/(1000*60*60))%24);
  const menit = Math.floor((diff/(1000*60))%60);
  const detik = Math.floor((diff/1000)%60);
  document.getElementById('cd-hari').textContent = String(hari).padStart(2,'0');
  document.getElementById('cd-jam').textContent = String(jam).padStart(2,'0');
  document.getElementById('cd-menit').textContent = String(menit).padStart(2,'0');
  document.getElementById('cd-detik').textContent = String(detik).padStart(2,'0');
}

/* ================= GALERI FOTO (20 FOTO) ================= */
const galleryGrid = document.getElementById('gallery-grid');
const totalFoto = 20;
const fotoList = [];
for(let i=1;i<=totalFoto;i++){
  fotoList.push(`Foto${i}.jpg`);
  const img = document.createElement('img');
  img.src = `Foto${i}.jpg`;
  img.alt = `Momen ${i}`;
  img.loading = 'lazy';
  img.dataset.index = i-1;
  img.style.setProperty('--gi', (i-1) % 4);
  galleryGrid.appendChild(img);
}

/* ================= LIGHTBOX ================= */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
let currentIndex = 0;

galleryGrid.addEventListener('click', (e) => {
  if(e.target.tagName === 'IMG'){
    currentIndex = parseInt(e.target.dataset.index);
    openLightbox();
  }
});
function openLightbox(){
  lbImg.src = fotoList[currentIndex];
  lightbox.classList.add('show');
}
document.getElementById('lb-close').addEventListener('click', () => lightbox.classList.remove('show'));
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('show'); });
document.getElementById('lb-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalFoto) % totalFoto;
  openLightbox();
});
document.getElementById('lb-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalFoto;
  openLightbox();
});

/* ================= SALIN NOMOR REKENING ================= */
document.querySelectorAll('.btn-copy').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      const original = btn.textContent;
      btn.textContent = 'Tersalin!';
      setTimeout(() => btn.textContent = original, 1500);
    });
  });
});

/* ================= ANIMASI TULISAN: SPLIT PER HURUF ================= */
(function splitTitles(){
  document.querySelectorAll('[data-split]').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    let delay = 0;
    text.split('').forEach(ch => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.transitionDelay = delay + 'ms';
      delay += 28;
      el.appendChild(span);
    });
  });
})();

/* ================= ANIMASI SAAT SCROLL (Intersection Observer) ================= */
function initScrollReveal(){
  const targets = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-word, .split-title, .reveal-frame, .gallery-grid img, .section-reveal'
  );
  if(!('IntersectionObserver' in window)){
    targets.forEach(t => t.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(t => observer.observe(t));
}
// Jalankan sejak halaman dimuat, supaya teks di opening screen
// (eyebrow & nama tamu) juga ikut muncul dengan animasi, bukan hanya
// elemen yang ada setelah undangan utama dibuka.
initScrollReveal();

/* ================= UCAPAN & DOA (JSONBIN) ================= */
const ucapanList = document.getElementById('ucapan-list');
const btnKirim = document.getElementById('btn-kirim');

// Helper: ambil pesan error yang jelas dari response JSONBin yang gagal
async function baca_pesan_error(res){
  try{
    const data = await res.json();
    return data.message || `HTTP ${res.status}`;
  }catch(e){
    return `HTTP ${res.status} ${res.statusText}`;
  }
}

// Mengambil daftar ucapan. Jika gagal, method ini akan MELEMPAR error
// (tidak diam-diam mengembalikan array kosong), supaya proses kirim
// tidak pernah menimpa data lama dengan data kosong.
async function ambilUcapanRaw(){
  const res = await fetch(`${JSONBIN_URL}/latest`, {
    method: 'GET',
    headers: { 'X-Master-Key': JSONBIN_API_KEY }
  });
  if(!res.ok){
    const pesan = await baca_pesan_error(res);
    throw new Error(`Gagal mengambil data ucapan (${pesan}). Periksa JSONBIN_BIN_ID / JSONBIN_API_KEY di script.js.`);
  }
  const data = await res.json();
  return Array.isArray(data.record) ? data.record : [];
}

// Dipakai untuk menampilkan daftar ucapan saat halaman dibuka.
// Boleh gagal secara "lunak" (tampilkan pesan), karena ini hanya untuk tampilan.
async function ambilUcapan(){
  try{
    const list = await ambilUcapanRaw();
    renderUcapan(list);
    return list;
  }catch(err){
    console.error('[Ucapan] Gagal memuat:', err);
    ucapanList.innerHTML = `<div class="ucapan-empty">Belum bisa memuat ucapan.<br><small>${escapeHtml(err.message)}</small></div>`;
    return [];
  }
}

function renderUcapan(list){
  if(!list.length){
    ucapanList.innerHTML = '<div class="ucapan-empty">Jadilah yang pertama memberi ucapan &amp; doa 💌</div>';
    return;
  }
  ucapanList.innerHTML = list.slice().reverse().map(u => `
    <div class="ucapan-item">
      <span class="nama">${escapeHtml(u.nama)}</span><span class="status">${escapeHtml(u.status)}</span>
      <div class="pesan">${escapeHtml(u.pesan)}</div>
    </div>
  `).join('');
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

btnKirim.addEventListener('click', async () => {
  const nama = document.getElementById('in-nama').value.trim();
  const status = document.getElementById('in-status').value;
  const pesan = document.getElementById('in-pesan').value.trim();

  if(!nama || !pesan){
    alert('Mohon isi nama dan ucapan terlebih dahulu.');
    return;
  }

  btnKirim.disabled = true;
  btnKirim.textContent = 'Mengirim...';

  try{
    // 1) Ambil data ucapan yang sudah ada. Jika ini gagal, HENTIKAN proses
    //    (jangan lanjut kirim), supaya data lama tidak tertimpa/hilang.
    const list = await ambilUcapanRaw();
    list.push({ nama, status, pesan, waktu: new Date().toISOString() });

    // 2) Simpan kembali daftar yang sudah ditambah ucapan baru.
    const resPut = await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY,
        'X-Bin-Versioning': 'false'
      },
      body: JSON.stringify(list)
    });

    if(!resPut.ok){
      const pesanError = await baca_pesan_error(resPut);
      throw new Error(`Gagal menyimpan ucapan (${pesanError}). Periksa JSONBIN_BIN_ID / JSONBIN_API_KEY di script.js.`);
    }

    document.getElementById('in-nama').value = '';
    document.getElementById('in-pesan').value = '';
    renderUcapan(list);
  }catch(err){
    console.error('[Ucapan] Gagal mengirim:', err);
    alert('Gagal mengirim ucapan.\n\nDetail: ' + err.message + '\n\n(Buka Console browser dengan F12 untuk detail lengkap)');
  }finally{
    btnKirim.disabled = false;
    btnKirim.textContent = 'Kirim Ucapan';
  }
});

ambilUcapan();
