// GreatCircleLayer: an ArcLayer whose arcs always follow the great circle
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { GreatCircleLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { city, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Leg {
  from: City;
  to: City;
}

const legs: Leg[] = [
  ['Tokyo', 'Los Angeles'],
  ['London', 'Auckland'],
  ['Sydney', 'Santiago'],
  ['Moscow', 'Honolulu'],
  ['New York', 'Singapore'],
  ['Helsinki', 'Anchorage'],
].map(([a, b]) => ({ from: city(a!), to: city(b!) }));

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0 : 0.9 };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new GreatCircleLayer<Leg>({
        id: 'routes',
        data: legs,
        getSourcePosition: (d) => d.from.coordinates,
        getTargetPosition: (d) => d.to.coordinates,
        getSourceColor: [255, 190, 70],
        getTargetColor: [90, 210, 255],
        getWidth: 3,
        getHeight: 0, // flat on the map: the great-circle path is the whole story
      }),
    ],
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, longitude: ((20 + t * 6 + 180) % 360) - 180 } })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
