// A ChartCurve written by hand: line() and area() return path strings
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import type { ChartCurve } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { signal } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = signal(24, 9);
type Pair = readonly (readonly [number, number])[];

// Each interior point is a control point, and the path runs through the midpoints between points.
const line = (pts: Pair): string => {
  if (pts.length === 0) return '';
  const p = (a: readonly [number, number]): string => `${a[0].toFixed(2)},${a[1].toFixed(2)}`;
  if (pts.length < 3) return `M${pts.map(p).join('L')}`;
  let d = `M${p(pts[0]!)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const a = pts[i]!;
    const b = pts[i + 1]!;
    d += `Q${p(a)} ${((a[0] + b[0]) / 2).toFixed(2)},${((a[1] + b[1]) / 2).toFixed(2)}`;
  }
  return `${d}L${p(pts[pts.length - 1]!)}`;
};
const rounded: ChartCurve = {
  line,
  // An area is its top edge, then its bottom edge walked backwards, closed.
  area: (top, bottom) => `${line(top)}L${line([...bottom].reverse()).slice(1)}Z`,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same data with the built-in straight segments and with the hand-written curve.' });
  if (stage.preview) stage.height -= 34;
  let custom = true;

  const options = () => ({
    definition: defineChart({
      svgAnimation: true,
      marks: [
        areaY(rows, { x: 'date', y: 'value', fill: '#60a5fa', fillOpacity: 0.2, curve: custom ? rounded : undefined }),
        lineY(rows, { x: 'date', y: 'value', stroke: '#60a5fa', strokeWidth: 2, curve: custom ? rounded : undefined }),
      ],
      scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true } },
    }),
    height: stage.height,
    initialWidth: 600,
    ariaLabel: 'A signal with a custom curve',
  });
  const host = stage.own(mountChart(stage.box, options()));
  const set = (v: boolean): void => {
    custom = v;
    host.update(options());
    stage.say(v ? 'curve: hand-written rounded' : 'curve: default straight');
  };
  if (stage.bar) checkbox(stage.bar, 'custom curve', true, set);
  else stage.cycle([true, false], 2200, set);
  return () => stage.dispose();
};

export default mount;
