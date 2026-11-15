// compositeMark: a reusable frame plus dots, with the parent id namespacing the children
import { compositeMark, defineChart, dot, frame, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { cloud } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cloud(70, 11);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot. The readout shows the ids the composite gave its children.' });
  const readout = stage.preview ? null : stage.readout();

  const framedPoints = compositeMark(
    [frame({ id: 'border', stroke: '#60a5fa', strokeOpacity: 0.5, radius: 6 }), dot(rows, { id: 'points', x: 'x', y: 'y', key: 'id', r: 4, fill: '#60a5fa', fillOpacity: 0.8 })],
    { id: 'framed-points' },
  );

  const definition = defineChart({
    marks: [framedPoints],
    scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  const host = stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Framed scatter' }));
  if (readout) {
    const scene = host.getScene();
    const keys = scene.nodes.slice(0, 3).map((n) => n.key);
    readout.textContent = `point markId: ${scene.points[0]?.markId}\npoint key: ${scene.points[0]?.key}\nfirst scene node keys: ${keys.join(', ')}`;
  }
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
