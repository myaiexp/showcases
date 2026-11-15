// Twelve arcs sharing a centre: angle from a band scale, radius from a sqrt scale
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(3);
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => ({ m: m + i, label: m, v: Math.round(20 + rand() * 80) }));

  const spec: Spec = {
    width: 300, height: 300, padding: 5,
    signals: [{ name: 'gain', value: 1, bind: { input: 'range', min: 0.2, max: 1.2, step: 0.05 } }],
    data: [{ name: 'table', values: months }],
    scales: [
      { name: 'angle', type: 'band', domain: { data: 'table', field: 'm' }, range: [0, 6.2832] },
      { name: 'r', type: 'sqrt', domain: [0, 100], range: [0, 140] },
      { name: 'c', type: 'linear', domain: [0, 100], range: ['#4fa3e0', '#f59e0b'] },
    ],
    marks: [{
      type: 'arc',
      from: { data: 'table' },
      encode: {
        enter: { x: { signal: 'width / 2' }, y: { signal: 'height / 2' }, stroke: { value: '#222' } },
        update: {
          // The band's own width is the wedge's angular extent.
          startAngle: { scale: 'angle', field: 'm' },
          endAngle: { scale: 'angle', field: 'm', band: 1 },
          padAngle: { value: 0.03 },
          cornerRadius: { value: 5 },
          innerRadius: { value: 12 },
          outerRadius: { signal: "scale('r', datum.v * gain)" },
          fill: { scale: 'c', field: 'v' },
        },
        hover: { fillOpacity: { value: 0.7 } },
      },
    }],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'gain', [1, 0.45, 0.8, 0.3, 1], 1100);
  return () => stage.dispose();
};

export default mount;
