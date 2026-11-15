// densityContour weight: observations count in proportion to a weight channel
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { densityContour } from '@tanstack/charts/spatial/density';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { penguins } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = penguins(60).map((p) => ({ ...p, weight: p.species === 'Gentoo' ? 3 : 1 }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (weighted: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [
        // Weighted levels are in weighted observations per pixel squared, so they are chosen by count here.
        densityContour(rows, {
          x: 'billLength',
          y: 'billDepth',
          bandwidth: 14,
          thresholds: 7,
          ...(weighted ? { weight: 'weight' } : {}),
          fill: '#f472b6',
          fillOpacity: 0.12,
          stroke: '#f9a8d4',
        }),
        dot(rows, { x: 'billLength', y: 'billDepth', r: 2, color: 'species', fillOpacity: 0.8 }),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear, nice: true },
      },
    });

  const options = (weighted: boolean) => ({ definition: build(weighted), height: stage.height, ariaLabel: 'Weighted density contours' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const show = (weighted: boolean): void => {
    host.update(options(weighted));
    stage.say(weighted ? 'weight: Gentoo rows count three times.' : 'No weight: every row counts once.');
  };
  if (stage.bar) checkbox(stage.bar, 'Gentoo weighs 3x', true, show);
  else stage.cycle([true, false], 2000, show);
  return () => stage.dispose();
};

export default mount;
