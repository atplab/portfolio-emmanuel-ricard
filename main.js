gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────
const TOOLS = [
  { name: "Figma",                  level: "mastered" },
  { name: "DaVinci",                level: "mastered" },
  { name: "OBS Studio",             level: "mastered" },
  { name: "Power Director mobile",  level: "mastered" },
  { name: "Github",                 level: "mastered" },
  { name: "Unity",                  level: "intermediate" },
  { name: "Photoshop",              level: "intermediate" },
  { name: "Reaper",                 level: "intermediate" },
  { name: "Wordpress",              level: "intermediate" },
  { name: "Touch Designer",         level: "intermediate" },
  { name: "Lightroom",              level: "beginner" },
  { name: "Jira",                   level: "beginner" },
  { name: "Excel",                  level: "beginner" },
  { name: "Maya",                   level: "beginner" },
];
const PROJECTS = [
  { id:1, title:"This Is Why We Jump",         cat:"Jeu vidéo",  year:"2024", desc:"Jeu de plateforme 2D réalisé en solo sous Godot — 3 niveaux, game-feel soigné.",                         grad:"linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)", accent:"#c4a8ff", hasPage:true  },
  { id:2, title:"Campagne Affichage — Verdure", cat:"Print",      year:"2024", desc:"Série d'affiches pour une marque écoresponsable. Contraste fort, typographie monumentale.",             grad:"linear-gradient(135deg,#10b981,#14b8a6,#22d3ee)", accent:"#7ff0e4", hasPage:false },
  { id:3, title:"App UI — Noctua",              cat:"UI/UX",      year:"2023", desc:"Interface d'une application de méditation nocturne. Dark mode sensoriel, micro-animations.",            grad:"linear-gradient(135deg,#4f46e5,#3b82f6,#7c3aed)", accent:"#a8c4ff", hasPage:false },
  { id:4, title:"Packaging — Solara",           cat:"Packaging",  year:"2023", desc:"Conception d'emballages premium pour une ligne de cosmétiques naturels.",                               grad:"linear-gradient(135deg,#fb923c,#ec4899,#f43f5e)", accent:"#ffb89a", hasPage:false },
  { id:5, title:"Motion — Orbis",               cat:"Motion",     year:"2024", desc:"Série de boucles animées pour réseaux sociaux. Géométries fluides et palette vive.",                    grad:"linear-gradient(135deg,#facc15,#fb923c,#ef4444)", accent:"#ffe08a", hasPage:false },
  { id:6, title:"Éditorial — Revista",          cat:"Éditorial",  year:"2023", desc:"Direction artistique d'un magazine culturel bilingue. Mise en page audacieuse.",                       grad:"linear-gradient(135deg,#ec4899,#fb7185,#fdba74)", accent:"#ffb8d4", hasPage:false },
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
  heroImg:"https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1400&h=700&fit=crop&auto=format",
  secondImg:"https://images.unsplash.com/photo-1780193724876-7ca5083d1004?w=800&h=500&fit=crop&auto=format",
};

// ── Stars ─────────────────────────────────────────────────────────────────────
(function(){
  const c = document.getElementById('stars');
  for(let i=0;i<120;i++){
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `left:${(i*137.508)%100}%;top:${(i*97.3)%100}%;width:${(i%3)+.5}px;height:${(i%3)+.5}px;opacity:${.1+(i%6)*.08}`;
    c.appendChild(s);
  }
})();

// ── Build tools ───────────────────────────────────────────────────────────────
(function(){
  const categories = [
    { key: "mastered",     label: "Maîtrise",       color: "var(--lavender)" },
    { key: "intermediate", label: "Intermédiaire",   color: "var(--mint)" },
    { key: "beginner",     label: "Bases",           color: "var(--peach)" },
  ];
  const container = document.getElementById('tools-list');
  categories.forEach(cat => {
    const tools = TOOLS.filter(t => t.level === cat.key);
    const section = document.createElement('div');
    section.className = 'tools-category';
    section.innerHTML = `
      <div class="tools-category-header">
        <span class="tools-category-label" style="color:${cat.color}">${cat.label}</span>
        <div class="tools-category-line"></div>
      </div>
      <div class="tools-pills">
        ${tools.map(t => `<div class="tool-pill ${cat.key} bubble">${t.name}</div>`).join('')}
      </div>`;
    container.appendChild(section);
  });
})();

// ── Build projects ────────────────────────────────────────────────────────────
(function(){
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
        <div>
          <div class="proj-title">${p.title}</div>
          <div class="proj-desc">${p.desc}</div>
        </div>
        <div class="proj-link" data-accent="${p.accent}">
          ${p.hasPage ? 'Voir le projet <span class="proj-arrow">→</span>' : 'Bientôt disponible'}
        </div>
      </div>`;

    const glow = card.querySelector('.proj-card-glow');
    const link = card.querySelector('.proj-link');

    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale:1.03, y:-6, duration:.45, ease:'back.out(1.7)' });
      gsap.to(glow,  { opacity:1, scale:1.5, duration:.5 });
      gsap.to(link,  { color:p.accent, duration:.25 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale:1, y:0, duration:.45, ease:'back.out(1.7)' });
      gsap.to(glow,  { opacity:0, scale:.5, duration:.5 });
      gsap.to(link,  { color:'rgba(255,255,255,0.3)', duration:.25 });
    });

    if(p.hasPage) card.addEventListener('click', openProject);
    grid.appendChild(card);
  });
})();

// ── Bubble hover ──────────────────────────────────────────────────────────────
function bindBubbles(root){
  root.querySelectorAll('.bubble').forEach(el => {
    if(el._b) return; el._b = true;
    el.addEventListener('mouseenter', () => gsap.to(el,{ scale:1.09, duration:.3, ease:'back.out(1.7)' }));
    el.addEventListener('mouseleave', () => gsap.to(el,{ scale:1,    duration:.3, ease:'back.out(1.7)' }));
  });
}
bindBubbles(document);

// ── Nav ───────────────────────────────────────────────────────────────────────
const navBtns = document.querySelectorAll('.nav-btn');
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const el = document.getElementById(btn.dataset.target);
    if(el) el.scrollIntoView({ behavior:'smooth' });
  });
});

document.getElementById('page-home').addEventListener('scroll', function(){
  const st = this.scrollTop;
  ['hero','about','skills','work','contact'].forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    if(el.offsetTop - 120 <= st && el.offsetTop + el.offsetHeight > st)
      navBtns.forEach(b => b.classList.toggle('active', b.dataset.target === id));
  });
}, { passive:true });

// ── Scroll helper ─────────────────────────────────────────────────────────────
function scrollToId(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({ behavior:'smooth' });
}

// ── Page transitions ──────────────────────────────────────────────────────────
let busy = false;
const homeEl    = document.getElementById('page-home');
const projEl    = document.getElementById('page-project');
const navEl     = document.getElementById('bottom-nav');
const projNavEl = document.getElementById('proj-nav');

function openProject(){
  if(busy) return; busy = true;
  fillProject();
  gsap.timeline({ onComplete: () => { busy=false; bindBubbles(projEl); } })
    .to([homeEl, navEl], { opacity:0, y:-18, duration:.22, ease:'power2.in' })
    .call(() => {
      homeEl.classList.add('hidden');
      navEl.style.display = 'none';
      projEl.classList.remove('hidden');
      projEl.scrollTop = 0;
      projNavEl.style.display = 'block';
      gsap.set(projEl,    { opacity:0, y:28 });
      gsap.set(projNavEl, { opacity:0, y:20 });
    })
    .to(projEl,    { opacity:1, y:0, duration:.42, ease:'power3.out' })
    .to(projNavEl, { opacity:1, y:0, duration:.35, ease:'back.out(1.5)' }, '-=.2');
}

function goHome(){
  if(busy) return; busy = true;
  gsap.timeline({ onComplete: () => { busy=false; } })
    .to([projEl, projNavEl], { opacity:0, y:-18, duration:.22, ease:'power2.in' })
    .call(() => {
      projEl.classList.add('hidden');
      projNavEl.style.display = 'none';
      homeEl.classList.remove('hidden');
      navEl.style.display = 'flex';
      gsap.set([homeEl, navEl], { opacity:0, y:28 });
    })
    .to(homeEl, { opacity:1, y:0, duration:.42, ease:'power3.out' })
    .to(navEl,  { opacity:1, y:0, duration:.35, ease:'back.out(1.5)' }, '-=.2');
}

document.getElementById('proj-nav-back').addEventListener('click', goHome);

// ── Fill project page ─────────────────────────────────────────────────────────
function fillProject(){
  const p = PROJECT_DETAIL;
  document.getElementById('ph-img').src             = p.heroImg;
  document.getElementById('ph-cat').textContent     = p.categorie;
  document.getElementById('ph-label').textContent   = `✦ Projet — ${p.cours}`;
  document.getElementById('ph-title').textContent   = p.nom;
  document.getElementById('ph-resumé').innerHTML    = `<span class="resumé-label">Résumé — </span>${p.resumé}`;
  document.getElementById('ph-sec-img').src         = p.secondImg;
  document.getElementById('ph-link').href           = p.lien;

  const meta = [
    {label:"Mention",   value:p.mention},
    {label:"Cours",     value:p.cours},
    {label:"Format",    value:p.equipe},
    {label:"Rôle(s)",   value:p.roles},
    {label:"Logiciel",  value:p.logiciels},
    {label:"Catégorie", value:p.categorie},
  ];
  document.getElementById('ph-meta').innerHTML = meta.map(m =>
    `<div class="meta-card bubble"><div class="meta-lbl">${m.label}</div><div class="meta-val">${m.value}</div></div>`
  ).join('');

  document.getElementById('ph-prof').innerHTML  = `<p>${p.descProf}</p>`;
  document.getElementById('ph-perso').innerHTML = `<p>${p.descPerso}</p>`;
}


// ── Entrance animations ───────────────────────────────────────────────────────
gsap.from('.hero-badge', { opacity:0, y:20, duration:.6, ease:'power3.out', delay:.2 });
gsap.from('.hero-title', { opacity:0, y:40, duration:.8, ease:'power3.out', delay:.4 });
gsap.from('.hero-sub',   { opacity:0, y:20, duration:.6, ease:'power3.out', delay:.65 });
gsap.from('.hero-btns',  { opacity:0, y:20, duration:.6, ease:'power3.out', delay:.85 });
gsap.from('#bottom-nav', { opacity:0, y:30, duration:.6, ease:'back.out(1.5)', delay:1.1 });