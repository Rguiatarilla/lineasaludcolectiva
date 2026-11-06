/**
 * app.js — Línea de tiempo de Salud Colectiva
 * SC → 4 tarjetas de etapa (con rango de años) + modal por hito
 * Depende de js/data.js (scData)
 */
'use strict';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Botones circulares nuevos por etapa (85×85 px) */
const SC_BUTTONS = [
    'assets/images/boton-etapa1.png',
    'assets/images/boton-etapa2.png',
    'assets/images/boton-etapa3.png',
    'assets/images/boton-etapa4.png'
];

/* Fondos del modal por etapa */
const SC_MODAL_BACKGROUNDS = [
    'assets/images/fondo-modal-etapa1.png',
    'assets/images/fondo-modal-etapa2.png',
    'assets/images/fondo-modal-etapa3.png',
    'assets/images/fondo-modal-etapa4.png'
];

/* ════════════════════════════════════════════════════════════
   SC — ILUSTRACIÓN DE FONDO + NODOS (icono + título)
   ════════════════════════════════════════════════════════════ */

/* Lista plana de los hitos con su etapa e índices */
function flattenScHitos() {
    const flat = [];
    scData.forEach((etapa, ei) => {
        etapa.hitos.forEach((hito, hi) => flat.push({ etapa, ei, hito, hi }));
    });
    return flat;
}

let scActiveEtapa = -1;

function renderSc() {
    const nodesEl = document.getElementById('sc-zig-nodes');
    if (!nodesEl) return;
    nodesEl.innerHTML = '';

    scData.forEach((etapa, ei) => {
        const node = document.createElement('div');
        node.className = `sc-zig-node sc-stage--${etapa.etapa} reveal`;
        node.setAttribute('role', 'listitem');
        node.style.setProperty('--sc-stagger', `${Math.min(ei * 120, 600)}ms`);

        /* Usa imagen del botón nuevo si existe, si no cae al número */
        const btnImg = SC_BUTTONS[ei]
            ? `<img src="${SC_BUTTONS[ei]}" alt="Etapa ${etapa.etapa}" class="sc-zig-node__btn-img">`
            : `<span class="sc-zig-node__num">${etapa.etapa}</span>`;

        node.innerHTML = `
            <button class="sc-zig-node__btn" data-etapa="${ei}"
                    aria-expanded="false" aria-controls="sc-etapa-detail"
                    aria-label="Etapa ${etapa.etapa}, ${esc(etapa.year)}: ${esc(etapa.title)}">
                ${btnImg}
            </button>
            <span class="sc-zig-node__label">
                <span class="sc-zig-node__kicker">Etapa ${etapa.etapa} · ${esc(etapa.year)}</span>
                <span class="sc-zig-node__title">${esc(etapa.title)}</span>
            </span>`;

        nodesEl.appendChild(node);
    });

    nodesEl.querySelectorAll('.sc-zig-node').forEach(node => {
        const btn = node.querySelector('.sc-zig-node__btn');
        const ei  = parseInt(btn.dataset.etapa);
        node.querySelector('.sc-zig-node__label')?.addEventListener('click', () => selectScEtapa(ei));
        btn.addEventListener('click', () => selectScEtapa(ei));
    });

    setupScModal();
}

function selectScEtapa(ei) {
    const etapa  = scData[ei];
    const detail = document.getElementById('sc-etapa-detail');
    if (!etapa || !detail) return;

    if (scActiveEtapa === ei) {
        scActiveEtapa = -1;
        detail.hidden = true;
        document.querySelectorAll('.sc-zig-node').forEach(n => {
            n.classList.remove('active');
            n.querySelector('.sc-zig-node__btn')?.setAttribute('aria-expanded', 'false');
        });
        return;
    }

    scActiveEtapa = ei;

    document.querySelectorAll('.sc-zig-node').forEach((n, i) => {
        n.classList.toggle('active', i === ei);
        const btn = n.querySelector('.sc-zig-node__btn');
        if (btn) btn.setAttribute('aria-expanded', i === ei ? 'true' : 'false');
    });

    const hitosHtml = etapa.hitos.map((hito, hi) => {
        const iconHtml = hito.icon
            ? `<img class="sc-hito__icon-img" src="${hito.icon}" alt="" loading="lazy">`
            : '';
        return `
            <button class="sc-hito sc-hito--${hito.variant || 'teal'}"
                    style="--i:${hi}"
                    data-etapa="${ei}" data-hito="${hi}"
                    aria-label="${esc(hito.year)}: ${esc(hito.title)}. Ver detalle.">
                <span class="sc-hito__icon">${iconHtml}</span>
                <span class="sc-hito__text">
                    <span class="sc-hito__year">${esc(hito.year)}</span>
                    <span class="sc-hito__title">${esc(hito.title)}</span>
                </span>
            </button>`;
    }).join('');

    detail.className = `sc-etapa-detail sc-stage--${etapa.etapa}`;
    detail.innerHTML = `
        <div class="sc-etapa-detail__head">
            <span class="sc-etapa-detail__kicker">Etapa ${etapa.etapa} · ${esc(etapa.year)}</span>
            <h3 class="sc-etapa-detail__title">${esc(etapa.title)}</h3>
            <p class="sc-etapa-detail__intro">${esc(etapa.intro || '')}</p>
        </div>
        <div class="sc-etapa-detail__hitos">${hitosHtml}</div>`;
    detail.hidden = false;

    detail.querySelectorAll('.sc-hito').forEach(btn => {
        btn.addEventListener('click', () => {
            openScModal(parseInt(btn.dataset.etapa), parseInt(btn.dataset.hito));
        });
    });
}

let scLastTrigger = null;
let scFlatIndex   = -1;

function setupScModal() {
    document.getElementById('sc-modal-backdrop')?.addEventListener('click', closeScModal);
    document.getElementById('sc-modal-close')?.addEventListener('click',    closeScModal);
    document.getElementById('sc-modal-prev')?.addEventListener('click', () => scModalNav(-1));
    document.getElementById('sc-modal-next')?.addEventListener('click', () => scModalNav(+1));

    document.addEventListener('keydown', e => {
        if (document.getElementById('sc-modal')?.hidden) return;
        if (e.key === 'Escape')      closeScModal();
        if (e.key === 'ArrowLeft')   scModalNav(-1);
        if (e.key === 'ArrowRight')  scModalNav(+1);
    });
}

function scModalNav(dir) {
    const flat = flattenScHitos();
    const curr = flat[scFlatIndex];
    const next = scFlatIndex + dir;
    if (next < 0 || next >= flat.length) return;
    const entry = flat[next];

    if (curr && entry.ei !== curr.ei && !reduced) {
        showStageSplash(entry.ei, () => openScModal(entry.ei, entry.hi, dir));
    } else {
        openScModal(entry.ei, entry.hi, dir);
    }
}

function showStageSplash(etapaIdx, done) {
    const etapa  = scData[etapaIdx];
    const splash = document.getElementById('sc-stage-splash');
    const panel  = document.getElementById('sc-modal-panel');
    if (!etapa || !splash) { done(); return; }

    if (panel) panel.dataset.variant = etapa.hitos[0]?.variant || 'teal';

    document.getElementById('sc-stage-splash-num').textContent    = etapa.etapa;
    document.getElementById('sc-stage-splash-kicker').textContent = 'Etapa ' + etapa.etapa;
    document.getElementById('sc-stage-splash-title').textContent  = etapa.title;
    document.getElementById('sc-stage-splash-years').textContent  = etapa.year;

    splash.hidden = false;
    splash.classList.remove('out');
    void splash.offsetWidth;
    splash.classList.add('in');

    const finish = () => {
        if (splash.hidden) return;
        window.clearTimeout(showStageSplash._t);
        splash.classList.remove('in');
        splash.classList.add('out');
        window.setTimeout(() => {
            splash.hidden = true;
            splash.classList.remove('out');
            done();
        }, 420);
    };

    const skip = document.getElementById('sc-stage-splash-skip');
    if (skip) skip.onclick = finish;

    window.clearTimeout(showStageSplash._t);
    showStageSplash._t = window.setTimeout(finish, 3000);
}

function openScModal(etapaIdx, hitoIdx, dir) {
    const etapa = scData[etapaIdx];
    const hito  = etapa?.hitos[hitoIdx];
    const modal = document.getElementById('sc-modal');
    if (!hito || !modal) return;

    const flat  = flattenScHitos();
    scFlatIndex = flat.findIndex(f => f.ei === etapaIdx && f.hi === hitoIdx);

    scLastTrigger = document.querySelector(
        `.sc-hito[data-etapa="${etapaIdx}"][data-hito="${hitoIdx}"]`);

    /* Variante de color */
    const panel = document.getElementById('sc-modal-panel');
    if (panel) panel.dataset.variant = hito.variant || 'teal';

    /* Fondo del modal: usa el fondo de la etapa correspondiente */
    const bgEl = document.getElementById('sc-modal-bg');
    if (bgEl) {
        const bgSrc = hito.bg || SC_MODAL_BACKGROUNDS[etapaIdx] || etapa.image || '';
        if (bgSrc) {
            bgEl.style.backgroundImage = `url("${bgSrc}")`;
            bgEl.classList.add('is-visible');
        } else {
            bgEl.style.backgroundImage = '';
            bgEl.classList.remove('is-visible');
        }
    }

    /* Animación de transición */
    const content = document.getElementById('sc-modal-content') || panel;
    if (content && dir && !reduced) {
        content.classList.remove('sc-anim-next', 'sc-anim-prev');
        void content.offsetWidth;
        content.classList.add(dir > 0 ? 'sc-anim-next' : 'sc-anim-prev');
    }

    document.getElementById('sc-modal-img').src           = hito.icon || etapa.image || '';
    document.getElementById('sc-modal-img').alt           = hito.title;
    document.getElementById('sc-modal-etapa').textContent = `Etapa ${etapa.etapa} · ${etapa.year}`;
    document.getElementById('sc-modal-year').textContent  = hito.year;
    document.getElementById('sc-modal-title').textContent = hito.title;
    document.getElementById('sc-modal-desc').textContent  = hito.description;
    document.getElementById('sc-modal-footer').textContent = hito.footer || '';

    const linkEl = document.getElementById('sc-modal-link');
    if (hito.link) { linkEl.href = hito.link; linkEl.hidden = false; }
    else           { linkEl.hidden = true; }

    const btnPrev = document.getElementById('sc-modal-prev');
    const btnNext = document.getElementById('sc-modal-next');
    const counter = document.getElementById('sc-modal-counter');
    if (btnPrev) btnPrev.disabled = scFlatIndex <= 0;
    if (btnNext) btnNext.disabled = scFlatIndex >= flat.length - 1;
    if (counter) counter.textContent = `${scFlatIndex + 1} / ${flat.length}`;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('sc-modal-close')?.focus();
}

function closeScModal() {
    const modal = document.getElementById('sc-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    if (scLastTrigger) scLastTrigger.focus();
    scLastTrigger = null;
}

/* ════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════ */
function esc(str) {
    return String(str)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;')
        .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ════════════════════════════════════════════════════════════
   INICIO
   ════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    renderSc();
});
