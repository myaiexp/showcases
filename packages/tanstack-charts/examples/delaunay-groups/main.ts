// delaunayLink z: each group is triangulated alone, so links never cross groups
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { delaunayLink } from '@tanstack/charts/spatial/delaunay';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { cars } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cars(70, 8).map((c) => ({ ...c, group: `${c.cylinders} cyl` }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (grouped: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [
        delaunayLink(rows, { x: 'weight', y: 'economy', key: 'id', ...(grouped ? { z: 'group' } : {}), strokeOpacity: 0.7 }),
        dot(rows, { x: 'weight', y: 'economy', key: 'id', color: 'group', r: 3 }),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear, nice: true },
      },
    });

  const options = (grouped: boolean) => ({ definition: build(grouped), height: stage.height, ariaLabel: 'Delaunay links per group' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const show = (grouped: boolean): void => {
    host.update(options(grouped));
    stage.say(grouped ? "z: 'group' - three separate triangulations, links keep their group color." : 'No z - one triangulation joins all cars.');
  };
  if (stage.bar) checkbox(stage.bar, 'triangulate per group', true, show);
  else stage.cycle([true, false], 2200, show);
  return () => stage.dispose();
};

export default mount;
