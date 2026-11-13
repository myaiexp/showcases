// Bar chart with one slider per month that mutates data and calls update()
import { Chart, registerables } from 'chart.js';
import type { Mount } from '@/types.ts';
import './style.css';

Chart.register(...registerables);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const VALUES = [42, 55, 48, 71, 63, 88];

const mount: Mount = (stage, { preview }) => {
  const el = document.createElement('div');
  el.className = 'root';
  stage.append(el);
  const wrap = document.createElement('div');
  wrap.className = preview ? 'chart-wrap preview' : 'chart-wrap';
  const canvas = document.createElement('canvas');
  wrap.append(canvas);
  el.append(wrap);

  const style = getComputedStyle(el);
  const fg = style.getPropertyValue('--fg-2').trim() || '#8b8b94';
  const grid = style.getPropertyValue('--border').trim() || '#2a2b30';

  const data = [...VALUES];
  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Revenue ($k)',
          data,
          backgroundColor: 'rgba(108, 140, 255, 0.55)',
          borderColor: '#6c8cff',
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      color: fg,
      scales: {
        x: { ticks: { color: fg }, grid: { color: grid } },
        y: { beginAtZero: true, suggestedMax: 100, ticks: { color: fg }, grid: { color: grid } },
      },
      plugins: { legend: { display: false } },
    },
  });

  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'data-controls';
    MONTHS.forEach((month, i) => {
      const row = document.createElement('div');
      row.className = 'data-row';
      const label = document.createElement('label');
      const value = document.createElement('span');
      value.className = 'v';
      value.textContent = String(VALUES[i]);
      label.append(`${month} `, value);
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = '0';
      slider.max = '100';
      slider.value = String(VALUES[i]);
      slider.addEventListener('input', () => {
        const v = Number(slider.value);
        value.textContent = String(v);
        data[i] = v;
        chart.update();
      });
      row.append(label, slider);
      controls.append(row);
    });
    el.append(controls);
  }

  return () => chart.destroy();
};

export default mount;
