// aspectRatio: the host derives the height from the container width instead of a fixed height
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const definition = defineChart({
    marks: [lineY(signups, { x: 'month', y: 'value', stroke: '#60a5fa', points: true })],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
  });
  const options = (aspectRatio: number) => ({
    definition,
    aspectRatio,
    initialWidth: 640,
    ariaLabel: 'Signups',
    onRender: ({ scene }: { scene: { width: number; height: number } }) => stage.say(`aspectRatio ${aspectRatio.toFixed(2)}: ${Math.round(scene.width)} x ${Math.round(scene.height)}`),
  });
  const host = stage.own(mountChart(stage.box, options(2)));
  const set = (ratio: number): void => host.update(options(ratio));
  if (stage.bar) slider(stage.bar, 'aspect ratio', 0.8, 4, 0.1, 2, set, (v) => v.toFixed(1));
  else stage.cycle([3, 1.6, 2.4], 1800, set);
  return () => stage.dispose();
};

export default mount;
