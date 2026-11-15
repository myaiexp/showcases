// Tutorial polygon extrude style mapTexture: a drawn gradient texture on floating columns
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions, orbit } from '../../shared/polygon-data.ts';
import { drawImage } from '../../shared/images.ts';
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

  // Stands in for the docs' texture image: a diagonal stripe pattern drawn on a canvas.
  const texture = drawImage(64, (g, s) => {
    g.fillStyle = '#0a6a8c';
    g.fillRect(0, 0, s, s);
    g.strokeStyle = '#7fe3ff';
    g.lineWidth = 6;
    for (let i = -s; i < s * 2; i += 16) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + s, s); g.stroke(); }
  });
  const layer = new PolygonLayer()
    .source(regions(['France', 'Germany', 'Spain', 'Italy', 'Poland', 'United Kingdom']))
    .size(150000)
    .shape('extrude')
    .color('#0DCCFF')
    .style({ heightfixed: true, pickLight: true, raisingHeight: 200000, mapTexture: texture, sourceColor: '#333', targetColor: '#fff' });
  scene.addLayer(layer);
  if (stage.preview) orbit(stage, scene, { pitch: 50 });

  return () => stage.dispose();
};

export default mount;
