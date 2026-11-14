// A SolidPolygonLayer: fill only, with holes from an array of rings and no outlines
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { SolidPolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { HOME, ngon, PALETTE, type Rgb } from '../../shared/core-layers-geometry.ts';
import type { LngLat } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

interface Ring {
  color: Rgb;
  rings: LngLat[][];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 11.8 : 12.4, bearing: 0 };
  // Annuli of 3..8 corners: the second ring of each polygon is a hole.
  const data: Ring[] = Array.from({ length: 6 }, (_, i) => {
    const c: LngLat = [HOME[0] + (i - 2.5) * 0.03, HOME[1] + (i % 2 === 0 ? 0.008 : -0.008)];
    return { color: PALETTE[i]!, rings: [ngon(c, 0.0125, i + 3, Math.PI / 2), ngon(c, 0.006, i + 3, Math.PI / 2)] };
  });

  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [
      new SolidPolygonLayer<Ring>({
        id: 'solid',
        data,
        getPolygon: (d) => d.rings,
        filled: true,
        getFillColor: (d) => [...d.color, 210],
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, bearing: Math.sin(t * 0.4) * 25 } }))
    : () => {};

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
