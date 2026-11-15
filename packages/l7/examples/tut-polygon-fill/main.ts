// Tutorial polygon fill: quantile-coloured density with a dashed border layer on top
import { LineLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions, drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [14, 50],
      zoom: ctx.preview ? 1.9 : 3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // Stands in for the docs' US state-density GeoJSON: European countries with a density field.
  const data = regions();
  const color = ['rgb(255,255,217)', 'rgb(237,248,177)', 'rgb(199,233,180)', 'rgb(127,205,187)', 'rgb(65,182,196)', 'rgb(29,145,192)', 'rgb(34,94,168)', 'rgb(12,44,132)'];
  const layer = new PolygonLayer().source(data).scale('density', { type: 'quantile' }).color('density', color).shape('fill').active(true);
  const lines = new LineLayer({ zIndex: 2 }).source(data).color('#fff').active(true).size(1).style({ lineType: 'dash', dashArray: [2, 2] });
  scene.addLayer(layer);
  scene.addLayer(lines);
  if (stage.preview) drift(stage, scene, [14, 50]);

  return () => stage.dispose();
};

export default mount;
