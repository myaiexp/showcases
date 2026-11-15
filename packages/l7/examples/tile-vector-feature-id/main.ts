// featureId makes a feature cut across tiles highlight as one
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { tour } from '../../shared/layer-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { tileLayers } from '../../shared/tile-data.ts';
import { encodeTile } from '../../shared/tile-mvt.ts';
import { serve, tileOf } from '../../shared/tile-serve.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.2 : 3.8 }),
  });
  await stage.ready(scene);

  serve(stage, 'l7demo-featureid', (url) => encodeTile(tileOf(url), tileLayers));

  const layer = new PolygonLayer({ featureId: 'id', sourceLayer: 'countries' })
    .source('l7demo-featureid://tiles', { parser: { type: 'mvt', maxZoom: 9, extent: [-180, -85.051129, 179, 85.051129] } })
    .color('#4a6a8a')
    .style({ opacity: 1 })
    .active({ color: '#ffd166' });
  scene.addLayer(layer);

  const out = stage.readout();
  layer.on('mousemove', (e: { featureId?: number; feature?: { properties?: { name?: string } } }) => {
    if (out) out.textContent = `featureId: ${e.featureId}  name: ${e.feature?.properties?.name}`;
  });
  if (ctx.preview) tour(stage, scene, [[10, 51], [2, 46.5], [19, 52], [12.5, 42.5]], { clickEvery: 99 });

  return () => stage.dispose();
};

export default mount;
