// geojsonvtOptions.tolerance: how hard the tile cutter simplifies
import { type ILayer, PolygonLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
import { swapTiles } from '../../shared/tile-serve.ts';
import { createStage } from '../../shared/stage.ts';
import { byId } from '../../shared/tile-data.ts';
import { countries } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.2 : 3.8 }),
  });
  await stage.ready(scene);

  const make = (tolerance: number): ILayer => {
    const source = new Source(countries, {
      parser: { type: 'geojsonvt', maxZoom: 9, geojsonvtOptions: { tolerance } },
    });
    return new PolygonLayer({ featureId: 'id' }).source(source).color('id', byId).style({ opacity: 1 });
  };
  // Tiles are cut when the source is made, so each value builds a new layer.
  const show = swapTiles(stage, scene);
  show(make(3));

  const set = (tolerance: number): void => {
    show(make(tolerance));
  };
  if (stage.bar) select(stage.bar, 'tolerance', ['0', '3', '30', '100', '300'], '3', (v) => set(Number(v)));
  else cycle(stage, scene, [3, 100, 300, 0], 1500, set);

  return () => stage.dispose();
};

export default mount;
