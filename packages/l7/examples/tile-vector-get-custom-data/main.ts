// mvt parser getCustomData: the page answers every tile request itself
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { byId, tileLayers } from '../../shared/tile-data.ts';
import { encodeTile } from '../../shared/tile-mvt.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.2 : 3.8 }),
  });
  await stage.ready(scene);

  const out = stage.readout();
  let answered = 0;
  const layer = new PolygonLayer({ featureId: 'id', sourceLayer: 'countries' })
    // The URL is never requested while getCustomData is set.
    .source('custom://tiles/{z}/{x}/{y}', {
      parser: {
        type: 'mvt',
        maxZoom: 9,
        extent: [-180, -85.051129, 179, 85.051129],
        getCustomData: (tile: { x: number; y: number; z: number }, cb: (err: unknown, data?: ArrayBuffer) => void) => {
          const timer = setTimeout(() => {
            if (stage.disposed) return;
            answered++;
            if (out) out.textContent = `getCustomData answered ${answered} tiles, last ${tile.z}/${tile.x}/${tile.y}`;
            cb(null, encodeTile(tile, tileLayers));
          }, 200);
          stage.own(() => clearTimeout(timer));
        },
      },
    })
    .color('id', byId);
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, [12, 47], 3);

  return () => stage.dispose();
};

export default mount;
