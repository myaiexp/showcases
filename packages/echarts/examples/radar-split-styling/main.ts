// Radar component grid styling: splitArea, splitLine, axisLine, axisLabel, splitNumber, inner radius
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const indicator = ['Taste', 'Aroma', 'Body', 'Acidity', 'Finish', 'Balance'].map((name) => ({ name, max: 10, min: 0 }));
const PALETTES: Record<string, string[]> = {
  'grey (default style)': ['rgba(250,250,250,0.06)', 'rgba(200,200,200,0.12)'],
  warm: ['rgba(238,102,102,0.10)', 'rgba(250,200,88,0.14)'],
  'three bands': ['rgba(84,112,198,0.18)', 'rgba(145,204,117,0.14)', 'rgba(250,200,88,0.12)'],
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let palette = 'warm';
  let splitNumber = 5;
  let lineType = 'dashed';
  let areas = true;
  let tickLabels = true;
  let ring = false;
  let value = [7, 8, 5, 6, 9, 7];

  const show = (): void => {
    chart.setOption({
      radar: {
        indicator,
        radius: ring ? ['22%', ctx.preview ? '62%' : '68%'] : ctx.preview ? '62%' : '68%', // [inner, outer]
        splitNumber, // rings between the centre and the outside
        // splitArea: the bands between rings; areaStyle.color colours them in turn.
        splitArea: { show: areas, areaStyle: { color: PALETTES[palette]! } },
        // splitLine: the ring outlines.
        splitLine: { lineStyle: { type: lineType as 'solid', color: 'rgba(255,255,255,0.35)' } },
        // axisLine: the spokes. axisLabel: the numbers along the first spoke.
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.35)' } },
        axisLabel: { show: tickLabels, color: '#aaa', fontSize: 10 },
        axisName: { fontSize: ctx.preview ? 10 : 13 },
      },
      series: [{ type: 'radar', data: [{ value, name: 'Blend A', areaStyle: { opacity: 0.35 } }] }],
    });
  };
  show();

  let n = 0;
  const stop = every(ctx.preview ? 1600 : 3000, () => {
    value = value.map(() => Math.round(3 + Math.random() * 7));
    if (ctx.preview) {
      n++;
      splitNumber = 3 + (n % 4);
      palette = Object.keys(PALETTES)[n % 3]!;
      ring = n % 4 >= 2;
    }
    show();
  });
  if (bar) {
    select(bar, 'splitArea colours', Object.keys(PALETTES), (v) => {
      palette = v;
      show();
    }).value = 'warm';
    slider(bar, 'splitNumber', [1, 10, 1], splitNumber, (v) => {
      splitNumber = v;
      show();
    });
    select(bar, 'splitLine type', ['dashed', 'solid', 'dotted'], (v) => {
      lineType = v;
      show();
    });
    const a = button(bar, 'splitArea: on', () => {
      areas = !areas;
      a.textContent = `splitArea: ${areas ? 'on' : 'off'}`;
      show();
    });
    const t = button(bar, 'axisLabel: on', () => {
      tickLabels = !tickLabels;
      t.textContent = `axisLabel: ${tickLabels ? 'on' : 'off'}`;
      show();
    });
    const r = button(bar, 'radius: single', () => {
      ring = !ring;
      r.textContent = `radius: ${ring ? '[inner, outer]' : 'single'}`;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
