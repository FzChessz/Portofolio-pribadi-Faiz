// 1. TOGGLE MENU MOBILE RESPONSIF
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Tutup menu otomatis saat link diklik di layar mobile
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// 2. DATA & RENDER PROYEK (Tema Luar Angkasa + Relevan Jurusan TKJ & Web)
const projects = [
  {
    id: 1,
    missionCode: "MISI #01",
    title: "Sistem Inventaris Lab TKJ",
    category: "web",
    categoryLabel: "Web App",
    icon: "🛰️",
    gradient: "from-indigo-600/40 via-blue-600/20 to-slate-900",
    tech: ["HTML5", "Tailwind CSS", "JavaScript"],
    summary: "Aplikasi pencatatan peminjaman perangkat router, switch, dan alat praktik laboratorium.",
    detail: "Dibangun untuk mempermudah pengelolaan inventaris perangkat jaringan dan komputer di laboratorium SMKN 1 Kota Blitar. Dilengkapi fitur pencarian cepat dan status ketersediaan barang."
  },
  {
    id: 2,
    missionCode: "MISI #02",
    title: "Simulasi Topologi Jaringan Kampus",
    category: "network",
    categoryLabel: "Jaringan / TKJ",
    icon: "🌐",
    gradient: "from-cyan-600/40 via-teal-600/20 to-slate-900",
    tech: ["Cisco Packet Tracer", "VLAN", "Routing OSPF"],
    summary: "Perancangan arsitektur jaringan multi-gedung dengan segmentasi VLAN dan keamanan DHCP.",
    detail: "Merancang konektivitas antar gedung menggunakan protokol OSPF dinamis, pembagian subnet IPv4 yang efisien, serta konfigurasi VLAN untuk memisahkan trafik server dan klien."
  },
  {
    id: 3,
    missionCode: "MISI #03",
    title: "OrbitEdu — Aplikasi Astronomi",
    category: "ui",
    categoryLabel: "UI/UX",
    icon: "🪐",
    gradient: "from-purple-600/40 via-fuchsia-600/20 to-slate-900",
    tech: ["Figma", "Design System", "Prototyping"],
    summary: "Purwarupa desain aplikasi edukasi tata surya interaktif dengan tampilan mode gelap.",
    detail: "Merancang alur pengguna (user flow), wireframe, hingga prototipe interaktif bertema luar angkasa yang ramah di mata dan mudah dinavigasi oleh pelajar."
  }
];

const projectGrid = document.getElementById('projectGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderProjects(filter = 'all') {
  if (!projectGrid) return;
  projectGrid.innerHTML = '';

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  filtered.forEach(project => {
    const techBadges = project.tech
      .map(t => `<span class="px-2.5 py-0.5 rounded bg-slate-950/90 border border-slate-800 text-[11px] text-indigo-300">${t}</span>`)
      .join('');

    const card = document.createElement('article');
    card.className = 'cosmic-card project-animate group rounded-2xl border border-indigo-500/20 bg-slate-900/70 backdrop-blur-sm overflow-hidden flex flex-col justify-between';
    card.innerHTML = `
      <div>
        <!-- Banner Visual Atas Kartu -->
        <div class="h-36 bg-gradient-to-br ${project.gradient} p-5 relative flex flex-col justify-between border-b border-slate-800/80">
          <div class="flex justify-between items-center">
            <span class="text-[11px] font-mono tracking-widest text-indigo-300/80 bg-slate-950/60 px-2.5 py-1 rounded-md border border-indigo-500/20">
              ${project.missionCode}
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/70 text-cyan-300 border border-cyan-500/30">
              ${project.categoryLabel}
            </span>
          </div>
          <div class="text-5xl transform group-hover:scale-110 group-hover:rotate-6 transition duration-300 self-end">
            ${project.icon}
          </div>
        </div>

        <!-- Konten Kartu -->
        <div class="p-6">
          <h3 class="font-['Space_Grotesk'] text-xl font-bold text-white group-hover:text-indigo-400 transition mb-2">
            ${project.title}
          </h3>
          <p class="text-slate-400 text-sm leading-relaxed mb-4">
            ${project.summary}
          </p>
          <div class="flex flex-wrap gap-1.5">
            ${techBadges}
          </div>
        </div>
      </div>

      <!-- Footer Kartu -->
      <div class="px-6 py-4 bg-slate-950/40 border-t border-slate-800/80 flex items-center justify-between">
        <span class="text-xs text-slate-500 flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Selesai
        </span>
        <button onclick="openProjectModal(${project.id})" class="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-600 px-3.5 py-2 rounded-lg transition">
          Buka Log Misi <span>&rarr;</span>
        </button>
      </div>
    `;
    projectGrid.appendChild(card);
  });
}

// Event Listener Filter Kategori
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('active', 'bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/20');
      b.classList.add('text-slate-300');
    });
    btn.classList.add('active', 'bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/20');
    btn.classList.remove('text-slate-300');
    renderProjects(btn.dataset.filter);
  });
});

// Jalankan render pertama kali
renderProjects();

// 3. MODAL DETAIL PROYEK
const projectModal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

window.openProjectModal = function(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;

  modalContent.innerHTML = `
    <div class="text-4xl mb-3">${project.icon}</div>
    <span class="text-xs font-semibold text-indigo-400 uppercase tracking-wider">${project.categoryLabel}</span>
    <h3 class="font-['Space_Grotesk'] text-2xl font-bold text-white mt-1 mb-3">${project.title}</h3>
    <p class="text-slate-300 text-sm leading-relaxed mb-4">${project.detail}</p>
    <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
      <strong class="text-slate-200">Teknologi:</strong> ${project.tech}
    </div>
  `;
  projectModal.classList.remove('hidden');
  projectModal.classList.add('flex');
};

closeModal.addEventListener('click', () => {
  projectModal.classList.add('hidden');
  projectModal.classList.remove('flex');
});

projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
  }
});

// 4. VALIDASI FORM KONTAK INTERAKTIF
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const message = document.getElementById('senderMessage').value.trim();

  formFeedback.classList.remove('hidden', 'text-rose-400', 'text-emerald-400');

  if (!name || !email || !message) {
    formFeedback.textContent = "⚠️ Harap lengkapi seluruh kolom transmisi sebelum mengirim.";
    formFeedback.classList.add('text-rose-400');
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    formFeedback.textContent = "⚠️ Format alamat email tidak valid.";
    formFeedback.classList.add('text-rose-400');
    return;
  }

  formFeedback.textContent = `✅ Transmisi berhasil dikirim! Terima kasih, ${name}.`;
  formFeedback.classList.add('text-emerald-400');
  contactForm.reset();
});

// 5. EFEK LATAR BELAKANG BINTANG BERGERAK (CANVAS)
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.3 + 0.05
  }));
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#c7d2fe';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y -= star.speed;
    if (star.y < 0) star.y = canvas.height;
  });
  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', initStars);
initStars();
animateStars();