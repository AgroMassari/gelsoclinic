import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ─── Cursor Premium ────────────────────────────────────────── */
export function initPremiumCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.id = 'gelso-cursor';
  cursor.innerHTML = `<div class="cursor-dot"></div>`;
  document.body.appendChild(cursor);

  const dot = cursor.querySelector('.cursor-dot') as HTMLElement;

  document.addEventListener('mousemove', (e) => {
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.06, ease: 'power2.out' });
  });

  // Hover states
  const interactiveSelectors = 'a, button, [role="button"]';
  document.addEventListener('mouseover', (e) => {
    if ((e.target as Element).closest(interactiveSelectors)) {
      cursor.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if ((e.target as Element).closest(interactiveSelectors)) {
      cursor.classList.remove('cursor-hover');
    }
  });

  document.addEventListener('mousedown', () => cursor.classList.add('cursor-click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('cursor-click'));
}

/* ─── Gold Particle Trail ───────────────────────────────────── */
export function initGoldParticles() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'gelso-particles';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;opacity:.55';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d')!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  interface Particle {
    x: number; y: number;
    size: number; alpha: number;
    vx: number; vy: number;
    life: number; maxLife: number;
  }

  const particles: Particle[] = [];
  let mx = -200, my = -200;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (Math.random() > 0.55) return;
    particles.push({
      x: mx + (Math.random() - 0.5) * 6,
      y: my + (Math.random() - 0.5) * 6,
      size: Math.random() * 2.2 + 0.4,
      alpha: Math.random() * 0.55 + 0.2,
      vx: (Math.random() - 0.5) * 0.6,
      vy: Math.random() * -0.9 - 0.3,
      life: 0,
      maxLife: Math.random() * 55 + 30,
    });
  });

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.life++;
      const progress = p.life / p.maxLife;
      const alpha = p.alpha * (1 - progress);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(205,179,139,${alpha})`;
      ctx.fill();
      if (p.life >= p.maxLife) particles.splice(i, 1);
    }
    requestAnimationFrame(loop);
  }
  loop();
}

/* ─── Hero GSAP Entrance ────────────────────────────────────── */
export function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  // Image cinematic reveal
  tl.fromTo('#hero-image-wrap', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power4.inOut' }, 0)
    .fromTo('#hero-image-wrap img', { scale: 1.12 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0.1)

  // Eyebrow line + text
    .fromTo('#hero-eyebrow-line', { scaleX: 0 }, { scaleX: 1, duration: 0.7, transformOrigin: 'left' }, 0.5)
    .fromTo('#hero-eyebrow-text', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.6 }, 0.8)

  // Big title — split words
    .fromTo('.hero-title-word', { opacity: 0, y: 60, rotateX: -15 }, {
      opacity: 1, y: 0, rotateX: 0, duration: 1,
      stagger: 0.12, ease: 'expo.out',
    }, 0.7)

  // Subtitle + CTA
    .fromTo('#hero-subtitle', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2)
    .fromTo('#hero-cta-primary', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.4)
    .fromTo('#hero-cta-secondary', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.55)
    .fromTo('#hero-bottom-bar', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.7);

  return tl;
}

/* ─── Hero Parallax on Scroll ───────────────────────────────── */
export function initHeroParallax() {
  const img = document.querySelector('#hero-image-wrap img') as HTMLElement;
  if (!img) return;

  ScrollTrigger.create({
    trigger: '#inicio',
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => {
      gsap.set(img, { y: self.progress * 80 });
    },
  });
}

/* ─── Scroll-Triggered Section Reveals ─────────────────────── */
export function initScrollAnimations() {
  // Pillars stagger
  gsap.from('.pillar-item', {
    scrollTrigger: { trigger: '.pillars-section', start: 'top 82%' },
    opacity: 0, y: 40, duration: 0.9,
    stagger: 0.18, ease: 'expo.out',
  });

  // Pillar numbers count-up feel
  gsap.from('.pillar-number', {
    scrollTrigger: { trigger: '.pillars-section', start: 'top 80%' },
    opacity: 0, scale: 0.5, duration: 0.6,
    stagger: 0.18, ease: 'back.out(1.6)',
  });

  // About section — image reveal left-to-right
  ScrollTrigger.create({
    trigger: '#sobre-mi',
    start: 'top 75%',
    onEnter: () => {
      const tl = gsap.timeline();
      tl.fromTo('#about-image-wrap', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power4.inOut' })
        .fromTo('#about-image-wrap img', { scale: 1.1 }, { scale: 1, duration: 1.2, ease: 'power3.out' }, 0)
        .fromTo('.about-text-block', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.9, stagger: 0.14, ease: 'expo.out' }, 0.3)
        .fromTo('.about-corner', { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 0.7, ease: 'expo.out' }, 0.2);
    },
    once: true,
  });

  // Treatments title
  ScrollTrigger.create({
    trigger: '#tratamientos',
    start: 'top 78%',
    onEnter: () => {
      gsap.from('.treatments-title-word', {
        opacity: 0, y: 50, duration: 0.9,
        stagger: 0.1, ease: 'expo.out',
      });
      gsap.from('.treatments-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 0.4 });
    },
    once: true,
  });

  // Treatment cards hover shine
  document.querySelectorAll('.treatment-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { borderColor: 'rgba(205,179,139,0.7)', duration: 0.3 });
    });
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('treatment-card-active')) {
        gsap.to(card, { borderColor: 'rgba(205,179,139,0.22)', duration: 0.3 });
      }
    });
  });

  // Method section
  ScrollTrigger.create({
    trigger: '#metodo',
    start: 'top 75%',
    onEnter: () => {
      gsap.from('#method-image', { opacity: 0, scale: 1.08, duration: 1.2, ease: 'power3.out' });
      gsap.from('.method-step', {
        opacity: 0, x: 30, duration: 0.7,
        stagger: 0.16, ease: 'expo.out', delay: 0.3,
      });
      gsap.from('#method-title-wrap', { opacity: 0, y: 40, duration: 0.9, ease: 'expo.out', delay: 0.15 });
    },
    once: true,
  });

  // Contact / locations
  ScrollTrigger.create({
    trigger: '#contacto',
    start: 'top 78%',
    onEnter: () => {
      gsap.from('.contact-intro', { opacity: 0, y: 36, duration: 0.9, ease: 'expo.out' });
      gsap.from('.contact-intro-body', { opacity: 0, y: 20, duration: 0.75, ease: 'expo.out', delay: 0.15 });
      gsap.from('.location-card', {
        opacity: 0, y: 40, duration: 0.85,
        stagger: 0.14, ease: 'expo.out', delay: 0.25,
      });
      gsap.from('.contact-info-col', {
        opacity: 0, y: 20, duration: 0.6,
        stagger: 0.12, ease: 'expo.out', delay: 0.55,
      });
    },
    once: true,
  });

  // Gold decorative lines animate in
  gsap.from('.gold-bar', {
    scrollTrigger: { trigger: '.gold-bar', start: 'top 88%' },
    scaleX: 0, duration: 1.2, ease: 'expo.out', transformOrigin: 'left',
  });
}

/* ─── Magnetic Button Effect ────────────────────────────────── */
export function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.btn-magnetic').forEach((el) => {
    const btn = el as HTMLElement;
    btn.addEventListener('mousemove', (e: Event) => {
      const ev = e as MouseEvent;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (ev.clientX - cx) * 0.38;
      const dy = (ev.clientY - cy) * 0.38;
      gsap.to(btn, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,0.5)' });
    });
  });
}

/* ─── Header Scroll Behavior ────────────────────────────────── */
export function initHeaderScroll() {
  const header = document.querySelector('#site-header') as HTMLElement;
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      if (self.scroll() > 80) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    },
  });
}

/* ─── Smooth number ticker for stats (if any) ──────────────── */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}
