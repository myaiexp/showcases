// PathLayer antialiasing: shader-computed edge coverage, and where it breaks down
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { HOME, lngPerLat } from '../../shared/core-layers-geometry.ts';
import type { LngLat } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

/** A looping rose curve that crosses itself, the case the docs warn about. */
function rose(): LngLat[] {
  const out: LngLat[] = [];
  for (let i = 0; i <= 160; i++) {
    const a = (i / 160) * Math.PI * 2;
    const r = 0.026 * Math.cos(2.5 * a * 2);
    out.push([HOME[0] + Math.cos(a) * r * lngPerLat(HOME[1]), HOME[1] + Math.sin(a) * r]);
  }
  return out;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: 12.8 };
  const state = { antialiasing: true, capRounded: false };
  const data = [{ path: rose() }];

  const build = (): PathLayer<{ path: LngLat[] }> =>
    new PathLayer<{ path: LngLat[] }>({
      id: 'rose',
      data,
      getPath: (d) => d.path,
      getColor: [255, 184, 77, 150],
      getWidth: 14,
      widthUnits: 'pixels',
      // true: edge coverage is computed in the shader. false: multisampling smooths edges.
      antialiasing: state.antialiasing,
      capRounded: state.capRounded,
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
      state.antialiasing = Math.floor(t / 2.5) % 2 === 0;
      deck.setProps({ layers: [build()] });
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'antialiasing', true, (v) => { state.antialiasing = v; deck.setProps({ layers: [build()] }); });
    check(bar, 'capRounded (smooths the flat end caps)', false, (v) => { state.capRounded = v; deck.setProps({ layers: [build()] }); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
