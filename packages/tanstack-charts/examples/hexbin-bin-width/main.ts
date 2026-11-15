// hexbin binWidth: the horizontal pixel distance between bin centers, so bins re-form as it changes
import { defineChart, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { hexbin } from '@tanstack/charts/spatial/hexbin';
import { scaleSequential } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { heat } from '../../shared/marks2-color.ts';
import { cars } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cars(600, 5);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let binWidth = 24;

  const build = () =>
    defineChart({
      svgAnimation: true,
      marks: [hexbin(rows, { x: 'weight', y: 'economy', binWidth, color: 'count', stroke: '#111' })],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear, nice: true },
      },
      color: { scale: () => scaleSequential(heat) },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Hexagonal bins at a chosen width' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`binWidth ${binWidth}px`);
  };
  refresh();
  if (stage.bar) slider(stage.bar, 'binWidth', 8, 60, 2, binWidth, (x) => { binWidth = x; refresh(); }, (x) => `${x}px`);
  else stage.cycle([24, 12, 40, 18], 1700, (w) => { binWidth = w; refresh(); });
  return () => stage.dispose();
};

export default mount;
