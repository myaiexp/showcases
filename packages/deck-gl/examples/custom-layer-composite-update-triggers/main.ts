// Forwarding updateTriggers through a composite layer: remap the parent's names to the sublayer's
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, select } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { TintedDotLayer } from './tinted-dot-layer.ts';

type Tint = 'population' | 'latitude' | 'longitude';
const TINTS: readonly Tint[] = ['population', 'latitude', 'longitude'];

function colorOf(d: City, tint: Tint): Color {
  const t =
    tint === 'population' ? Math.min(1, d.population / 30)
    : tint === 'latitude' ? (d.coordinates[1] + 40) / 100
    : (d.coordinates[0] + 160) / 330;
  return [Math.round(255 * t), Math.round(120 + 100 * (1 - Math.abs(t - 0.5) * 2)), Math.round(255 * (1 - t)), 230];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };
  const state = { tint: 'population' as Tint, remap: true };

  const layer = (): TintedDotLayer<City> =>
    new TintedDotLayer<City>({
      id: 'tinted',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getDotRadius: (d) => Math.sqrt(d.population) * 40_000,
      // The accessor is a new closure each render, which the prop type ignores: only the
      // trigger value says "recompute".
      getDotColor: (d) => colorOf(d, state.tint),
      remapTriggers: state.remap,
      updateTriggers: { getDotColor: state.tint },
    });
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), layer()],
  });
  const refresh = (): void => deck.setProps({ layers: [landLayer(), layer()] });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      const tint = TINTS[Math.floor(t / 1.6) % TINTS.length]!;
      deck.setProps({ viewState: { ...view, longitude: wrapLng(20 + t * 5) } });
      if (tint !== state.tint) {
        state.tint = tint;
        refresh();
      }
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'colour by', TINTS, (v) => {
      state.tint = v;
      refresh();
    });
    check(bar, 'remapTriggers', state.remap, (v) => {
      state.remap = v;
      refresh();
    });
    readout(el, 'Turn remapTriggers off: updateTriggers.getDotColor never reaches the ScatterplotLayer, so the colours stay put.');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
