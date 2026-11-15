// geojsonvtOptions.extent: the integer grid of each tile
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

  const make = (extent: number): ILayer => {
    const source = new Source(countries, {
      parser: { type: 'geojsonvt', maxZoom: 9, geojsonvtOptions: { extent, tolerance: 0 } },
    });
    return new PolygonLayer({ featureId: 'id' }).source(source).color('id', byId).style({ opacity: 1 });
  };
  const show = swapTiles(stage, scene);
  show(make(4096));

  const set = (extent: number): void => {
    show(make(extent));
  };
  if (stage.bar) select(stage.bar, 'extent', ['4096', '1024', '256', '64', '16'], '4096', (v) => set(Number(v)));
  else cycle(stage, scene, [4096, 64, 16, 256], 1500, set);

  return () => stage.dispose();
};

export default mount;
