// LineLayer: straight lines from source to target, coloured and sized each
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { LineLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { routes, type Route } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0 : 1 };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new LineLayer<Route>({
        id: 'lines',
        data: routes(['London', 'Singapore', 'Los Angeles'], 5),
        getSourcePosition: (d) => d.from.coordinates,
        getTargetPosition: (d) => d.to.coordinates,
        getColor: (d) => [255, 120 + d.flights * 2, 70, 140 + d.flights * 1.5],
        getWidth: (d) => 0.5 + d.flights / 30, // pixels
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...view, longitude: ((10 + t * 8 + 180) % 360) - 180 } }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
