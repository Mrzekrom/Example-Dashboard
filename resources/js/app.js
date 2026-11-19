import { Chart, LineController, DoughnutController, LineElement, PointElement, ArcElement, CategoryScale, LinearScale, Filler, Tooltip } from 'chart.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createIcons, LayoutGrid, ChartNoAxesCombined, Layers, CalendarDays, ChevronDown, Download, Wallet, Users, Target, ListFilter } from 'lucide';

Chart.register(LineController, DoughnutController, LineElement, PointElement, ArcElement, CategoryScale, LinearScale, Filler, Tooltip);
gsap.registerPlugin(ScrollTrigger);
createIcons({ icons: { LayoutGrid, ChartNoAxesCombined, Layers, CalendarDays, ChevronDown, Download, Wallet, Users, Target, ListFilter }, attrs: { 'aria-hidden': 'true' } });

const periods = {
    90: {
        labels: ['Sem. 1–2', 'Sem. 3–4', 'Sem. 5–6', 'Sem. 7–8', 'Sem. 9–10', 'Sem. 11–13'],
        revenue: [8200, 11400, 9950, 16000, 15300, 23400],
        previous: [7500, 10100, 9800, 13000, 14500, 19800],
        values: [84250, 24, 38, 6.4],
        changes: ['+12,8%', '+4', '+8,6%', '+1,2 pp'],
        mix: [46, 32, 22],
    },
    30: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        revenue: [6200, 7100, 6300, 11700],
        previous: [5500, 6200, 6300, 10000],
        values: [31300, 12, 19, 6.1],
        changes: ['+11,8%', '+2', '+11,8%', '+0,4 pp'],
        mix: [41, 36, 23],
    },
    7: {
        labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'],
        revenue: [800, 1300, 1000, 1600, 1250, 1100, 1650],
        previous: [730, 900, 980, 1390, 1260, 1020, 1350],
        values: [8700, 5, 8, 6.8],
        changes: ['+14,0%', '+1', '+14,3%', '+0,6 pp'],
        mix: [38, 42, 20],
    },
};
const services = ['Diseño y marca', 'Desarrollo digital', 'Estrategia'];
const colors = ['#7448eb', '#aa84f8', '#f2b29b'];
const euros = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0 });
const numbers = new Intl.NumberFormat('es-ES');
const percent = new Intl.NumberFormat('es-ES', { style: 'percent', maximumFractionDigits: 1, minimumFractionDigits: 1 });
const formatters = [value => euros.format(value), value => numbers.format(value), value => numbers.format(value), value => percent.format(value / 100)];
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const period = document.querySelector('#period');
const filter = document.querySelector('#project-filter');
const notice = document.querySelector('#notice');
const metrics = [...document.querySelectorAll('.metric')];
const serviceTotal = document.querySelector('#service-total');
const serviceLegend = document.querySelector('#service-legend');
const initial = periods[period.value];

function revenueGradient({ chart }) {
    const bounds = chart.chartArea;
    if (!bounds) return '#7448eb24';
    const gradient = chart.ctx.createLinearGradient(0, bounds.top, 0, bounds.bottom);
    gradient.addColorStop(0, '#7448eb43');
    gradient.addColorStop(1, '#7448eb03');
    return gradient;
}

const revenue = new Chart(document.querySelector('#revenue-chart'), {
    type: 'line',
    data: {
        labels: initial.labels,
        datasets: [
            { label: 'Periodo actual', data: initial.revenue, borderColor: colors[0], backgroundColor: revenueGradient, fill: true, borderWidth: 3 },
            { label: 'Periodo anterior', data: initial.previous, borderColor: '#ac98d5', borderDash: [5, 5], borderWidth: 2 },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        elements: { line: { tension: 0.36 }, point: { radius: 0, hoverRadius: 5 } },
        interaction: { mode: 'index', intersect: false },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#625d72', maxRotation: 0, autoSkip: true } },
            y: {
                beginAtZero: true,
                grid: { color: '#f0edf5' },
                border: { display: false, dash: [3, 4] },
                ticks: { color: '#625d72', maxTicksLimit: 5, callback: value => euros.format(value) },
            },
        },
        plugins: { tooltip: { callbacks: { label: item => item.dataset.label + ': ' + euros.format(item.parsed.y) } } },
    },
});

const donut = new Chart(document.querySelector('#services-chart'), {
    type: 'doughnut',
    data: { labels: services, datasets: [{ data: initial.mix, backgroundColor: colors, borderWidth: 3, borderColor: '#fff', borderRadius: 5 }] },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '76%',
        animation: false,
        plugins: { tooltip: { callbacks: { label: item => item.label + ': ' + item.parsed + ' %' } } },
    },
});

let counters = [];
function updateDashboard(animate = false) {
    const data = periods[period.value];
    counters.forEach(tween => tween.kill());
    counters = metrics.map((card, index) => {
        const key = card.querySelector('.metric-value');
        const target = data.values[index];
        const state = { value: Number(key.dataset.value ?? 0) };
        key.dataset.value = target;
        card.querySelector('.change').textContent = data.changes[index];

        if (animate && !motion.matches) {
            return gsap.to(state, {
                value: target,
                duration: 0.68,
                ease: 'power2.out',
                onUpdate() {
                    const value = index === 3 ? state.value : Math.round(state.value);
                    key.textContent = formatters[index](value);
                    key.dataset.value = state.value;
                },
            });
        }

        key.textContent = formatters[index](target);
        return null;
    }).filter(Boolean);

    revenue.data.labels = data.labels;
    revenue.data.datasets[0].data = data.revenue;
    revenue.data.datasets[1].data = data.previous;
    revenue.update('none');
    revenue.canvas.setAttribute('aria-label', data.labels.map((label, index) => label + ': ' + euros.format(data.revenue[index]) + ', antes ' + euros.format(data.previous[index])).join('. '));
    donut.data.datasets[0].data = data.mix;
    donut.update('none');
    serviceTotal.textContent = euros.format(data.values[0]);
    serviceLegend.replaceChildren(...services.map((name, index) => {
        const item = document.createElement('li');
        const swatch = document.createElement('b');
        const value = document.createElement('strong');
        swatch.style.backgroundColor = colors[index];
        value.textContent = data.mix[index] + ' %';
        item.append(swatch, name, value);
        return item;
    }));
    donut.canvas.setAttribute('aria-label', serviceLegend.textContent);
}

updateDashboard();
period.addEventListener('change', () => {
    updateDashboard(true);
    notice.textContent = 'Informe actualizado: ' + period.selectedOptions[0].textContent;
});
motion.addEventListener('change', event => {
    if (event.matches) updateDashboard();
});

const projectRows = [...document.querySelectorAll('tbody tr')];
filter.addEventListener('change', () => {
    let count = 0;
    projectRows.forEach(row => {
        row.hidden = filter.value !== 'all' && row.dataset.status !== filter.value;
        if (!row.hidden) count++;
    });
    notice.textContent = count + ' proyectos visibles.';
    ScrollTrigger.refresh();
});

document.querySelector('#export').addEventListener('click', () => {
    const data = periods[period.value];
    const rows = [['Periodo', 'Indicador', 'Valor', 'Variación']];
    metrics.forEach((card, index) => rows.push([
        period.selectedOptions[0].textContent,
        card.querySelector('p').textContent,
        formatters[index](data.values[index]),
        data.changes[index],
    ]));
    const csv = rows.map(row => row.map(field => '"' + field.replaceAll('"', '""') + '"').join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nexo-informe-' + period.value + '-dias.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notice.textContent = 'Informe CSV descargado.';
});

const navLinks = [...document.querySelectorAll('nav a')];
const sections = navLinks.slice(1).map(link => document.querySelector(link.hash));
function syncNavigation() {
    const scrolledToEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    const active = scrolledToEnd ? sections.at(-1) : sections.findLast(section => section.getBoundingClientRect().top <= 150);
    navLinks.forEach(link => {
        if (link.hash === '#' + (active?.id ?? 'resumen')) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
}
ScrollTrigger.create({ trigger: document.body, start: 'top top', end: 'bottom bottom', onUpdate: syncNavigation, onRefresh: syncNavigation });

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-copy > *', { y: 17, opacity: 0, duration: 0.58, stagger: 0.08 })
        .from('.hero-art', { scale: 0.78, opacity: 0, duration: 0.93, clearProps: 'opacity' }, 0.05)
        .from('.metric', { y: 16, opacity: 0, stagger: 0.075, duration: 0.5, clearProps: 'transform,opacity' }, 0.28);

    gsap.to('.hero-art span', {
        rotate: 35,
        xPercent: 15,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7 },
    });
    gsap.to('.reading-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
    });
    gsap.utils.toArray('.reveal').forEach((element, index) => {
        gsap.from(element, {
            y: 26,
            opacity: 0,
            duration: 0.65,
            delay: index === 1 ? 0.09 : 0,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
    });
    gsap.from('.track span', {
        scaleX: 0,
        stagger: 0.09,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.table-wrap', start: 'top 86%', once: true },
    });
});
