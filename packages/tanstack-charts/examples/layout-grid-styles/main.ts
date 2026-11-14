// Grid and axis line styles: a boolean turns them on, a style object sets stroke, dash, width and opacity
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const styles = [
  ['default (no grid)', { y: false, line: true }],
  ['grid: true', { y: true, line: true }],
  ['dashed orange grid', { y: { stroke: '#fb923c', strokeDasharray: '4 4', strokeOpacity: 0.8 }, line: true }],
  ['thick round-capped axis line', { y: true, line: { stroke: '#4ade80', strokeWidth: 3, lineCap: 'round' as const } }],
  ['tick stubs hidden', { y: true, line: false }],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const build = (style: (typeof styles)[number][1]) =>
    defineChart({
      marks: [lineY(signups, { x: 'month', y: 'value', stroke: '#60a5fa' })],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2), grid: style.y === false ? false : { strokeOpacity: 0.15 }, axis: { line: style.line } },
        y: { scale: scaleLinear, nice: true, grid: style.y, axis: { line: style.line } },
      },
    });
  const options = (style: (typeof styles)[number][1]) => ({ definition: build(style), height: stage.height, ariaLabel: 'Signups' });
  const host = stage.own(mountChart(stage.box, options(styles[0][1])));
  const show = (style: (typeof styles)[number][1], label: string): void => {
    host.update(options(style));
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'style', styles.map(([l, s]) => [s, l] as const), (s) => show(s, ''));
  else stage.cycle(styles, 1600, ([l, s]) => show(s, l));
  return () => stage.dispose();
};

export default mount;
