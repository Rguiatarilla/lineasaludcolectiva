/**
 * app.js — Línea de tiempo de Salud Colectiva
 * SC → 4 tarjetas de etapa (con rango de años) + modal por hito
 * Depende de js/data.js (scData)
 */
'use strict';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Los 5 fondos (greca textil + foto) que se reparten entre los 21 hitos.
   Guarda estas imágenes en assets/images/ con estos nombres exactos. */
const SC_BACKGROUNDS = [
    'assets/images/Captura de pantalla 2026-10-15 171217.png',  /* greca verde · grupo de personas (libro) */
    'assets/images/Captura de pantalla 2026-10-15 171332.png',  /* greca naranja · señora y joven (hoja)   */
    'assets/images/Captura de pantalla 2026-10-15 170128.png',  /* greca azul · manos tejiendo (búho)       */
    'assets/images/Captura de pantalla 2026-10-15 170142.png',  /* greca turquesa · mujer con plantas (abeja) */
    'assets/images/Captura de pantalla 2026-10-15 170200.png'   /* greca morada · peinado/trenza (ojo)      */
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

/* Línea de tiempo: 4 etapas en zigzag sobre la cinta tejida.
   Al hacer clic en una etapa se despliegan sus hitos debajo. */
let scActiveEtapa = -1;

function renderSc() {
    const nodesEl = document.getElementById('sc-zig-nodes');
    if (!nodesEl) return;
    nodesEl.innerHTML = '';

    scData.forEach((etapa, ei) => {
        const posClass = ei % 2 === 0 ? 'sc-zig-node--up' : 'sc-zig-node--down';

        const node = document.createElement('div');
        node.className = `sc-zig-node sc-stage--${etapa.etapa} ${posClass} reveal`;
        node.setAttribute('role', 'listitem');
        node.style.setProperty('--sc-stagger', `${Math.min(ei * 120, 600)}ms`);

        node.innerHTML = `
            <button class="sc-zig-node__btn" data-etapa="${ei}"
                    aria-expanded="false" aria-controls="sc-etapa-detail"
                    aria-label="Etapa ${etapa.etapa}, ${esc(etapa.year)}: ${esc(etapa.title)}">
                <span class="sc-zig-node__num">${etapa.etapa}</span>
            </button>
            <span class="sc-zig-node__label">
                <span class="sc-zig-node__kicker">Etapa ${etapa.etapa} · ${esc(etapa.year)}</span>
                <span class="sc-zig-node__title">${esc(etapa.title)}</span>
            </span>`;

        nodesEl.appendChild(node);
    });

    /* Click en cada etapa (todo el nodo) */
    nodesEl.querySelectorAll('.sc-zig-node').forEach(node => {
        const btn = node.querySelector('.sc-zig-node__btn');
        const ei  = parseInt(btn.dataset.etapa);
        node.querySelector('.sc-zig-node__label')?.addEventListener('click', () => selectScEtapa(ei));
        btn.addEventListener('click', () => selectScEtapa(ei));
    });

    setupScModal();

    /* Hitos ocultos por defecto: no se abre ninguna etapa al inicio */
}

/* Mostrar/ocultar los hitos de una etapa en el panel inferior */
function selectScEtapa(ei) {
    const etapa  = scData[ei];
    const detail = document.getElementById('sc-etapa-detail');
    if (!etapa || !detail) return;

    /* Si se vuelve a hacer clic en la etapa activa, se cierra */
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

    /* Marcar el nodo activo */
    document.querySelectorAll('.sc-zig-node').forEach((n, i) => {
        n.classList.toggle('active', i === ei);
        const btn = n.querySelector('.sc-zig-node__btn');
        if (btn) btn.setAttribute('aria-expanded', i === ei ? 'true' : 'false');
    });

    /* Tarjetas de hito */
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

    /* Click en cada hito abre el modal */
    detail.querySelectorAll('.sc-hito').forEach(btn => {
        btn.addEventListener('click', () => {
            openScModal(parseInt(btn.dataset.etapa), parseInt(btn.dataset.hito));
        });
    });
}

/* Hito actualmente abierto (para el retorno de foco al cerrar el modal) */
let scLastTrigger = null;

/* ── Modal SC (detalle de hito) ───────────────────────────────── */
let scFlatIndex = -1;   /* índice actual dentro de flattenScHitos() */

function setupScModal() {
    document.getElementById('sc-modal-backdrop')?.addEventListener('click', closeScModal);
    document.getElementById('sc-modal-close')?.addEventListener('click',    closeScModal);
    document.getElementById('sc-modal-prev')?.addEventListener('click', () => scModalNav(-1));
    document.getElementById('sc-modal-next')?.addEventListener('click', () => scModalNav(+1));

    document.addEventListener('keydown', e => {
        if (document.getElementById('sc-modal')?.hidden) return;
        if (e.key === 'Escape') closeScModal();
        if (e.key === 'ArrowLeft')  scModalNav(-1);
        if (e.key === 'ArrowRight') scModalNav(+1);
    });
}

/* Navegar al hito anterior (-1) o siguiente (+1) sin cerrar el modal */
function scModalNav(dir) {
    const flat = flattenScHitos();
    const curr = flat[scFlatIndex];
    const next = scFlatIndex + dir;
    if (next < 0 || next >= flat.length) return;
    const entry = flat[next];

    /* ¿Cambia de etapa? Mostrar pantalla de transición antes del hito */
    if (curr && entry.ei !== curr.ei && !reduced) {
        showStageSplash(entry.ei, () => openScModal(entry.ei, entry.hi, dir));
    } else {
        openScModal(entry.ei, entry.hi, dir);
    }
}

/* Pantalla breve que anuncia la nueva etapa, luego ejecuta el callback */
function showStageSplash(etapaIdx, done) {
    const etapa  = scData[etapaIdx];
    const splash = document.getElementById('sc-stage-splash');
    const panel  = document.getElementById('sc-modal-panel');
    if (!etapa || !splash) { done(); return; }

    /* El color del splash coincide con la primera variante de la etapa */
    if (panel) panel.dataset.variant = etapa.hitos[0]?.variant || 'teal';

    document.getElementById('sc-stage-splash-num').textContent    = etapa.etapa;
    document.getElementById('sc-stage-splash-kicker').textContent = 'Etapa ' + etapa.etapa;
    document.getElementById('sc-stage-splash-title').textContent  = etapa.title;
    document.getElementById('sc-stage-splash-years').textContent  = etapa.year;

    splash.hidden = false;
    splash.classList.remove('out');
    void splash.offsetWidth;
    splash.classList.add('in');

    /* Función para cerrar el splash y mostrar el hito */
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

    /* Botón "Saltar" para no esperar los 5 s */
    const skip = document.getElementById('sc-stage-splash-skip');
    if (skip) skip.onclick = finish;

    /* Auto-cierre tras 3 segundos */
    window.clearTimeout(showStageSplash._t);
    showStageSplash._t = window.setTimeout(finish, 3000);
}

/* Modal de HITO: descripción completa de un hito.
   `dir` (opcional): +1 siguiente, -1 anterior, para animar la transición. */
function openScModal(etapaIdx, hitoIdx, dir) {
    const etapa = scData[etapaIdx];
    const hito  = etapa?.hitos[hitoIdx];
    const modal = document.getElementById('sc-modal');
    if (!hito || !modal) return;

    /* Calcular índice plano para la navegación */
    const flat = flattenScHitos();
    scFlatIndex = flat.findIndex(f => f.ei === etapaIdx && f.hi === hitoIdx);

    /* Recordar el nodo que abrió el modal para devolverle el foco al cerrar */
    scLastTrigger = document.querySelector(
        `.sc-hito[data-etapa="${etapaIdx}"][data-hito="${hitoIdx}"]`);

    /* Variante de color del póster (teal / green / orange) */
    const panel = document.getElementById('sc-modal-panel');
    if (panel) panel.dataset.variant = hito.variant || 'teal';

    /* Fondo fotográfico (greca textil + foto comunitaria).
       Los 5 fondos se reparten entre los 21 hitos de forma rotativa,
       así cada hito tiene su propia imagen de fondo. Un hito puede
       forzar su fondo con la propiedad `bg` en data.js. */
    const bgEl = document.getElementById('sc-modal-bg');
    if (bgEl) {
        const bgSrc = hito.bg || SC_BACKGROUNDS[scFlatIndex % SC_BACKGROUNDS.length];
        if (bgSrc) {
            bgEl.style.backgroundImage = `url("${bgSrc}")`;
            bgEl.classList.add('is-visible');
        } else {
            bgEl.style.backgroundImage = '';
            bgEl.classList.remove('is-visible');
        }
    }

    /* Animación de transición al navegar entre hitos */
    const content = document.getElementById('sc-modal-content') || panel;
    if (content && dir && !reduced) {
        content.classList.remove('sc-anim-next', 'sc-anim-prev');
        void content.offsetWidth;   /* reinicia la animación */
        content.classList.add(dir > 0 ? 'sc-anim-next' : 'sc-anim-prev');
    }

    document.getElementById('sc-modal-img').src           = hito.icon || etapa.image || '';
    document.getElementById('sc-modal-img').alt           = hito.title;
    document.getElementById('sc-modal-etapa').textContent = `Etapa ${etapa.etapa} · ${etapa.year}`;
    document.getElementById('sc-modal-year').textContent  = hito.year;
    document.getElementById('sc-modal-title').textContent = hito.title;
    document.getElementById('sc-modal-desc').textContent  = hito.description;

    /* Nota opcional del pie (ej. "Héctor Abad Gómez") */
    document.getElementById('sc-modal-footer').textContent = hito.footer || '';

    const linkEl = document.getElementById('sc-modal-link');
    if (hito.link) { linkEl.href = hito.link; linkEl.hidden = false; }
    else           { linkEl.hidden = true; }

    /* Actualizar botones de navegación */
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
