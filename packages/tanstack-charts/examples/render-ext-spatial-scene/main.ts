// spatialIndex with context.scene: lookups run over painted rectangles, not anchors
import { barY, defineChart, mountChart } from '@tanstack/charts';
import type { ChartPoint, ChartSpatialIndexFactory, ChartValue, SceneNode } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const heights = walk(rng(31), 90, 40, 6).map((v) => Math.abs(v));
const rows = heights.map((value, i) => ({ id: `b${i}`, slot: `s${i}`, value }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over the bars: the readout shows the rectangle the index chose and how many it examined.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  const show = (text: string): void => {
    if (readout) readout.textContent = text;
    else stage.say(text.split('\n')[0]!);
  };

  interface Box {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    key: string;
  }
  const rectIndex =
    <D, X extends ChartValue, Y extends ChartValue>(): ChartSpatialIndexFactory<D, X, Y> =>
    (points, { scene }) => {
      const byKey = new Map<string, ChartPoint<D, X, Y>>(points.map((p) => [p.key, p]));
      const boxes: Box[] = [];
      const visit = (nodes: readonly SceneNode[], dx: number, dy: number): void => {
        for (const n of nodes) {
          if (n.kind === 'group') visit(n.children, dx + (n.translateX ?? 0), dy + (n.translateY ?? 0));
          else if (n.kind === 'rect' && n.interaction?.point) boxes.push({ x0: n.x + dx, y0: n.y + dy, x1: n.x + n.width + dx, y1: n.y + n.height + dy, key: n.interaction.point.key });
        }
      };
      visit(scene.nodes, 0, 0);
      return {
        findNearest(x, y, maxDistance = 48) {
          let best: Box | null = null;
          let bestD = maxDistance;
          for (const b of boxes) {
            const d = Math.hypot(Math.max(b.x0 - x, 0, x - b.x1), Math.max(b.y0 - y, 0, y - b.y1));
            if (d <= bestD) {
              best = b;
              bestD = d;
            }
          }
          show(`rect index: ${boxes.length} rectangles examined\nchosen ${best ? best.key : 'none'}, distance ${bestD.toFixed(1)} px`);
          return best ? (byKey.get(best.key) ?? null) : null;
        },
      };
    };

  const definition = defineChart({
    marks: [barY(rows, { x: 'slot', y: 'value', key: 'id', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.1), axis: false }, y: { scale: scaleLinear, nice: true, grid: true } },
    spatialIndex: rectIndex<(typeof rows)[number], string, number>(),
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Ninety bars' }));
  show('move over the chart');
  if (stage.preview) stage.ghost((t) => [0.1 + 0.8 * t, 0.6]);
  return () => stage.dispose();
};

export default mount;
