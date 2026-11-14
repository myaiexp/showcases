// Cities as bubbles: income across, rent up, population as the bubble size
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { PALETTE, alpha } from '../../shared/data.ts';
import { CITIES, type City } from '../../shared/round-charts-data.ts';

const YEARS = Object.keys(CITIES);

// A bubble point is {x, y, r}. r is raw pixels, not scaled by the chart (bubble.md), so
// this turns millions of people into pixels itself: area follows population.
const toPoints = (cities: City[], scale: number) =>
  cities.map((c) => ({ x: c.income, y: c.rent, r: 5 + Math.sqrt(c.pop) * scale }));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  const scale = ctx.preview ? 5 : 11;
  let shown = '2020';
  const names = CITIES['2026']!.map((c) => c.name);

  const chart = new Chart(stage.canvas, {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'Cities',
          data: toPoints(CITIES['2020']!, scale),
          backgroundColor: PALETTE.map((c) => alpha(c, 0.55)),
          borderColor: PALETTE,
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { min: 10, max: 70, title: { display: !ctx.preview, text: 'Income (k€ a year)' } },
        y: { min: 5, max: 40, title: { display: !ctx.preview, text: 'Rent (€ per m²)' } },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (t) => `${names[t.dataIndex]}: income ${t.parsed.x}k, rent €${t.parsed.y}, ${CITIES[shown]![t.dataIndex]!.pop}M people`,
          },
        },
      },
    },
  });

  const show = (year: string): void => {
    shown = year;
    chart.data.datasets[0]!.data = toPoints(CITIES[year]!, scale);
    chart.update();
    label.textContent = `${year}: size = population`;
  };
  show('2020');

  if (bar) select(bar, 'Year', YEARS, '2020', show);
  const stop = ctx.preview ? cycle(YEARS, 2400, show) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
