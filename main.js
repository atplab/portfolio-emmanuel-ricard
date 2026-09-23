// ── Data ──────────────────────────────────────────────────────────────────────
const TOOLS = [
  { name:"Figma",                 level:"mastered" },
  { name:"DaVinci Resolve",       level:"mastered" },
  { name:"OBS Studio",            level:"mastered" },
  { name:"Power Director mobile", level:"mastered" },
  { name:"Logopit Plus",          level:"mastered" },
  { name:"Youtube Studio",        level:"intermediate" },
  { name:"Github",                level:"intermediate" },
  { name:"Teams",                 level:"intermediate" },
  { name:"Wix",                   level:"intermediate" },
  { name:"Unity",                 level:"intermediate" },
  { name:"Twitch Dashboard",      level:"intermediate" },
  { name:"Photoshop",             level:"intermediate" },
  { name:"Visual Studio Code",    level:"intermediate" },
  { name:"Reaper",                level:"intermediate" },
  { name:"Wordpress",             level:"intermediate" },
  { name:"Powerpoint",            level:"beginner" },
  { name:"Touch Designer",        level:"beginner" },
  { name:"Lightroom",             level:"beginner" },
  { name:"Jira",                  level:"beginner" },
  { name:"Excel",                 level:"beginner" },
  { name:"Maya",                  level:"beginner" },
];
const PROJECTS = [
  { id:1, title:"CHEQA", cat:"Print", year:"2025-2026", desc:"Maquette d'application et design de marque.", grad:"linear-gradient(135deg,#10b981,#14b8a6,#22d3ee)", accent:"#7ff0e4", hasPage:false },
  { id:2, title:"This Is Why We Jump", cat:"Jeu vidéo", year:"2025", desc:"Jeu de plateforme 2D réalisé en solo sous Godot — 3 niveaux, game-feel soigné.", grad:"linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)", accent:"#c4a8ff", hasPage:true },
  { id:3, title:"Space in Between", cat:"UI/UX", year:"2025", desc:"Conception d'un jeu interactif en réalité virtuelle. ", grad:"linear-gradient(135deg,#4f46e5,#3b82f6,#7c3aed)", accent:"#a8c4ff", hasPage:false },
  { id:4, title:"Kombucha Vibe", cat:"Packaging", year:"2025", desc:"Conception d'un site internet pour une marque.", grad:"linear-gradient(135deg,#fb923c,#ec4899,#f43f5e)", accent:"#ffb89a", hasPage:false },
  { id:5, title:"Publicité Proton", cat:"Motion", year:"2023", desc:"Conception de publicités pour réseaux sociaux", grad:"linear-gradient(135deg,#facc15,#fb923c,#ef4444)", accent:"#ffe08a", hasPage:false },
  { id:6, title:"Éditorial — Revista", cat:"Éditorial", year:"2023", desc:"Direction artistique d'un magazine culturel bilingue. Mise en page audacieuse.", grad:"linear-gradient(135deg,#ec4899,#fb7185,#fdba74)", accent:"#ffb8d4", hasPage:false },
];
const PROJECT_DETAIL = {
  nom:"This Is Why We Jump", cours:"Interactivité Ludique",
  mention:"Réalisation d'un jeu vidéo de plateforme", equipe:"Individuel",
  roles:"Level Designer · Création des niveaux · Concept du jeu", logiciels:"Godot",
  categorie:"Conception et programmation d'un jeu vidéo",
  resumé:"Conception complète d'un jeu de plateforme en solo, de l'idéation à la livraison de trois niveaux jouables.",
  descProf:"Le but du projet était de créer un jeu vidéo contenant 3 niveaux. Le type de jeu était libre.",
  descPerso:"J'ai conçu un jeu de plateforme en 2D dans Godot, en me concentrant sur le game-feel des sauts et le design progressif des niveaux. Chaque niveau introduit une nouvelle mécanique pour garder le joueur engagé.",
  lien:"https://eureka-altima.itch.io/this-is-why-we-jump",
  youtubeId:"QjrEutFNhsg",
  heroImg:"https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1400&h=700&fit=crop&auto=format",
  images:[
    "https://images.unsplash.com/photo-1780193724876-7ca5083d1004?w=900&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1556438064-2d7646166914?w=900&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&h=500&fit=crop&auto=format",
  ],
};

// ── Stars ─────────────────────────────────────────────────────────────────────
const starsEl = document.getElementById('stars');
for(let i=0;i<120;i++){
  const s = document.createElement('div');
  s.className = 'star';
  s.style.cssText = `left:${(i*137.508)%100}%;top:${(i*97.3)%100}%;width:${(i%3)+.5}px;height:${(i%3)+.5}px;opacity:${.1+(i%6)*.08}`;
  starsEl.appendChild(s);
}

// ── Tools ─────────────────────────────────────────────────────────────────────
const CATS = [
  { key:"mastered",     label:"Maîtrise",     color:"var(--lavender)" },
  { key:"intermediate", label:"Intermédiaire", color:"var(--mint)" },
  { key:"beginner",     label:"Bases",         color:"var(--peach)" },
];
const toolsEl = document.getElementById('tools-list');
CATS.forEach(cat => {
  const pills = TOOLS.filter(t => t.level === cat.key).map(t => `<div class="tool-pill ${cat.key} bubble">${t.name}</div>`).join('');
  toolsEl.insertAdjacentHTML('beforeend', `
    <div class="tools-category">
      <div class="tools-category-header">
        <span class="tools-category-label" style="color:${cat.color}">${cat.label}</span>
        <div class="tools-category-line"></div>
      </div>
      <div class="tools-pills">${pills}</div>
    </div>`);
});

// ── Projects ──────────────────────────────────────────────────────────────────
const grid = document.getElementById('projects-grid');
PROJECTS.forEach(p => {
  const card = document.createElement('div');
  card.className = 'proj-card';
  card.innerHTML = `
    <div class="proj-card-bg" style="background:${p.grad}"></div>
    <div class="proj-card-dark"></div>
    <div class="proj-card-glow" style="background:radial-gradient(circle,${p.accent}88,transparent)"></div>
    <div class="proj-card-body">
      <div class="proj-card-top">
        <span class="proj-cat" style="background:${p.accent}22;color:${p.accent};border:1px solid ${p.accent}44">${p.cat}</span>
        <span class="proj-year">${p.year}</span>
      </div>
      <div><div class="proj-title">${p.title}</div><div class="proj-desc">${p.desc}</div></div>
      <div class="proj-link">${p.hasPage ? 'Voir le projet <span class="proj-arrow">→</span>' : 'Bientôt disponible'}</div>
    </div>`;
  const glow = card.querySelector('.proj-card-glow');
  const link = card.querySelector('.proj-link');
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { scale:1.03, y:-6, duration:.45, ease:'back.out(1.7)' });
    gsap.to(glow, { opacity:1, scale:1.5, duration:.5 });
    gsap.to(link, { color:p.accent, duration:.25 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { scale:1, y:0, duration:.45, ease:'back.out(1.7)' });
    gsap.to(glow, { opacity:0, scale:.5, duration:.5 });
    gsap.to(link, { color:'rgba(255,255,255,0.3)', duration:.25 });
  });
  if(p.hasPage) card.addEventListener('click', openProject);
  grid.appendChild(card);
});

// ── Bubbles ───────────────────────────────────────────────────────────────────
function bindBubbles(root) {
  root.querySelectorAll('.bubble').forEach(el => {
    if(el._b) return; el._b = true;
    el.addEventListener('mouseenter', () => gsap.to(el, { scale:1.09, duration:.3, ease:'back.out(1.7)' }));
    el.addEventListener('mouseleave', () => gsap.to(el, { scale:1,    duration:.3, ease:'back.out(1.7)' }));
  });
}
bindBubbles(document);

// ── Nav ───────────────────────────────────────────────────────────────────────
const navBtns    = document.querySelectorAll('.nav-btn');
const burgerItems = document.querySelectorAll('.burger-item');
const burgerBtn  = document.getElementById('burger-btn');
const burgerMenu = document.getElementById('burger-menu');
let navLock = false;
let navLockTimer = null;

function setActiveNav(target) {
  navBtns.forEach(b => { if(b.dataset.target) b.classList.toggle('active', b.dataset.target === target); });
  burgerItems.forEach(b => b.classList.toggle('active', b.dataset.target === target));
}

function lockNavState() {
  navLock = true;
  clearTimeout(navLockTimer);
  navLockTimer = setTimeout(() => { navLock = false; }, 700);
}

navBtns.forEach(btn => btn.addEventListener('click', () => {
  setActiveNav(btn.dataset.target);
  lockNavState();
  scrollToId(btn.dataset.target);
}));

burgerItems.forEach(btn => btn.addEventListener('click', () => {
  setActiveNav(btn.dataset.target);
  lockNavState();
  scrollToId(btn.dataset.target);
  burgerBtn.classList.remove('open');
  burgerMenu.classList.remove('open');
}));

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('open');
  burgerMenu.classList.toggle('open');
});

document.getElementById('page-home').addEventListener('scroll', function() {
  if(navLock) return;
  const st = this.scrollTop;
  ['hero','work','skills','about','contact'].forEach(id => {
    const el = document.getElementById(id);
    if(el && el.offsetTop - 120 <= st && el.offsetTop + el.offsetHeight > st) setActiveNav(id);
  });
}, { passive:true });

function scrollToId(id) {
  const target = document.getElementById(id);
  const container = document.getElementById('page-home');

  console.log('Scrolling to:', id, target, container);

  if (!target) return;

  if (container && container.contains(target)) {
    container.scrollTo({
      top: target.offsetTop - 20,
      behavior: 'smooth'
    });
    return;
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Project Switcher ──────────────────────────────────────────────────────────
const switcherMenu = document.getElementById('proj-switcher-menu');
const switcherBtn  = document.getElementById('proj-switcher-btn');

PROJECTS.forEach(p => {
  const card = document.createElement('div');
  card.className = 'switcher-card';
  card.innerHTML = `
    <div class="switcher-thumb"><div class="switcher-thumb-bg" style="background:${p.grad}"></div><div class="switcher-thumb-overlay"></div></div>
    <div class="switcher-info"><div class="switcher-cat" style="color:${p.accent}">${p.cat}</div><div class="switcher-title">${p.title}</div></div>
    <span class="switcher-badge" style="${p.hasPage ? '' : 'opacity:.4'}">${p.hasPage ? 'Voir →' : 'Bientôt'}</span>`;
  if(p.hasPage) card.addEventListener('click', () => { switcherMenu.classList.remove('open'); openProject(); });
  document.getElementById('proj-switcher-list').appendChild(card);
});

switcherBtn.addEventListener('click', e => { e.stopPropagation(); switcherMenu.classList.toggle('open'); });
document.addEventListener('click', () => switcherMenu.classList.remove('open'));
switcherMenu.addEventListener('click', e => e.stopPropagation());

// ── Page transitions ──────────────────────────────────────────────────────────
let busy = false;
const homeEl    = document.getElementById('page-home');
const projEl    = document.getElementById('page-project');
const navEl     = document.getElementById('bottom-nav');
const projNavEl = document.getElementById('proj-nav');

function openProject() {
  if(busy) return; busy = true;
  fillProject();
  gsap.timeline({ onComplete: () => { busy=false; bindBubbles(projEl); } })
    .to([homeEl, navEl], { opacity:0, y:-18, duration:.22, ease:'power2.in' })
    .call(() => {
      homeEl.classList.add('hidden'); navEl.style.display = 'none';
      burgerBtn.style.display = 'none'; burgerMenu.classList.remove('open'); burgerBtn.classList.remove('open');
      projEl.classList.remove('hidden'); projEl.scrollTop = 0; projNavEl.style.display = 'flex';
      gsap.set(projEl, { opacity:0, y:28 }); gsap.set(projNavEl, { opacity:0, y:20 });
    })
    .to(projEl,    { opacity:1, y:0, duration:.42, ease:'power3.out' })
    .to(projNavEl, { opacity:1, y:0, duration:.35, ease:'back.out(1.5)' }, '-=.2');
}

function goHome() {
  if(busy) return; busy = true;
  gsap.timeline({ onComplete: () => { busy=false; } })
    .to([projEl, projNavEl], { opacity:0, y:-18, duration:.22, ease:'power2.in' })
    .call(() => {
      projEl.classList.add('hidden'); projNavEl.style.display = 'none';
      homeEl.classList.remove('hidden'); navEl.style.display = 'flex'; burgerBtn.style.display = '';
      gsap.set([homeEl, navEl], { opacity:0, y:28 });
    })
    .to(homeEl, { opacity:1, y:0, duration:.42, ease:'power3.out' })
    .to(navEl,  { opacity:1, y:0, duration:.35, ease:'back.out(1.5)' }, '-=.2');
}

document.getElementById('proj-nav-back').addEventListener('click', goHome);

// ── Carousel ──────────────────────────────────────────────────────────────────
let carouselTimer = null;

function initCarousel(images) {
  const wrap  = document.getElementById('ph-carousel');
  const track = document.getElementById('carousel-track');
  const dots  = document.getElementById('carousel-dots');
  clearInterval(carouselTimer);
  track.innerHTML = dots.innerHTML = '';
  if(!images?.length) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  let idx = 0;

  images.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `<img src="${src}" alt=""/><div class="carousel-slide-overlay"></div>`;
    slide.querySelector('img').addEventListener('click', () => openLightbox(images, i));
    track.appendChild(slide);
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goTo(i);
    dots.appendChild(dot);
  });

  function goTo(i) {
    idx = (i + images.length) % images.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.querySelectorAll('.carousel-dot').forEach((d, j) => d.classList.toggle('active', j === idx));
  }

  function resetTimer() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => goTo(idx + 1), 4000);
  }

  document.getElementById('carousel-prev').onclick = () => { goTo(idx - 1); resetTimer(); };
  document.getElementById('carousel-next').onclick = () => { goTo(idx + 1); resetTimer(); };
  resetTimer();
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function openLightbox(images, start) {
  let i = start;
  const lb  = document.createElement('div'); lb.id = 'lightbox';
  const img = document.createElement('img');
  const prev = document.createElement('button'); prev.className = 'lb-arrow lb-prev'; prev.textContent = '‹';
  const next = document.createElement('button'); next.className = 'lb-arrow lb-next'; next.textContent = '›';

  function show() { img.src = images[i]; }

  img.addEventListener('click', e => e.stopPropagation());
  prev.addEventListener('click', e => { e.stopPropagation(); i = (i - 1 + images.length) % images.length; show(); });
  next.addEventListener('click', e => { e.stopPropagation(); i = (i + 1) % images.length; show(); });
  lb.addEventListener('click', e => { if (e.target === lb) lb.remove(); });

  lb.append(prev, img, next);
  document.body.appendChild(lb);
  show();
  requestAnimationFrame(() => lb.classList.add('open'));
}

// ── Fill project ──────────────────────────────────────────────────────────────
function fillProject() {
  const p = PROJECT_DETAIL;
  document.getElementById('ph-img').src           = p.heroImg;
  document.getElementById('ph-cat').textContent   = p.categorie;
  document.getElementById('ph-label').textContent = `✦ Projet — ${p.cours}`;
  document.getElementById('ph-title').textContent = p.nom;
  document.getElementById('ph-resumé').innerHTML  = `<span class="resumé-label">Résumé — </span>${p.resumé}`;
  document.getElementById('ph-link').href         = p.lien;
  document.getElementById('ph-prof').innerHTML    = `<p>${p.descProf}</p>`;
  document.getElementById('ph-perso').innerHTML   = `<p>${p.descPerso}</p>`;

  const videoWrap = document.getElementById('ph-video-wrap');
  document.getElementById('ph-video').src = p.youtubeId ? `https://www.youtube.com/embed/${p.youtubeId}` : '';
  videoWrap.style.display = p.youtubeId ? 'block' : 'none';

  document.getElementById('ph-meta').innerHTML = [
    {label:"Mention",   value:p.mention},
    {label:"Cours",     value:p.cours},
    {label:"Format",    value:p.equipe},
    {label:"Rôle(s)",   value:p.roles},
    {label:"Logiciel(s)",  value:p.logiciels},
    {label:"Catégorie", value:p.categorie},
  ].map(m => `<div class="meta-card bubble"><div class="meta-lbl">${m.label}</div><div class="meta-val">${m.value}</div></div>`).join('');

  initCarousel(p.images);
}

// ── Entrance animations ───────────────────────────────────────────────────────
gsap.from('.hero-badge', { opacity:0, y:20, duration:.6, ease:'power3.out', delay:.2 });
gsap.from('.hero-title', { opacity:0, y:40, duration:.8, ease:'power3.out', delay:.4 });
gsap.from('.hero-sub',   { opacity:0, y:20, duration:.6, ease:'power3.out', delay:.65 });
gsap.from('.hero-btns',  { opacity:0, y:20, duration:.6, ease:'power3.out', delay:.85 });
gsap.from('#bottom-nav', { opacity:0, y:30, duration:.6, ease:'back.out(1.5)', delay:1.1 });
