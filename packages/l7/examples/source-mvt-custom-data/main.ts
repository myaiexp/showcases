// MVT parser getCustomData: you hand L7 each tile, made in code
import { PolygonLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { encodeTile } from '../../shared/tile-mvt.ts';
import { countryTiles } from '../../shared/source-demo.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [11, 47], zoom: ctx.preview ? 3.4 : 4.2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const show = valuePanel(stage.container, 'bl');
  let served = 0;
  let failed = 0;
  let failSome = false;
  let last = '';
  // The docs' "custom method": instead of a URL, getCustomData(tile, callback) supplies the bytes.
  const source = new Source('custom://tiles/{z}/{x}/{y}.pbf', {
    parser: {
      type: 'mvt',
      tileSize: 256,
      maxZoom: 9,
      getCustomData: (tile: { x: number; y: number; z: number }, cb: (err: Error | null, data?: ArrayBuffer) => void) => {
        last = `${tile.z}/${tile.x}/${tile.y}`;
        // Pretend latency, then either the tile or an error (err set: L7 leaves a hole).
        setTimeout(() => {
          if (stage.disposed) return;
          if (failSome && (tile.x + tile.y) % 3 === 0) {
            failed += 1;
            cb(new Error('no such tile'));
          } else {
            served += 1;
            cb(null, encodeTile(tile, { countries: countryTiles }));
          }
          show({ 'last tile': last, served: String(served), failed: String(failed) });
        }, 80);
      },
    },
  });
  scene.addLayer(new PolygonLayer({ featureId: 'id', sourceLayer: 'countries' }).source(source).color('id', ['#4ecdc4', '#ffd166', '#ff6b6b', '#7fb7ff', '#c792ea']).style({ opacity: 0.8 }));
  show({ 'last tile': 'none yet', served: '0', failed: '0' });

  const out = stage.readout();
  if (out) out.textContent = "parser: { type: 'mvt', getCustomData(tile, callback) }: callback(null, arrayBuffer) answers a tile, callback(err) leaves it out.";
  if (stage.bar) toggle(stage.bar, 'fail every third tile', false, (v) => (failSome = v));
  else {
    stage.every(70, (i) => scene.setCenter([11 + Math.sin(i / 40) * 4, 47]));
    stage.every(3000, () => (failSome = !failSome));
  }

  return () => stage.dispose();
};

export default mount;
