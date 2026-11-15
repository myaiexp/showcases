// LineLayer and PolygonLayer on the default 10000-wide plane
import { LineLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { sway } from '../../shared/exp-simple.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [6000, 6000], pitch: 0, zoom: ctx.preview ? 2 : 3, version: 'SIMPLE', pitchEnabled: false, rotateEnabled: false, maxZoom: 5, minZoom: 0 } as never),
  });
  await stage.ready(scene);

  const polygonData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { testOpacity: 0.4 },
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [[6000, 6000], [6000, 7000], [7000, 7000], [7000, 6000], [6000, 6000]],
              [[6300, 6300], [6300, 6700], [6700, 6700], [6700, 6300], [6300, 6300]],
            ],
            [[[5000, 5000], [5000, 6000], [6000, 6000], [6000, 5000], [5000, 5000]]],
          ],
        },
      },
    ],
  };
  const lineData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { testOpacity: 0.8 },
        geometry: { type: 'Polygon', coordinates: [[[6000, 6000], [6000, 7000], [7000, 7000], [7000, 6000]]] },
      },
    ],
  };
  scene.addLayer(new PolygonLayer().source(polygonData).shape('fill').color('#f00').style({ opacity: 0.6 }).active(true));
  scene.addLayer(new LineLayer().source(lineData).shape('line').size(10).color('#0f0').active(true));

  if (ctx.preview) sway(stage, scene, [6000, 6000], 500, 10000);

  return () => stage.dispose();
};

export default mount;
