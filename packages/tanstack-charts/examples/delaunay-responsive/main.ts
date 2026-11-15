// delaunayLink topology is computed on final screen positions, so resizing the chart can change the edges
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { delaunayLink } from '@tanstack/charts/spatial/delaunay';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cars } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cars(40, 12);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let height = stage.height;

  const definition = defineChart({
    marks: [
      delaunayLink(rows, { x: 'weight', y: 'economy', key: 'id', stroke: '#94a3b8', strokeOpacity: 0.8 }),
      dot(rows, { x: 'weight', y: 'economy', key: 'id', r: 3, fill: '#60a5fa' }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true },
      y: { scale: scaleLinear, nice: true },
    },
  });

  const options = () => ({ definition, height, initialWidth: 640, ariaLabel: 'Delaunay links that depend on aspect ratio' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`height ${height}px: the same data and domains, a different set of neighbours.`);
  };
  if (stage.bar) {
    slider(stage.bar, 'height', 120, 560, 10, height, (x) => { height = x; refresh(); }, (x) => `${x}px`);
    refresh();
  } else {
    stage.cycle([196, 90, 140], 1800, (h) => { height = h; host.update(options()); });
  }
  return () => stage.dispose();
};

export default mount;
