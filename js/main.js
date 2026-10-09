// ── Données de base utilisées pour remplir les sections du portfolio ──
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
let PROJECTS = [];
let PROJECT_DETAIL = null;
let PROJECT_DETAILS = {};
let FEATURED_PROJECT_DETAIL = null;

// Génère l'arrière-plan étoilé de manière procédurale.
const starsEl = document.getElementById('stars');
for(let i=0;i<120;i++){
  const s = document.createElement('div');
  s.className = 'star';
  s.style.cssText = `left:${(i*137.508)%100}%;top:${(i*97.3)%100}%;width:${(i%3)+.5}px;height:${(i%3)+.5}px;opacity:${.1+(i%6)*.08}`;
  starsEl.appendChild(s);
}

// Ajoute une traînée discrète derrière le curseur.
if (window.matchMedia('(pointer: fine)').matches) {
  const trail = [];
  const trailLimit = 10;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let lastMoveAt = performance.now();

  for (let i = 0; i < trailLimit; i++) {
    const dot = document.createElement('span');
    dot.className = 'mouse-trail';
    dot.style.opacity = '0';
    document.body.appendChild(dot);
    trail.push({
      el: dot,
      x: mouseX,
      y: mouseY,
      scale: 1 - (i / trailLimit) * 0.45
    });
  }

  function updateMouseTrail() {
    const isIdle = performance.now() - lastMoveAt > 60;
    let targetX = mouseX;
    let targetY = mouseY;

    trail.forEach((point, index) => {
      const follow = index === 0 ? 0.32 : 0.22 + index * 0.04;
      const dx = targetX - point.x;
      const dy = targetY - point.y;
      point.x += dx * follow;
      point.y += dy * follow;

      const distance = Math.hypot(mouseX - point.x, mouseY - point.y);
      const opacity = isIdle ? (distance < 2 ? 0 : 0.18) : Math.max(0, 0.9 - index * 0.08);

      point.el.style.left = `${point.x}px`;
      point.el.style.top = `${point.y}px`;
      point.el.style.opacity = String(opacity);
      point.el.style.transform = `translate(-50%, -50%) scale(${point.scale})`;

      targetX = point.x;
      targetY = point.y;
    });

    requestAnimationFrame(updateMouseTrail);
  }

  document.addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    lastMoveAt = performance.now();

    trail.forEach((point, index) => {
      point.el.style.opacity = String(Math.max(0, 0.9 - index * 0.08));
    });
  });

  document.addEventListener('pointerleave', () => {
    trail.forEach(point => {
      point.el.style.opacity = '0';
    });
  });

  requestAnimationFrame(updateMouseTrail);
}

// Regroupe les outils par niveau de maîtrise pour les afficher par catégorie.
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

// Construit les cartes de projets affichées sur la page d'accueil.
const grid = document.getElementById('projects-grid');
function renderProjects(projects) {
  grid.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'proj-card';
    const detail = PROJECT_DETAILS[String(p.id)] || (p.id === 1 ? FEATURED_PROJECT_DETAIL : null);
    const heroStyle = detail?.heroImg ? `background-image:url('${detail.heroImg}');background-size:cover;background-position:${detail.nom === 'CHEQA' ? 'center top' : 'center'};` : '';
    card.innerHTML = `
      <div class="proj-card-bg" style="background:${p.grad};${heroStyle}"></div>
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
    const shouldOpenContact = p.title === 'Notre projet';
    if (p.hasPage || shouldOpenContact) {
      card.addEventListener('click', () => {
        if (shouldOpenContact) {
          scrollToId('contact');
          return;
        }
        openProject(p.id);
      });
    }
    grid.appendChild(card);
  });
}

function renderProjectSwitcher(projects) {
  // Remplit le menu de changement rapide de projet dans la vue détaillée.
  const switcherList = document.getElementById('proj-switcher-list');
  switcherList.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'switcher-card';
    card.innerHTML = `
      <div class="switcher-thumb"><div class="switcher-thumb-bg" style="background:${p.grad}"></div><div class="switcher-thumb-overlay"></div></div>
      <div class="switcher-info"><div class="switcher-cat" style="color:${p.accent}">${p.cat}</div><div class="switcher-title">${p.title}</div></div>
      <span class="switcher-badge" style="${p.hasPage ? '' : 'opacity:.4'}">${p.hasPage ? 'Voir →' : 'Bientôt'}</span>`;
    if(p.hasPage) card.addEventListener('click', () => { switcherMenu.classList.remove('open'); openProject(p.id); });
    switcherList.appendChild(card);
  });
}

const projectsDataPromise = window.projectsDataPromise || Promise.reject(new Error('projectsDataPromise is not available'));

projectsDataPromise
  .then(data => {
    PROJECTS = data.projects || [];
    FEATURED_PROJECT_DETAIL = data.featuredProject || null;
    PROJECT_DETAIL = FEATURED_PROJECT_DETAIL;
    PROJECT_DETAILS = data.projectDetails || {};
    renderProjects(PROJECTS);
    renderProjectSwitcher(PROJECTS);
  })
  .catch(error => {
    console.error(error);
    grid.innerHTML = '<p class="body-text">Impossible de charger les projets.</p>';
  });

// Ajoute un léger effet d'agrandissement sur les éléments décorés en .bubble.
function bindBubbles(root) {
  root.querySelectorAll('.bubble').forEach(el => {
    if(el._b) return; el._b = true;
    el.addEventListener('mouseenter', () => gsap.to(el, { scale:1.09, duration:.3, ease:'back.out(1.7)' }));
    el.addEventListener('mouseleave', () => gsap.to(el, { scale:1,    duration:.3, ease:'back.out(1.7)' }));
  });
}
bindBubbles(document);

// Synchronise les boutons de navigation avec la section visible.
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

const HOME_SECTION_IDS = ['hero', 'work', 'skills', 'about', 'contact'];

function getCurrentHomeSectionId() {
  // Détermine la section active pour mettre à jour la navigation.
  const focusedSection = document.activeElement?.closest?.('section')?.id;
  if (HOME_SECTION_IDS.includes(focusedSection)) return focusedSection;

  const st = homeEl.scrollTop;
  for (const id of HOME_SECTION_IDS) {
    const section = document.getElementById(id);
    if (section && section.offsetTop - 120 <= st && section.offsetTop + section.offsetHeight > st) {
      return id;
    }
  }

  return 'hero';
}

function focusSection(id) {
  const section = document.getElementById(id);
  if (!section) return;

  if (!section.hasAttribute('tabindex')) {
    section.setAttribute('tabindex', '-1');
  }

  section.focus({ preventScroll: true });
}

document.addEventListener('keydown', e => {
  // Permet de naviguer entre les sections avec Tab quand on est sur l'accueil.
  if (e.key !== 'Tab' || e.ctrlKey || e.altKey || e.metaKey) return;
  if (homeEl.classList.contains('hidden')) return;

  const targetTag = e.target?.tagName;
  if (targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT' || e.target?.isContentEditable) return;

  const currentIndex = HOME_SECTION_IDS.indexOf(getCurrentHomeSectionId());
  const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
  if (nextIndex < 0 || nextIndex >= HOME_SECTION_IDS.length) return;

  e.preventDefault();
  const nextSectionId = HOME_SECTION_IDS[nextIndex];
  scrollToId(nextSectionId);
  window.setTimeout(() => focusSection(nextSectionId), 180);
});

// Ouvre / ferme le menu qui permet de changer de projet rapidement.
const switcherMenu = document.getElementById('proj-switcher-menu');
const switcherBtn  = document.getElementById('proj-switcher-btn');

switcherBtn.addEventListener('click', e => { e.stopPropagation(); switcherMenu.classList.toggle('open'); });
document.addEventListener('click', () => switcherMenu.classList.remove('open'));
switcherMenu.addEventListener('click', e => e.stopPropagation());

// Fait la transition entre la page d'accueil et la page projet.
let busy = false;
const homeEl    = document.getElementById('page-home');
const projEl    = document.getElementById('page-project');
const navEl     = document.getElementById('bottom-nav');
const projNavEl = document.getElementById('proj-nav');
const projTopBack = document.getElementById('proj-top-back');
let projectRevealObserver = null;

function updateProjectHeroParallax() {
  const hero = projEl?.querySelector('.proj-hero');
  const img = hero?.querySelector('img');
  const text = hero?.querySelector('.proj-hero-text');

  if (!hero || !img) return;

  const scrollAmount = projEl.scrollTop || 0;
  const baseShift = -28;
  const imageOffset = Math.min(scrollAmount * 0.18, 70);
  const textOffset = Math.min(scrollAmount * 0.08, 18);

  img.style.transform = `scale(1.16) translate3d(0, ${baseShift + imageOffset}px, 0)`;
  if (text) {
    text.style.transform = `translate3d(0, ${textOffset}px, 0)`;
  }
}

function setupSectionReveal(root, selector, delayStep = 40) {
  const items = root.querySelectorAll(selector);
  items.forEach((el, index) => {
    el.classList.add('reveal-on-load');
    el.style.transitionDelay = `${index * delayStep}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root, threshold: 0.15 });

  items.forEach((el) => observer.observe(el));
}

function setupProjectScrollReveal() {
  if (projectRevealObserver) {
    projectRevealObserver.disconnect();
  }

  const targets = projEl.querySelectorAll(
    '.resumé-block, .meta-card, .desc-block, .carousel, #ph-video-wrap, #ph-process-wrap, #ph-sources, .cta-section, .process-section, .source-card'
  );

  targets.forEach((el, index) => {
    el.classList.add('project-reveal');
    el.style.transitionDelay = `${index * 35}ms`;
  });

  projectRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        projectRevealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: projEl,
    threshold: 0.18
  });

  targets.forEach((el) => projectRevealObserver.observe(el));
}

projEl.addEventListener('scroll', () => {
  if (!projEl.classList.contains('hidden')) {
    updateProjectHeroParallax();
  }
}, { passive: true });

function openProject(projectId) {
  if(busy) return; busy = true;
  PROJECT_DETAIL = PROJECT_DETAILS[String(projectId)] || (projectId === 1 ? FEATURED_PROJECT_DETAIL : null);
  fillProject();
  gsap.timeline({ onComplete: () => { busy=false; bindBubbles(projEl); updateProjectHeroParallax(); } })
    .to([homeEl, navEl], { opacity:0, y:-18, duration:.22, ease:'power2.in' })
    .call(() => {
      homeEl.classList.add('hidden'); navEl.style.display = 'none';
      burgerBtn.style.display = 'none'; burgerMenu.classList.remove('open'); burgerBtn.classList.remove('open');
      projEl.classList.remove('hidden'); projEl.scrollTop = 0; projNavEl.style.display = 'flex'; projTopBack.style.display = 'flex';
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
      projTopBack.style.display = 'none';
      homeEl.classList.remove('hidden'); navEl.style.display = 'flex'; burgerBtn.style.display = '';
      gsap.set([homeEl, navEl], { opacity:0, y:28 });
    })
    .to(homeEl, { opacity:1, y:0, duration:.42, ease:'power3.out' })
    .to(navEl,  { opacity:1, y:0, duration:.35, ease:'back.out(1.5)' }, '-=.2');
}

document.getElementById('proj-nav-back').addEventListener('click', goHome);
projTopBack.addEventListener('click', goHome);

// Gère les carrousels d'images avec navigation et auto-défilement.
const carouselTimers = {};

function initCarousel(images, ids = {}) {
  const key = ids.wrap || 'ph-carousel';
  const showCaptions = ids.captions === true;
  const wrap  = document.getElementById(key);
  const track = document.getElementById(ids.track || 'carousel-track');
  const dots  = document.getElementById(ids.dots || 'carousel-dots');
  const previewContainer = document.getElementById(ids.preview || (key === 'ph-carousel-archive' ? 'gallery-archive-preview' : 'gallery-preview'));
  clearInterval(carouselTimers[key]);
  track.innerHTML = dots.innerHTML = '';
  if(!images?.length) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  let idx = 0;

  function syncPreviewHighlight() {
    // Met en évidence la miniature correspondant à l'image affichée.
    if (!previewContainer) return;
    previewContainer.querySelectorAll('.gallery-preview-item').forEach((item, i) => {
      item.classList.toggle('active', i === idx);
    });
  }

  images.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    const filename = decodeURIComponent(src.split('/').pop()).replace(/\.[^.]+$/, '');
    const caption = showCaptions ? `<p class="carousel-caption">${filename}</p>` : '';
    slide.innerHTML = `<img src="${src}" alt="${showCaptions ? filename : ''}"/><div class="carousel-slide-overlay"></div>${caption}`;
    const image = slide.querySelector('img');
    image.addEventListener('click', () => openLightbox(images, i));
    image.addEventListener('load', () => updateRatio(i));
    track.appendChild(slide);
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goTo(i);
    dots.appendChild(dot);
  });

  function updateRatio(i) {
    // Ajuste le ratio de la zone pour éviter les déformations sur certains projets.
    if (i !== idx) return;
    const image = track.querySelectorAll('img')[i];
    if (image?.naturalWidth && image?.naturalHeight) {
      wrap.style.setProperty('--gallery-ratio', `${image.naturalWidth} / ${image.naturalHeight}`);
    }
  }

  function goTo(i) {
    idx = (i + images.length) % images.length;
    updateRatio(idx);
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.querySelectorAll('.carousel-dot').forEach((d, j) => d.classList.toggle('active', j === idx));
    syncPreviewHighlight();
  }

  function resetTimer() {
    // Relance le défilement automatique après interaction utilisateur.
    clearInterval(carouselTimers[key]);
    carouselTimers[key] = setInterval(() => goTo(idx + 1), 4000);
  }

  document.getElementById(ids.prev || 'carousel-prev').onclick = () => { goTo(idx - 1); resetTimer(); };
  document.getElementById(ids.next || 'carousel-next').onclick = () => { goTo(idx + 1); resetTimer(); };
  resetTimer();
}

function buildGalleryPreview(images, containerId) {
  // Crée les miniatures d'aperçu sous le carrousel principal.
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  if (!images?.length) {
    container.style.display = 'none';
    return;
  }
  container.style.display = 'flex';

  images.forEach((src, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gallery-preview-item';
    btn.dataset.index = String(index);
    btn.setAttribute('aria-label', `Voir l'image ${index + 1}`);
    btn.innerHTML = `<img src="${src}" alt="Aperçu ${index + 1}" />`;
    btn.addEventListener('click', () => openLightbox(images, index));
    container.appendChild(btn);
  });

  const firstPreview = container.querySelector('.gallery-preview-item');
  if (firstPreview) firstPreview.classList.add('active');
}

// Ouvre l'image en grand écran avec navigation précédente / suivante.
function openLightbox(images, start = 0) {
  let i = start;
  const lb  = document.createElement('div'); lb.id = 'lightbox';
  const media = document.createElement('div'); media.className = 'lb-media';
  const img = document.createElement('img');
  const close = document.createElement('button'); close.className = 'lb-close'; close.type = 'button'; close.setAttribute('aria-label', 'Fermer le grand écran'); close.textContent = '×';
  const prev = document.createElement('button'); prev.className = 'lb-arrow lb-prev'; prev.textContent = '‹';
  const next = document.createElement('button'); next.className = 'lb-arrow lb-next'; next.textContent = '›';

  function show() { img.src = images[i]; }
  function closeLightbox() { lb.remove(); }

  img.addEventListener('click', e => e.stopPropagation());
  close.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
  prev.addEventListener('click', e => { e.stopPropagation(); i = (i - 1 + images.length) % images.length; show(); });
  next.addEventListener('click', e => { e.stopPropagation(); i = (i + 1) % images.length; show(); });
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

  media.append(img, close);
  lb.append(prev, media, next);
  document.body.appendChild(lb);
  show();
  requestAnimationFrame(() => lb.classList.add('open'));
}

// Injecte dans la page projet les données correspondant au projet sélectionné.
function fillProject() {
  const p = PROJECT_DETAIL;
  if (!p) return;
  document.querySelector('.proj-hero').classList.toggle('cheqa-hero', p.nom === 'CHEQA');
  document.getElementById('ph-img').src           = p.heroImg;
  const catEl = document.getElementById('ph-cat');
  catEl.textContent = '';
  catEl.style.display = 'none';
  const projectDate = p.date || p.year || '';
  const labelEl = document.getElementById('ph-label');
  labelEl.textContent = projectDate ? `✦ Projet — ${projectDate}` : '✦ Projet';
  document.getElementById('ph-title').textContent = p.nom;
  const dateEl = document.getElementById('ph-date');
  dateEl.textContent = '';
  dateEl.style.display = 'none';
  document.getElementById('ph-resumé').innerHTML  = `<span class="resumé-label">Résumé — </span>${p.resumé}`;
  document.getElementById('ph-link').href         = p.lien;
  document.getElementById('ph-prof').innerHTML    = `<p>${p.descProf}</p>`;
  document.getElementById('ph-perso').innerHTML   = `<p>${p.descPerso}</p>`;

  const sourcesWrap = document.getElementById('ph-sources');
  const sourcesList = document.getElementById('ph-sources-list');
  sourcesList.innerHTML = (p.sources || [])
    .map(source => `<div class="source-card bubble"><div class="source-label">${source.label}</div><div class="source-value">${source.value}</div></div>`)
    .join('');
  sourcesWrap.style.display = p.sources?.length ? 'block' : 'none';

  const cta = document.getElementById('ph-cta');
  cta.style.display = p.lien ? '' : 'none';
  if (p.lien) {
    document.getElementById('ph-cta-title').textContent = p.ctaTitle || 'Voir le projet';
    document.getElementById('ph-cta-sub').textContent = p.ctaSub || 'Documentation du projet';
  }

  const videoWrap = document.getElementById('ph-video-wrap');
  document.getElementById('ph-video').src = p.youtubeId ? `https://www.youtube.com/embed/${p.youtubeId}` : '';
  videoWrap.style.display = p.youtubeId ? 'block' : 'none';

  const processWrap = document.getElementById('ph-process-wrap');
  const processGallery = document.getElementById('ph-process-gallery');
  const processData = p.process || null;
  if (processData?.steps?.length) {
    const processImages = Array.isArray(processData.images) ? processData.images : [];
    const processSlots = processImages.length ? processImages : [null, null, null, null];
    processGallery.innerHTML = processSlots.map((src, index) => src
      ? `<button type="button" class="process-photo" data-process-photo="${index}"><img src="${src}" alt="Processus de création - photo ${index + 1}" loading="lazy"></button>`
      : `<div class="process-photo process-photo--empty" aria-hidden="true"><span>Photo ${index + 1}</span></div>`).join('');
    processWrap.style.display = 'block';
  } else {
    processWrap.style.display = 'none';
  }

  // Bloc récapitulatif des infos du projet.
  document.getElementById('ph-meta').innerHTML = [
    {label:"Mention",   value:p.mention},
    {label:"Cours",     value:p.cours},
    {label:"Équipe",    value:p.equipe},
    {label:"Rôle(s)",   value:p.roles},
    {label:"Logiciel(s)",  value:p.logiciels},
    {label:"Type", value:p.categorie},
  ].map(m => `<div class="meta-card bubble"><div class="meta-lbl">${m.label}</div><div class="meta-val">${m.value}</div></div>`).join('');

  document.getElementById('ph-carousel').classList.toggle('cheqa-gallery', p.nom === 'CHEQA');
  document.getElementById('ph-carousel').classList.toggle('kombucha-gallery', p.nom === 'Kombucha Vibe');
  document.getElementById('ph-carousel').classList.toggle('spaces-gallery', ['Spaces in Between', 'This Is Why We Jump'].includes(p.nom));
  document.getElementById('ph-carousel').classList.toggle('proton-gallery', p.nom === 'Publicité Proton');
  document.getElementById('ph-carousel-archive').classList.toggle('cheqa-gallery', p.nom === 'CHEQA');
  document.getElementById('ph-galleries').classList.toggle('wide-gallery', ['Kombucha Vibe', 'Spaces in Between', 'This Is Why We Jump', 'Publicité Proton'].includes(p.nom));
  initCarousel(p.images, {
    captions: p.nom === 'Publicité Proton',
    preview: 'gallery-preview',
  });
  buildGalleryPreview(p.images, 'gallery-preview');
  initCarousel(p.imagesArchive, {
    wrap: 'ph-carousel-archive',
    track: 'carousel-archive-track',
    dots: 'carousel-archive-dots',
    prev: 'carousel-archive-prev',
    next: 'carousel-archive-next',
    preview: 'gallery-archive-preview',
  });
  buildGalleryPreview(p.imagesArchive, 'gallery-archive-preview');
  setupProjectScrollReveal();
}

// Petites animations d'entrée au chargement pour rendre la page plus vivante.
gsap.from('.hero-badge', { opacity:0, y:12, duration:.38, ease:'power3.out', delay:.12 });
gsap.from('.hero-title', { opacity:0, y:24, duration:.48, ease:'power3.out', delay:.22 });
gsap.from('.hero-sub',   { opacity:0, y:12, duration:.38, ease:'power3.out', delay:.36 });
gsap.from('.hero-btns',  { opacity:0, y:12, duration:.38, ease:'power3.out', delay:.48 });
gsap.from('#bottom-nav', { opacity:0, y:16, duration:.4, ease:'back.out(1.5)', delay:.6 });

setupSectionReveal(homeEl, '#work .proj-card, #skills .tools-category, #about .about-panel, #contact .contact-card', 30);
