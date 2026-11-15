// text states: focus-driven presentation, so the focused label grows and the others fade
import { defineChart, mountChart, text } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const cities = [
  { name: 'Aberdeen', x: 2, y: 8 },
  { name: 'Bristol', x: 4, y: 3 },
  { name: 'Cardiff', x: 5, y: 7 },
  { name: 'Derby', x: 6.5, y: 4 },
  { name: 'Exeter', x: 3, y: 5.5 },
  { name: 'Glasgow', x: 8, y: 8.5 },
  { name: 'Leeds', x: 7.5, y: 1.5 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over the labels: the nearest one is enlarged.' });

  const definition = defineChart({
    marks: [
      text(cities, {
        x: 'x',
        y: 'y',
        text: 'name',
        key: 'name',
        fontSize: 12,
        states: [
          { when: { focus: 'unmatched' }, style: { fillOpacity: 0.35 }, transition: { type: 'tween', duration: 150 } },
          { when: { focus: 'primary' }, style: { fontSize: 18, fontWeight: 700, fill: '#fbbf24' }, transition: { type: 'tween', duration: 150 } },
        ],
      }),
    ],
    scales: {
      x: { scale: scaleLinear().domain([0, 10]) },
      y: { scale: scaleLinear().domain([0, 10]) },
    },
    guides: false,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Labels that react to focus' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
