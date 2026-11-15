// Tutorial polygon extrude: heightfixed countries lifted off the map by raisingHeight
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions, orbit } from '../../shared/polygon-data.ts';
import { slider } from '../../shared/controls.ts';
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
      pitch: 50,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new PolygonLayer()
    .source(regions())
    .shape('extrude')
    .size(150000)
    .color('density', ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494'])
    .style({ heightfixed: true, raisingHeight: 300000 });
  scene.addLayer(layer);
  if (stage.bar) slider(stage.bar, 'raisingHeight (km)', [0, 1000, 25], 300, (v) => { layer.style({ raisingHeight: v * 1000 }); scene.render(); });
  else orbit(stage, scene, { pitch: 50 });

  return () => stage.dispose();
};

export default mount;
