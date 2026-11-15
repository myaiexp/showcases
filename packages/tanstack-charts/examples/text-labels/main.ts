// text: data labels at scaled positions, with the text, anchor, offset and fill chosen per row
import { defineChart, dot, mountChart, text } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const cities = [
  { name: 'Aberdeen', pop: 0.2, area: 186 },
  { name: 'Bristol', pop: 0.47, area: 110 },
  { name: 'Cardiff', pop: 0.36, area: 140 },
  { name: 'Derby', pop: 0.26, area: 78 },
  { name: 'Exeter', pop: 0.13, area: 47 },
  { name: 'Glasgow', pop: 0.63, area: 175 },
  { name: 'Leeds', pop: 0.79, area: 552 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (above: boolean) =>
    defineChart({
      marks: [
        dot(cities, { x: 'area', y: 'pop', r: 4, fill: '#60a5fa' }),
        text(cities, {
          x: 'area',
          y: 'pop',
          text: 'name',
          key: 'name',
          // Labels above the dot are centered; labels beside it start after the dot.
          anchor: above ? 'middle' : 'start',
          dx: above ? 0 : 8,
          dy: above ? -10 : 0,
          fontSize: 11,
          fill: (c) => (c.pop > 0.5 ? '#fbbf24' : '#e5e7eb'),
        }),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Area (km2)' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Population (millions)' } },
      },
    });

  const options = (above: boolean) => ({ definition: build(above), height: stage.height, ariaLabel: 'Cities with text labels' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const show = (above: boolean): void => host.update(options(above));
  if (stage.bar) checkbox(stage.bar, 'labels above the dots', true, show);
  else stage.cycle([true, false], 2200, show);
  return () => stage.dispose();
};

export default mount;
