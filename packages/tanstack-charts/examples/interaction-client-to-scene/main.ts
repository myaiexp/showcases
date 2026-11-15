// host.interaction.clientToScene and resolvePointer, read back on every pointer move
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';
import { traffic } from '../../shared/interact-data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over the chart and read the three conversions.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  show('move over the chart');

  const definition = defineChart({
    marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
    scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true } },
    focus: 'group-x',
    tooltip,
  });
  const host = stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' }));

  stage.box.addEventListener(
    'pointermove',
    (e) => {
      const scene = host.interaction.clientToScene(e.clientX, e.clientY);
      const hit = host.interaction.resolvePointer(e.clientX, e.clientY);
      const lines = [
        `client: ${Math.round(e.clientX)}, ${Math.round(e.clientY)}`,
        `scene: ${scene ? `${scene.x.toFixed(1)}, ${scene.y.toFixed(1)}` : 'outside'}`,
        `primary: ${hit ? `${hit.point.datum.series} ${hit.point.datum.month} = ${hit.point.datum.value}` : 'none'}`,
        `group: ${hit ? hit.points.length : 0} point(s)`,
      ];
      show(stage.preview ? `scene ${scene ? `${scene.x.toFixed(0)}, ${scene.y.toFixed(0)}` : '-'}` : lines.join('\n'));
    },
    { signal: stage.signal },
  );
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
