// The compiled scene: the plot rectangle, resolved scales and interaction points behind the drawing
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { alphabet } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar: the readout shows the focused point, which keeps the original row.' });
  const readout = stage.preview ? null : stage.readout();

  const definition = defineChart({
    marks: [barY(alphabet, { x: 'letter', y: 'frequency' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.15) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip,
  });

  type SceneInfo = { width: number; height: number; chart: { x: number; y: number; width: number; height: number }; points: readonly unknown[] };
  const describe = (scene: SceneInfo, focus = ''): string => {
    const c = scene.chart;
    return `surface ${scene.width} x ${scene.height}\nplot rectangle x ${c.x.toFixed(0)}, y ${c.y.toFixed(0)}, ${c.width.toFixed(0)} x ${c.height.toFixed(0)}\ninteraction points ${scene.points.length}${focus}`;
  };

  const host = stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      ariaLabel: 'Letter frequency',
      onRender: ({ scene }) => {
        if (readout) readout.textContent = describe(scene);
      },
      onFocusChange: (point) => {
        if (readout && point) readout.textContent = describe(host.getScene(), `\nfocused ${JSON.stringify(point.datum)}`);
      },
    }),
  );
  if (readout) readout.textContent = describe(host.getScene());
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
