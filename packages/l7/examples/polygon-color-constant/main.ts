// PolygonLayer color(string): the same colour on every polygon, in three notations
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions } from '../../shared/polygon-data.ts';
import { select } from '../../shared/controls.ts';
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

  const notes = { 'hex #ff6b6b': '#ff6b6b', 'rgb(79, 195, 247)': 'rgb(79, 195, 247)', 'rgba(255, 209, 102, 0.6)': 'rgba(255, 209, 102, 0.6)', 'name: orchid': 'orchid' } as const;
  const keys = Object.keys(notes) as (keyof typeof notes)[];
  const layer = new PolygonLayer().source(regions()).shape('fill').color('#ff6b6b');
  scene.addLayer(layer);
  const set = (k: keyof typeof notes): void => { layer.color(notes[k]); };
  if (stage.bar) select(stage.bar, 'colour', keys, keys[0] ?? 'hex #ff6b6b', (k) => { set(k); scene.render(); });
  else stage.every(1400, (i) => { set(keys[i % keys.length] ?? 'hex #ff6b6b'); scene.render(); });

  return () => stage.dispose();
};

export default mount;
