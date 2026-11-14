// Fp64Extension: a metre-spaced grid of points at the highest zoom, 32 vs 64-bit
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { Fp64Extension } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import type { LngLat } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

// A 24 x 24 grid, about one metre apart, near a longitude with plenty of mantissa to lose
const ORIGIN: LngLat = [116.391234, 39.907654];
const STEP = 0.000011;
const grid: LngLat[] = Array.from({ length: 576 }, (_, i) => [ORIGIN[0] + (i % 24) * STEP, ORIGIN[1] + Math.floor(i / 24) * STEP * 0.78]);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#14202e' });
  let use64 = true;

  const layers = () => [
    new ScatterplotLayer<LngLat>({
      id: `grid-${use64}`,
      data: grid,
      getPosition: (d) => d,
      getRadius: 0.3,
      radiusUnits: 'meters',
      getFillColor: use64 ? [90, 220, 150] : [255, 140, 70],
      // Fp64Extension needs coordinateSystem 'lnglat' (the default) in a MapView
      extensions: use64 ? [new Fp64Extension()] : [],
    }),
  ];

  const view = { longitude: ORIGIN[0] + 12 * STEP, latitude: ORIGIN[1] + 12 * STEP * 0.78, zoom: ctx.preview ? 19.3 : 20, maxZoom: 24 };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      use64 = Math.floor(t / 2.5) % 2 === 0;
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    const note = readout(el, 'green: with Fp64Extension, orange: default 32-bit projection');
    check(bar, 'Fp64Extension', true, (v) => {
      use64 = v;
      note.textContent = v ? 'green: with Fp64Extension' : 'orange: default 32-bit projection';
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
