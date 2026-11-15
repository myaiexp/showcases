// Gauge: a half-circle polar sweep with a track arc, a value arc, a needle rule and a readout
import { defineChart, mountChart } from '@tanstack/charts';
import { polar, radialArc, radialRule, radialText } from '@tanstack/charts/polar';
import { scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const START = -Math.PI / 2;
const END = Math.PI / 2;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let value = 64;

  const build = () => {
    const angleOf = (v: number): number => START + ((END - START) * v) / 100;
    const reading = [{ value }];
    return defineChart({
      marks: [
        polar({
          startAngle: START,
          endAngle: END,
          radiusRatio: 0.95,
          marks: [
            // A gauge is a donut over a half sweep: a full-width track, then the value on top.
            radialArc([{ startAngle: START, endAngle: END }], { innerRadius: ({ radius }) => radius * 0.7, cornerRadius: 8, fill: 'color-mix(in srgb, currentColor 12%, transparent)' }),
            radialArc([{ startAngle: START, endAngle: angleOf(value) }], { innerRadius: ({ radius }) => radius * 0.7, cornerRadius: 8, fill: value > 80 ? '#f87171' : '#4ade80' }),
            // The needle runs from the center to the inner edge of the arc along the value's angle.
            radialRule(reading, { angle: 'value', radius1: 0, radius2: 0.6, stroke: '#e5e7eb', strokeWidth: 3 }),
            radialText(reading, { angle: 'value', radius: 0, text: (d) => `${Math.round(d.value)}%`, fontSize: 20, fontWeight: 700, dy: 26 }),
          ],
          scales: {
            angle: { scale: scaleLinear().domain([0, 100]) },
            radius: { scale: scaleLinear().domain([0, 1]) },
          },
        }),
      ],
      scales: { x: null, y: null },
    });
  };

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: `Gauge reading ${Math.round(value)} percent` });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) slider(stage.bar, 'value', 0, 100, 1, value, (x) => { value = x; refresh(); }, (x) => `${x}%`);
  else stage.cycle([64, 20, 92, 45], 1400, (x) => { value = x; refresh(); });
  return () => stage.dispose();
};

export default mount;
