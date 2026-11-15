// motion({ initial }): entrance on or off, remounting the host to replay it
import { areaY, barY, defineChart, lineY } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

type Initial = boolean | 'always';
const modes: readonly (readonly [Initial, string])[] = [[true, 'initial: true'], [false, 'initial: false']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Replay mounts the chart again with the chosen setting.' });
  let host: { destroy(): void } | undefined;
  const play = (initial: Initial): void => {
    host?.destroy();
    host = mountChartRenderer(stage.box, {
      definition: defineChart({
        marks: [
          areaY(revenue, { x: 'month', y: 'revenue', fill: '#38bdf8', fillOpacity: 0.2 }),
          lineY(revenue, { x: 'month', y: 'revenue', stroke: '#38bdf8', strokeWidth: 2 }),
          barY(revenue, { x: 'month', y: 'revenue', fill: '#38bdf8', fillOpacity: 0.55, inset: 14 }),
        ],
        scales: { x: { scale: () => scaleBand<string>().padding(0.1) }, y: { scale: scaleLinear, nice: true, grid: true } },
      }),
      renderer: motion({ initial, transition: { type: 'tween', duration: 1100, easing: 'ease-out' } }),
      height: stage.height,
      ariaLabel: 'Monthly revenue drawn three ways',
    });
    stage.say(`motion({ initial: ${initial} })`);
  };
  stage.onDispose(() => host?.destroy());
  let initial: Initial = true;
  play(initial);
  if (stage.bar) {
    select(stage.bar, 'initial', modes, (v) => { initial = v; play(v); });
    button(stage.bar, 'replay', () => play(initial));
  } else stage.cycle(modes, 2800, ([v]) => play(v));
  return () => stage.dispose();
};

export default mount;
