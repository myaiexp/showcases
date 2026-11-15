// ridgelineY overlap: peak height in category steps; scale padding follows it
import { defineChart, mountChart, ridgelineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { seasonProfiles, seasons } from '../../shared/marks1-seasons.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (overlap: number) =>
    defineChart({
      svgAnimation: true,
      marks: [ridgelineY(seasonProfiles, { x: 'position', y: 'group', height: 'height', overlap, color: 'group', fillOpacity: 0.7 })],
      scales: {
        x: { scale: scaleLinear().domain([0, 10]), grid: true },
        y: { scale: scalePoint<string>().domain(seasons).padding(overlap), reverse: true },
      },
    });

  const options = { definition: chart(1.6), height: stage.height, initialWidth: 640, ariaLabel: 'Ridgeline with adjustable overlap' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (o: number): void => {
    host.update({ ...options, definition: chart(o) });
    stage.say(`overlap: ${o}`);
  };

  if (stage.bar) {
    slider(stage.bar, 'overlap', 0.4, 3, 0.1, 1.6, show);
    stage.say('overlap: 1.6');
  } else stage.cycle([0.6, 1, 1.6, 2.4], 1800, show);
  return () => stage.dispose();
};

export default mount;
