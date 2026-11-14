// PathLayer end caps and corner joints: square or round, and the miter limit
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { HOME, PALETTE, lngPerLat, type Rgb } from '../../shared/core-layers-geometry.ts';
import type { LngLat } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

interface Zig {
  color: Rgb;
  path: LngLat[];
}

/** Zigzags with sharper and sharper corners, so the miter limit has something to cut. */
function zigzags(): Zig[] {
  const out: Zig[] = [];
  for (let i = 0; i < 4; i++) {
    const rise = 0.004 + i * 0.005; // taller steps make the corners sharper
    const x0 = HOME[0] - (0.045 - i * 0.022) * lngPerLat(HOME[1]);
    const y0 = HOME[1] - 0.012;
    const path: LngLat[] = [];
    for (let k = 0; k < 5; k++) path.push([x0 + k * 0.007 * lngPerLat(HOME[1]), y0 + (k % 2 === 0 ? 0 : rise * 2.4)]);
    out.push({ color: PALETTE[i]!, path });
  }
  return out;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: 12.6 };
  const state = { capRounded: false, jointRounded: false, miterLimit: 4 };
  const data = zigzags();

  const build = (): PathLayer<Zig> =>
    new PathLayer<Zig>({
      id: 'zigzags',
      data,
      getPath: (d) => d.path,
      getColor: (d) => d.color,
      getWidth: 180,
      capRounded: state.capRounded,
      jointRounded: state.jointRounded,
      miterLimit: state.miterLimit,
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
    // Flip caps and joints together every two seconds; wiggle the miter limit.
    stop = animate((t) => {
      state.capRounded = state.jointRounded = Math.floor(t / 2) % 2 === 1;
      state.miterLimit = 1 + 3 * Math.abs(Math.sin(t * 0.8));
      update();
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'capRounded', false, (v) => { state.capRounded = v; update(); });
    check(bar, 'jointRounded', false, (v) => { state.jointRounded = v; update(); });
    slider(bar, 'miterLimit', 1, 8, 0.5, 4, (v) => { state.miterLimit = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
