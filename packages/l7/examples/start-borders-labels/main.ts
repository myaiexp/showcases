// Fill + LineLayer borders + text PointLayer labels, the quick start's finished map
import { LineLayer, PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { labelPoints } from '../../shared/layer-demo.ts';
import { drift } from '../../shared/point-data.ts';
import { regions } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.5 : 3.3 }),
  });
  await stage.ready(scene);

  const data = regions();
  const fill = new PolygonLayer({})
    .source(data)
    .color('name', ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(49,130,189)', 'rgb(8,81,156)']);
  const border = new LineLayer({ zIndex: 2 }).source(data).size(0.8).shape('line').color('#ffffff').style({ opacity: 0.7 });
  const labels = new PointLayer({ zIndex: 3 })
    .source(labelPoints(data), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('name', 'text')
    .size(ctx.preview ? 9 : 12)
    .color('#102a43')
    .style({ stroke: '#ffffff', strokeWidth: 1.2 });
  for (const l of [fill, border, labels]) scene.addLayer(l);

  if (stage.preview) drift(stage, scene, [15, 50], 4);

  return () => stage.dispose();
};

export default mount;
