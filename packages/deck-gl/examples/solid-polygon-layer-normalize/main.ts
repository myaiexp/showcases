// SolidPolygonLayer _normalize: false with flat closed rings, and the _windingOrder that must match
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { SolidPolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { HOME, ngon, PALETTE, type Rgb } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Winding = 'CW' | 'CCW';
interface Prism {
  color: Rgb;
  height: number;
  /** Flat x, y numbers of one closed ring (first vertex repeated), counter-clockwise. */
  positions: Float64Array;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 11 : 12, pitch: 50, bearing: 0 };
  // ngon() walks counter-clockwise on a lng/lat plane, so these rings are CCW.
  const data: Prism[] = Array.from({ length: 5 }, (_, i) => ({
    color: PALETTE[i + 1]!,
    height: 500 + i * 250,
    positions: Float64Array.from(ngon([HOME[0] + (i - 2) * 0.03, HOME[1]], 0.012, i + 3, 0.5).flat()),
  }));
  let winding: Winding = 'CCW';

  const build = (): SolidPolygonLayer<Prism> =>
    new SolidPolygonLayer<Prism>({
      id: 'prisms',
      data,
      positionFormat: 'XY',
      getPolygon: (d) => d.positions,
      extruded: true,
      getElevation: (d) => d.height,
      getFillColor: (d) => d.color,
      // Skip normalization: rings must be closed, flat, and wound the way _windingOrder says.
      _normalize: false,
      _windingOrder: winding,
    });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [build()],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      winding = Math.floor(t / 2.5) % 2 === 0 ? 'CCW' : 'CW';
      deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, bearing: t * 12 }, layers: [build()] });
    });
  } else {
    const bar = controlBar(el);
    const info = readout(el, 'The data is counter-clockwise, so CCW is the matching setting.');
    select(bar, '_windingOrder', ['CCW', 'CW'] as const, (v) => {
      winding = v;
      deck.setProps({ layers: [build()] });
      info.textContent = v === 'CCW' ? 'Matches the data: surfaces face outward and light correctly.' : 'Does not match the data: the extruded surfaces are flipped, so culling and lighting go wrong.';
    }, 'CCW');
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
