// stagger({ by: 'series', roles: 'line' }): lines enter in series order, other roles are not delayed
import { defineChart, dot, lineY } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { stagger } from '@tanstack/charts/motion/definition';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { downloads, packageColors, packageNames } from '../../shared/style-data.ts';
import { replayer } from '../../shared/style-replay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Replay: lines enter 400 ms apart; the dots do not wait.' });
  let staggered = true;
  const replay = replayer(stage, () =>
    mountChartRenderer(stage.box, {
      definition: defineChart({
        motion: { transition: { type: 'tween', duration: 700, easing: 'ease-out' }, ...(staggered ? stagger({ each: 400, by: 'series', roles: 'line' }) : {}) },
        marks: [
          ...packageNames.map((name, i) => lineY(downloads.filter((d) => d.package === name), { id: name, x: 'week', y: 'downloads', key: 'id', stroke: packageColors[i], strokeWidth: 2.5 })),
          dot(downloads, { id: 'dots', x: 'week', y: 'downloads', key: 'id', r: 3, color: 'package' }),
        ],
        scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
      }),
      renderer: motion(),
      height: stage.height,
      ariaLabel: 'Weekly downloads for three packages',
    }),
  );
  replay();
  if (stage.bar) {
    checkbox(stage.bar, 'stagger by series', true, (v) => { staggered = v; replay(); });
    button(stage.bar, 'replay', replay);
  } else {
    stage.every(3600, replay);
    stage.say("stagger({ each: 400, by: 'series', roles: 'line' })");
  }
  return () => stage.dispose();
};

export default mount;
