// A flat PolygonLayer: filled and stroked city blocks coloured by value, tooltip
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { HOME, blocks, type Block } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 12.2 : 12.8, bearing: 0 };

  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    getTooltip: ({ object }) => (object ? `${(object as Block).name}: ${Math.round((object as Block).value * 100)}%` : null),
    layers: [
      new PolygonLayer<Block>({
        id: 'blocks',
        data: blocks(7, 6),
        // Each Block's `polygon` is one ring of [lng, lat] points, first point repeated.
        getPolygon: (d) => d.polygon,
        filled: true,
        getFillColor: (d) => [40 + d.value * 215, 120 + d.value * 60, 230 - d.value * 170, 200],
        stroked: true,
        getLineColor: [255, 255, 255, 230],
        getLineWidth: 12,
        lineWidthMinPixels: 1,
        pickable: true,
        autoHighlight: true,
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, bearing: Math.sin(t * 0.35) * 20 } }))
    : () => {};

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
