// The same growing values on linear, log, square-root and symlog y scales
import { defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { scaleLog, scalePow, scaleSymlog } from 'd3-scale';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = Array.from({ length: 12 }, (_, i) => ({ id: `s${i}`, step: `S${i + 1}`, users: Math.round(8 * 1.9 ** i) }));
type Kind = 'linear' | 'log' | 'sqrt' | 'symlog';
const kinds: readonly (readonly [Kind, string])[] = [['linear', 'scaleLinear'], ['log', 'scaleLog'], ['sqrt', 'scalePow exponent 0.5'], ['symlog', 'scaleSymlog']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (kind: Kind) =>
    defineChart({
      marks: [lineY(rows, { x: 'step', y: 'users', stroke: '#60a5fa' }), dot(rows, { x: 'step', y: 'users', r: 3.5, fill: '#60a5fa' })],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.3) },
        y: {
          scale: kind === 'linear' ? scaleLinear : kind === 'log' ? scaleLog : kind === 'sqrt' ? () => scalePow().exponent(0.5) : scaleSymlog,
          nice: true,
          grid: true,
        },
      },
      tooltip,
    });

  const options = (kind: Kind) => ({ definition: build(kind), height: stage.height, ariaLabel: 'Growth on different y scales' });
  const host = stage.own(mountChart(stage.box, options('linear')));
  const show = (kind: Kind, label: string): void => {
    host.update(options(kind));
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'y scale', kinds, (k) => show(k, ''));
  else stage.cycle(kinds, 1700, ([k, label]) => show(k, label));
  return () => stage.dispose();
};

export default mount;
