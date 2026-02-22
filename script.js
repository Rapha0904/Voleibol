// Menu mobile
const navBtn = document.getElementById("navbtn");
const nav = document.getElementById("nav");

if (navBtn && nav) {
  navBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Fecha ao clicar em um link
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Slider simples
const imgs = Array.from(document.querySelectorAll(".slider__img"));
const dotsWrap = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let idx = 0;
let timer = null;

function setActive(i) {
  idx = (i + imgs.length) % imgs.length;

  imgs.forEach((img, n) => img.classList.toggle("is-active", n === idx));

  if (dotsWrap) {
    const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
    dots.forEach((d, n) => d.classList.toggle("is-active", n === idx));
  }
}

function buildDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  imgs.forEach((_, n) => {
    const b = document.createElement("button");
    b.className = "dot" + (n === 0 ? " is-active" : "");
    b.type = "button";
    b.setAttribute("aria-label", `Ir para imagem ${n + 1}`);
    b.addEventListener("click", () => {
      stopAuto();
      setActive(n);
      startAuto();
    });
    dotsWrap.appendChild(b);
  });
}

function next() { setActive(idx + 1); }
function prev() { setActive(idx - 1); }

function startAuto() {
  stopAuto();
  timer = setInterval(next, 4500);
}
function stopAuto() {
  if (timer) clearInterval(timer);
  timer = null;
}

if (imgs.length) {
  buildDots();
  setActive(0);
  startAuto();

  if (nextBtn) nextBtn.addEventListener("click", () => { stopAuto(); next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { stopAuto(); prev(); startAuto(); });

  // pausa ao passar mouse
  const viewport = document.getElementById("sliderViewport");
  if (viewport) {
    viewport.addEventListener("mouseenter", stopAuto);
    viewport.addEventListener("mouseleave", startAuto);
  }
}
