// GlobeView: the shared world on a 3D globe, with a polygon for the ocean to stop see-through
import { Deck, _GlobeView as GlobeView } from '@deck.gl/core';
import { ScatterplotLayer, SolidPolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#05080d' });
  if (!ctx.preview) readout(el, 'Drag to turn the globe; shift-drag or right-drag to change bearing and pitch.');

  const deck = new Deck({
    device: stage.device,
    views: new GlobeView({ id: 'globe', controller: !ctx.preview }),
    initialViewState: { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.2 : 0.9 },
    layers: [
      // Without a surface, the far side of the earth shows through the near side.
      new SolidPolygonLayer<[number, number][]>({
        id: 'ocean',
        data: [[[-180, 90], [0, 90], [180, 90], [180, -90], [0, -90], [-180, -90]]],
        getPolygon: (d) => d,
        filled: true,
        getFillColor: [11, 22, 34],
      }),
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 50_000,
        radiusMinPixels: 2,
        getFillColor: [255, 170, 70],
      }),
    ],
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { longitude: wrapLng(20 + t * 14), latitude: 22 + Math.sin(t * 0.4) * 14, zoom: 0.2 } })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
