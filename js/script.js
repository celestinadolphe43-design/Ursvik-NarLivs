// ================================================
//  URSVIK NÄRLIVS – script.js
// ================================================

// --- Öppettider (24h-format) ---
const HOURS = {
  0: { open: 9,  close: 22 }, // Söndag
  1: { open: 7,  close: 22 }, // Måndag
  2: { open: 7,  close: 22 }, // Tisdag
  3: { open: 7,  close: 22 }, // Onsdag
  4: { open: 7,  close: 22 }, // Torsdag
  5: { open: 7,  close: 23 }, // Fredag
  6: { open: 9,  close: 23 }, // Lördag
};

// --- 1. Visa "Öppet nu" eller "Stängt" i hero ---
function updateStatus() {
  const badge = document.getElementById('statusBadge');
  if (!badge) return;

  const now   = new Date();
  const day   = now.getDay();
  const hour  = now.getHours();
  const mins  = now.getMinutes();
  const { open, close } = HOURS[day];
  const isOpen = (hour > open || (hour === open && mins >= 0)) && hour < close;

  if (isOpen) {
    badge.className = 'status-badge open';
    badge.innerHTML = `<span class="status-dot"></span> Öppet nu · Stänger ${close}:00`;
  } else {
    // Hitta nästa öppningsdag
    let nextDay = (day + 1) % 7;
    let daysAhead = 1;
    while (daysAhead < 7 && HOURS[nextDay].open === undefined) {
      nextDay = (nextDay + 1) % 7;
      daysAhead++;
    }
    const dayNames = ['söndag','måndag','tisdag','onsdag','torsdag','fredag','lördag'];
    const nextOpen = HOURS[nextDay].open;
    badge.className = 'status-badge closed';
    badge.innerHTML = `<span class="status-dot"></span> Stängt · Öppnar ${dayNames[nextDay]} ${nextOpen}:00`;
  }
}

// --- 2. Markera dagens rad i öppettidstabellen ---
function highlightToday() {
  const today = new Date().getDay();
  const rows  = document.querySelectorAll('#hoursTable tr[data-days]');

  rows.forEach(row => {
    const days = row.getAttribute('data-days').split(',').map(Number);
    if (days.includes(today)) {
      row.classList.add('today');
    }
  });
}

// --- 3. Hamburgermeny för mobil ---
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Stäng menyn vid klick på en länk
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- 4. Sätt aktuellt år i footer ---
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// --- Kör allt när sidan laddats ---
document.addEventListener('DOMContentLoaded', () => {
  updateStatus();
  highlightToday();
  initHamburger();
  setYear();
});
