/**
 * Scroll-driven home page.
 *
 * One rAF loop maps the scroll position onto every animated piece:
 * the hero name morphing into the header wordmark, the word-by-word about
 * statement, the pinned projects stage, post rows and the skills marquee.
 */

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const coarsePointer = window.matchMedia("(pointer: coarse)");

let teardown: (() => void) | null = null;

function init() {
  teardown?.();
  teardown = null;

  const root = document.documentElement;
  const hero = document.getElementById("hero");
  const pin = hero?.querySelector<HTMLElement>(".hero-pin");
  const brand = document.getElementById("brand");
  const morph = document.getElementById("name-morph");
  const heroName = document.getElementById("hero-name");
  if (!hero || !pin || !brand || !morph || !heroName || reducedMotion.matches) return;

  root.classList.add("scrub");

  const $ = <T extends HTMLElement = HTMLElement>(sel: string, scope: ParentNode = document) =>
    scope.querySelector<T>(sel);
  const $$ = <T extends HTMLElement = HTMLElement>(sel: string, scope: ParentNode = document) =>
    Array.from(scope.querySelectorAll<T>(sel));

  const progress = $("#scroll-progress");
  const heroFoot = $("#hero-foot");
  const stroke = $("[data-stroke]", morph);
  const fill = $("[data-fill]", morph);
  const nameWords = ["renzo", "beux"].map((name) => ({
    el: $(`[data-w="${name}"]`, morph)!,
    src: $(`[data-src="${name}"]`, heroName)!,
    tgt: $(`[data-tgt="${name}"]`, brand)!,
    sx: 0,
    scy: 0,
    sh: 0,
    tx: 0,
    tcy: 0,
  }));

  const about = $("#about");
  const statementWords = $$("#statement span");

  const projects = $("#projects");
  const count = $("#proj-count");
  const ticks = $$(".ticks i");
  const panels = $$(".panel").map((el) => ({
    el,
    kind: el.dataset.viz,
    steps: $$("[data-step]", el),
    bar: $("[data-bar]", el),
    shares: $("[data-shares]", el),
    amounts: $$("[data-amt]", el),
    count: $("[data-count]", el),
  }));

  const reveals = $$("[data-reveal]").map((el) => ({ el, top: 0 }));
  const skills = $("#skills");
  const tracks = $$("[data-track]").map((el) => ({ el, dir: Number(el.dataset.track), w: 0 }));

  let vh = 0;
  let scale = 1;
  let aboutTop = 0;
  let aboutH = 0;
  let projectsTop = 0;
  let skillsTop = 0;

  const docTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

  function measure() {
    vh = pin!.offsetHeight;

    const pinTop = pin!.getBoundingClientRect().top;
    for (const w of nameWords) {
      const s = w.src.getBoundingClientRect();
      const t = w.tgt.getBoundingClientRect();
      w.sx = s.left;
      w.sh = s.height;
      w.scy = s.top - pinTop + s.height / 2;
      w.tx = t.left;
      w.tcy = t.top + t.height / 2;
    }
    scale =
      parseFloat(getComputedStyle(brand!).fontSize) /
      parseFloat(getComputedStyle(heroName!).fontSize);

    if (about) {
      aboutTop = docTop(about);
      aboutH = about.offsetHeight;
    }
    if (projects) projectsTop = docTop(projects);
    if (skills) skillsTop = docTop(skills);
    for (const r of reveals) {
      r.el.style.transform = "";
      r.top = docTop(r.el);
    }
    for (const t of tracks) t.w = t.el.scrollWidth / 3;
  }

  function setSteps(steps: HTMLElement[], v: number) {
    const on = Math.min(steps.length, Math.floor(v * (steps.length + 0.99)));
    steps.forEach((el, i) => el.classList.toggle("on", i < on));
    return on;
  }

  function renderViz(panel: (typeof panels)[number], v: number) {
    if (panel.kind === "split") {
      const split = clamp(v / 0.6);
      if (panel.bar) panel.bar.style.gap = `${split * 14}px`;
      if (panel.shares) panel.shares.style.opacity = String(0.3 + 0.7 * split);
      const amount = `$${(32 * split).toFixed(2)}`;
      for (const el of panel.amounts) el.textContent = amount;
      setSteps(panel.steps, clamp((v - 0.6) / 0.4));
    } else {
      const on = setSteps(panel.steps, v);
      if (panel.count) panel.count.textContent = String(on);
    }
  }

  function render(y: number) {
    if (progress) {
      const max = root.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${clamp(y / max)})`;
    }

    // Hero: "Beux" fills in, then the whole name travels into the header.
    const hp = clamp(y / (vh * 0.7));
    const filled = clamp(hp / 0.45);
    const m = easeInOut(clamp((hp - 0.45) / 0.55));
    const s = Math.pow(scale, m);
    const q = scale === 1 ? m : (1 - s) / (1 - scale);
    for (const w of nameWords) {
      const x = lerp(w.sx, w.tx, q);
      const cy = lerp(w.scy, w.tcy, q);
      w.el.style.transform = `translate(${x}px, ${cy - (s * w.sh) / 2}px) scale(${s})`;
    }
    if (fill) fill.style.clipPath = `inset(-20% ${(1 - filled) * 100}% -20% -5%)`;
    if (stroke) stroke.style.opacity = String(1 - clamp((filled - 0.9) / 0.1));
    if (heroFoot) heroFoot.style.opacity = String(1 - clamp(hp / 0.35));

    // About: words light up one by one.
    const ap = clamp((y - aboutTop + vh * 0.45) / (aboutH - vh * 0.75));
    const n = statementWords.length;
    statementWords.forEach((el, i) => {
      el.style.opacity = String(0.16 + 0.84 * clamp((ap * (n + 3) - i) / 3));
    });

    // Projects: one project per screen of scroll while the stage is pinned.
    const total = panels.length;
    if (total) {
      const p = clamp((y - projectsTop) / vh, 0, total - 0.0001);
      const current = Math.floor(p);
      panels.forEach((panel, k) => {
        const t = p - k;
        const fadeIn = k === 0 ? 1 : clamp(t / 0.15);
        const fadeOut = k === total - 1 ? 0 : clamp((t - 0.85) / 0.15);
        const opacity = k === current ? fadeIn * (1 - fadeOut) : 0;
        panel.el.style.opacity = String(opacity);
        panel.el.style.visibility = opacity === 0 ? "hidden" : "visible";
        // Rise in from below; leave with a short lift so it never slides under the stage header.
        panel.el.style.transform = `translateY(${(1 - fadeIn) * 48 - fadeOut * 12}px)`;
        renderViz(panel, clamp((t - 0.12) / 0.5));
        ticks[k]?.classList.toggle("on", k === current);
      });
      if (count) count.textContent = String(current + 1).padStart(2, "0");
    }

    // Post rows rise into place as they enter the viewport.
    for (const r of reveals) {
      const rp = clamp((y + vh * 0.95 - r.top) / (vh * 0.25));
      r.el.style.opacity = String(0.15 + 0.85 * rp);
      r.el.style.transform = `translateY(${(1 - rp) * 28}px)`;
    }

    // Skills: the two rows drift in opposite directions.
    const drift = (y - skillsTop + vh) * 0.35;
    for (const t of tracks) {
      if (!t.w) continue;
      const offset = ((drift % t.w) + t.w) % t.w;
      t.el.style.transform = `translateX(${t.dir < 0 ? -offset : offset - t.w}px)`;
    }
  }

  // Desktop wheels step, so ease toward the target; touch scrolling is already smooth.
  let current = window.scrollY;
  let raf = 0;
  function tick() {
    const target = window.scrollY;
    current = coarsePointer.matches ? target : current + (target - current) * 0.16;
    if (Math.abs(target - current) < 0.3) current = target;
    render(current);
    raf = current === target ? 0 : requestAnimationFrame(tick);
  }
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  let lastW = window.innerWidth;
  let lastH = window.innerHeight;
  const onResize = () => {
    // Mobile browsers fire resize as the URL bar hides; the svh layout does not change.
    const widthChanged = window.innerWidth !== lastW;
    const heightChanged = Math.abs(window.innerHeight - lastH) > 120;
    if (!widthChanged && !heightChanged) return;
    lastW = window.innerWidth;
    lastH = window.innerHeight;
    measure();
    render(current);
  };

  // Late styles, fonts or images change section offsets; re-measure when the page height moves.
  let bodyH = document.body.offsetHeight;
  const observer = new ResizeObserver(() => {
    if (document.body.offsetHeight === bodyH) return;
    bodyH = document.body.offsetHeight;
    measure();
    render(current);
  });
  observer.observe(document.body);

  window.addEventListener("scroll", kick, { passive: true });
  window.addEventListener("resize", onResize);
  document.fonts?.ready.then(() => {
    if (!teardown) return;
    measure();
    render(current);
  });

  teardown = () => {
    observer.disconnect();
    window.removeEventListener("scroll", kick);
    window.removeEventListener("resize", onResize);
    if (raf) cancelAnimationFrame(raf);
    root.classList.remove("morph-ready");
  };

  measure();
  render(current);
  root.classList.add("morph-ready");
}

document.addEventListener("astro:page-load", init);
document.addEventListener("astro:after-swap", () => {
  // The router replaces <html> attributes; restore the layout class before paint.
  if (!reducedMotion.matches) document.documentElement.classList.add("scrub");
});
document.addEventListener("astro:before-swap", () => {
  teardown?.();
  teardown = null;
});
