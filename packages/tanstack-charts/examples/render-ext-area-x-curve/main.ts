// AreaXCurve by hand: areaX(right, left) returns the closed path of a vertical band
import { areaX, defineChart, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Pair = readonly (readonly [number, number])[];
const rows = Array.from({ length: 14 }, (_, i) => ({ y: i, x1: 22 - 10 * Math.sin(i / 2.5), x2: 55 + 16 * Math.cos(i / 2) }));

const trace = (pts: Pair): string => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join('');
const stairs = (pts: Pair): string => pts.map((p, i) => (i === 0 ? `M${p[0].toFixed(2)},${p[1].toFixed(2)}` : `H${p[0].toFixed(2)}V${p[1].toFixed(2)}`)).join('');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The band follows each row with straight horizontal and vertical steps.' });

  const stepped = {
    // Right edge first, then the left edge from the last row back to the first.
    areaX: (right: Pair, left: Pair): string => `${stairs(right)}L${trace([...left].reverse()).slice(1)}Z`,
  };
  const definition = defineChart({
    marks: [areaX(rows, { y: 'y', x1: 'x1', x2: 'x2', fill: '#c084fc', fillOpacity: 0.45, stroke: 'currentColor', strokeWidth: 1, curve: stepped })],
    scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: scaleLinear, reverse: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'A stepped vertical band' }));
  return () => stage.dispose();
};

export default mount;
