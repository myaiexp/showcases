// sourceLayer picks one named layer out of the vector tiles
import { LineLayer, PointLayer, PolygonLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { byId, tileLayers } from '../../shared/tile-data.ts';
import { encodeTile } from '../../shared/tile-mvt.ts';
import { serve, swapTiles, tileOf } from '../../shared/tile-serve.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.2 : 3.8 }),
  });
  await stage.ready(scene);

  serve(stage, 'l7demo-srclayer', (url) => encodeTile(tileOf(url), tileLayers));
  const tileSource = new Source('l7demo-srclayer://tiles', { parser: { type: 'mvt', maxZoom: 9, extent: [-180, -85.051129, 179, 85.051129] } });

  const make = (sourceLayer: 'countries' | 'borders' | 'towns') => {
    if (sourceLayer === 'countries') return new PolygonLayer({ featureId: 'id', sourceLayer }).source(tileSource).color('id', byId).style({ opacity: 0.8 });
    if (sourceLayer === 'borders') return new LineLayer({ featureId: 'id', sourceLayer }).source(tileSource).color('#ffd166').size(2);
    return new PointLayer({ featureId: 'id', sourceLayer }).source(tileSource).shape('circle').color('#ff6b6b').size(5);
  };
  const show = swapTiles(stage, scene);
  show(make('countries'));

  const set = (name: 'countries' | 'borders' | 'towns'): void => {
    show(make(name));
  };
  const names = ['countries', 'borders', 'towns'] as const;
  if (stage.bar) select(stage.bar, 'sourceLayer', names, 'countries', set);
  else cycle(stage, scene, names, 1600, set);

  return () => stage.dispose();
};

export default mount;
