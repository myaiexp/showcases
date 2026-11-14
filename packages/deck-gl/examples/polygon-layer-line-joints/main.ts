// PolygonLayer outline joints: lineJointRounded, lineMiterLimit, lineAntialiasing
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { HOME, ngon, PALETTE, type Rgb } from '../../shared/core-layers-geometry.ts';
import type { LngLat } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

interface Star {
  color: Rgb;
  ring: LngLat[];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 11.6 : 12.2 };
  // Stars with a deeper and deeper dent: sharper corners for the miter limit to cut.
  const data: Star[] = [0.6, 0.45, 0.3, 0.15].map((inner, i) => ({
    color: PALETTE[i + 1]!,
    ring: ngon([HOME[0] + (i - 1.5) * 0.04, HOME[1]], 0.016, 5, Math.PI / 2, inner),
  }));
  const state = { round: false, miter: 4, aa: false };

  const build = (): PolygonLayer<Star> =>
    new PolygonLayer<Star>({
      id: 'stars',
      data,
      getPolygon: (d) => d.ring,
      getFillColor: (d) => [...d.color, 70],
      getLineColor: (d) => d.color,
      getLineWidth: 7,
      lineWidthUnits: 'pixels',
      // true: round joints. false: mitered joints, cut off past lineMiterLimit.
      lineJointRounded: state.round,
      lineMiterLimit: state.miter,
      lineAntialiasing: state.aa,
    });
  const update = (): void => deck.setProps({ layers: [build()] });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [build()],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state.round = Math.floor(t / 2.5) % 2 === 1;
      state.miter = 1 + 3 * Math.abs(Math.sin(t * 0.7));
      update();
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'lineJointRounded', false, (v) => { state.round = v; update(); });
    slider(bar, 'lineMiterLimit', 1, 10, 0.5, 4, (v) => { state.miter = v; update(); });
    check(bar, 'lineAntialiasing', false, (v) => { state.aa = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
