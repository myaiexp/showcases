// LineLayer: pickable lines, autoHighlight and an onHover readout
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { LineLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { routes, type Route } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 30, zoom: ctx.preview ? 0 : 1.2 };
  const info = ctx.preview ? null : readout(el, 'Hover a line');

  const layer = (t: number): LineLayer<Route> =>
    new LineLayer<Route>({
      id: 'lines',
      data: routes(['Dubai', 'Sydney'], 6),
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getColor: [90, 170, 255, 150],
      getWidth: 2,
      widthMinPixels: 2,
      pickable: true,
      autoHighlight: true, // the hovered line takes highlightColor
      highlightColor: [255, 210, 80, 255],
      // A card has no pointer, so the highlight index walks the data on its own.
      ...(ctx.preview ? { highlightedObjectIndex: Math.floor(t * 4) % 100 } : {}),
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    onHover: (p) => {
      const d = p.object as Route | undefined;
      if (info) info.textContent = d ? `${d.from.name} to ${d.to.name}, ${d.flights} flights a week` : 'Hover a line';
    },
    layers: [landLayer(), layer(0)],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ layers: [landLayer(), layer(t)], viewState: { ...view, longitude: ((10 + t * 6 + 180) % 360) - 180 } }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
