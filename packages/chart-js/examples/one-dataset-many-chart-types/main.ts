// One dataset rendered as bar, line, radar, doughnut or polar area
import { Chart, registerables } from 'chart.js';
import type { Mount } from '@/types.ts';
import './style.css';

Chart.register(...registerables);

type ChartKind = 'bar' | 'line' | 'radar' | 'doughnut' | 'polarArea';

const KINDS: readonly { type: ChartKind; label: string }[] = [
  { type: 'bar', label: 'Bar' },
  { type: 'line', label: 'Line' },
  { type: 'radar', label: 'Radar' },
  { type: 'doughnut', label: 'Doughnut' },
  { type: 'polarArea', label: 'Polar Area' },
];
const LABELS = ['Direct', 'Search', 'Social', 'Email', 'Referral'];
const DATA = [38, 52, 24, 17, 12];
const ACCENT = '#6c8cff';
const PALETTE = ['#6c8cff', '#8c6cff', '#30a46c', '#f5a623', '#e5484d', '#19b8c4'];

const mount: Mount = (stage, { preview }) => {
  const el = document.createElement('div');
  el.className = 'root';
  stage.append(el);
  const style = getComputedStyle(el);
  const fg = style.getPropertyValue('--fg-2').trim() || '#8b8b94';
  const grid = style.getPropertyValue('--border').trim() || '#2a2b30';

  const wrap = document.createElement('div');
  wrap.className = preview ? 'chart-wrap preview' : 'chart-wrap';
  const canvas = document.createElement('canvas');
  wrap.append(canvas);

  let chart: Chart | null = null;
  const build = (type: ChartKind): void => {
    chart?.destroy();
    const radial = type === 'doughnut' || type === 'polarArea' || type === 'radar';
    chart = new Chart(canvas, {
      type,
      data: {
        labels: LABELS,
        datasets: [
          {
            label: 'Traffic (k)',
            data: DATA,
            backgroundColor: radial ? PALETTE.map((c) => c + 'cc') : 'rgba(108, 140, 255, 0.55)',
            borderColor: radial ? PALETTE : ACCENT,
            borderWidth: type === 'line' ? 2 : 1,
            tension: 0.35,
            ...(type === 'bar' ? { borderRadius: 6 } : {}),
            ...(type === 'line' ? { fill: false } : {}),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: fg,
        borderColor: grid,
        plugins: {
          legend: {
            display: type !== 'bar' && type !== 'line',
            position: 'right',
            labels: { color: fg },
          },
        },
        ...(type === 'bar' || type === 'line'
          ? { scales: { x: { ticks: { color: fg }, grid: { color: grid } }, y: { ticks: { color: fg }, grid: { color: grid } } } }
          : {}),
        ...(type === 'radar' || type === 'polarArea'
          ? { scales: { r: { ticks: { color: fg, backdropColor: 'transparent' }, grid: { color: grid }, angleLines: { color: grid } } } }
          : {}),
      },
    });
  };

  const buttons: HTMLButtonElement[] = [];
  const select = (type: ChartKind): void => {
    buttons.forEach((b) => b.classList.toggle('active', b.dataset['type'] === type));
    build(type);
  };

  let timer = 0;
  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'type-switch';
    for (const k of KINDS) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = k.label;
      b.dataset['type'] = k.type;
      b.addEventListener('click', () => select(k.type));
      buttons.push(b);
      bar.append(b);
    }
    el.append(bar);
  }
  el.append(wrap);
  select('bar');
  if (preview) {
    let i = 1;
    timer = window.setInterval(() => select(KINDS[i++ % KINDS.length]?.type ?? 'bar'), 2500);
  }

  return () => {
    clearInterval(timer);
    chart?.destroy();
  };
};

export default mount;
