// One set of traffic figures drawn as bar, line, radar, doughnut and polar area
import type { ChartType } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { PALETTE, alpha } from '../../shared/data.ts';

const TYPES = ['bar', 'line', 'radar', 'doughnut', 'polarArea'] as const satisfies readonly ChartType[];
type Kind = (typeof TYPES)[number];

const LABELS = ['Direct', 'Search', 'Social', 'Email', 'Referral'];
const VISITS = [38, 52, 24, 17, 12];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let chart: Chart | null = null;

  // Same labels and numbers every time; only `type` changes. Pie-like charts colour each
  // slice, so they get one colour per value; bars and lines one colour for the series.
  const draw = (type: Kind): void => {
    chart?.destroy();
    const perSlice = type === 'doughnut' || type === 'polarArea';
    chart = new Chart(stage.canvas, {
      type,
      data: {
        labels: LABELS,
        datasets: [
          {
            label: 'Visits (k)',
            data: VISITS,
            backgroundColor: perSlice ? PALETTE.slice(0, 5).map((c) => alpha(c, 0.75)) : alpha(PALETTE[0]!, 0.45),
            borderColor: perSlice ? '#131316' : PALETTE[0],
            borderWidth: 2,
            fill: type === 'radar',
            tension: 0.3,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: perSlice && !ctx.preview, position: 'right' } },
      },
    });
    label.textContent = `type: '${type}'`;
  };

  draw('bar');
  if (bar) select(bar, 'Chart type', TYPES, 'bar', draw);
  const stop = ctx.preview ? cycle(TYPES, 2400, draw) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
