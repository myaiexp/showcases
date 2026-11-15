// createMarkWithScaleValues: numeric interval endpoints on the scale, a text label on the point
import { defineChart, mountChart } from '@tanstack/charts';
import type { ChartPoint, SceneNode } from '@tanstack/charts';
import { createMarkWithScaleValues } from '@tanstack/charts/mark/scale-values';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

interface Task {
  name: string;
  start: number;
  end: number;
}
const tasks: readonly Task[] = [
  { name: 'Design', start: 0, end: 9 },
  { name: 'Build', start: 6, end: 24 },
  { name: 'Test', start: 18, end: 30 },
  { name: 'Launch', start: 28, end: 33 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar: the tooltip x value is the range label, while the axis stays numeric.' });

  // Point values are strings (label, name); the x scale values are numbers (days).
  const spans = createMarkWithScaleValues<Task, string, string, number, string>(({ markIndex }) => {
    const id = `spans-${markIndex}`;
    return {
      id,
      channels: {
        x: { scale: 'x', values: tasks.flatMap((t) => [t.start, t.end]) },
        y: { scale: 'y', values: tasks.map((t) => t.name) },
      },
      render({ scales, color }) {
        const bw = scales.y!.bandwidth;
        const nodes: SceneNode[] = [];
        const points: ChartPoint<Task, string, string>[] = [];
        tasks.forEach((t, i) => {
          const x0 = scales.x!.map(t.start);
          const x1 = scales.x!.map(t.end);
          const y = scales.y!.map(t.name);
          const point: ChartPoint<Task, string, string> = {
            key: t.name, markId: id, group: null, groupLabel: 'Task', datum: t, datumIndex: i,
            xValue: `day ${t.start} to ${t.end}`, yValue: t.name, x: (x0 + x1) / 2, y: y + bw / 2, color: color(null),
          };
          points.push(point);
          nodes.push({ kind: 'rect', key: `bar-${t.name}`, x: x0, y, width: x1 - x0, height: bw, radius: 4, style: { fill: point.color }, interaction: { point, affinity: 'xy' } });
        });
        return { nodes, points };
      },
    };
  });

  const definition = defineChart({
    marks: [spans],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Day' } },
      y: { scale: () => scaleBand<string>().padding(0.25) },
    },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Task schedule' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
