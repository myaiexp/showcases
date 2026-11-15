// voronoi z: a separate full-plot tessellation per group, which overlap, against color alone
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { voronoi } from '@tanstack/charts/spatial/voronoi';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cars } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cars(45, 8).map((c) => ({ ...c, group: `${c.cylinders} cyl` }));
type Mode = 'shared' | 'z';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (mode: Mode) =>
    defineChart({
      svgAnimation: true,
      marks: [
        voronoi(rows, {
          x: 'weight',
          y: 'economy',
          key: 'id',
          color: 'group',
          ...(mode === 'z' ? { z: 'group' } : {}),
          fillOpacity: mode === 'z' ? 0.1 : 0.2,
          stroke: '#fff',
          strokeOpacity: 0.4,
        }),
        dot(rows, { x: 'weight', y: 'economy', key: 'id', color: 'group', r: 3 }),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear, nice: true },
      },
    });

  const options = (mode: Mode) => ({ definition: build(mode), height: stage.height, ariaLabel: 'Voronoi cells with and without groups' });
  const host = stage.own(mountChart(stage.box, options('shared')));
  const modes: readonly (readonly [Mode, string])[] = [['shared', 'one partition, color only'], ['z', "z: one tessellation per group"]];
  const show = (mode: Mode): void => {
    host.update(options(mode));
    stage.say(mode === 'z' ? 'Each group fills the whole plot, so the three diagrams overlap.' : 'All cars share one partition; color only paints it.');
  };
  if (stage.bar) select(stage.bar, 'topology', modes, show);
  else stage.cycle(modes.map((m) => m[0]), 2200, show);
  return () => stage.dispose();
};

export default mount;
