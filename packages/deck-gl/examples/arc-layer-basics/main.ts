// ArcLayer: raised arcs from three hubs, coloured source to target
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ArcLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { routes, type Route } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0 : 1, pitch: 30 };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    getTooltip: ({ object }) => (object ? `${(object as Route).from.name} to ${(object as Route).to.name}` : null),
    layers: [
      landLayer(),
      new ArcLayer<Route>({
        id: 'arcs',
        data: routes(),
        getSourcePosition: (d) => d.from.coordinates,
        getTargetPosition: (d) => d.to.coordinates,
        getSourceColor: [255, 170, 60],
        getTargetColor: [60, 200, 255],
        getWidth: 1.5,
        pickable: !ctx.preview,
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
