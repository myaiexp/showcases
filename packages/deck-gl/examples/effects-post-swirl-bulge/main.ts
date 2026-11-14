// Warp passes from @luma.gl/effects: swirl and bulgePinch around a centre that follows the pointer
import { Deck, PostProcessEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { bulgePinch, swirl } from '@luma.gl/effects';
import type { BulgePinchProps, SwirlProps } from '@luma.gl/effects';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const MODES = ['swirl', 'bulgePinch'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 38, zoom: ctx.preview ? 2.2 : 3 };
  const state = { mode: 'swirl' as Mode, strength: 0.6, center: [0.5, 0.5] as [number, number] };

  const swirlProps = (): Required<SwirlProps> => ({ center: state.center, radius: 220, angle: state.strength * 6 });
  const bulgeProps = (): Required<BulgePinchProps> => ({ center: state.center, radius: 220, strength: state.strength * 2 - 1 });
  // Two effects, built once; the Deck's effects array says which one runs.
  const effects = { swirl: new PostProcessEffect(swirl, swirlProps()), bulgePinch: new PostProcessEffect(bulgePinch, bulgeProps()) };
  const apply = (): void => {
    effects.swirl.setProps(swirlProps());
    effects.bulgePinch.setProps(bulgeProps());
    deck.redraw('warp props changed');
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [effects[state.mode]],
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 30_000,
        getFillColor: [255, 150, 70],
        radiusMinPixels: 3,
      }),
    ],
  });

  // The centre is in 0..1 of the canvas, y from the bottom.
  const onMove = (e: PointerEvent): void => {
    const r = stage.box.getBoundingClientRect();
    state.center = [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height];
    apply();
  };
  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state.center = [0.5 + 0.28 * Math.cos(t * 0.8), 0.5 + 0.28 * Math.sin(t * 1.1)];
      state.strength = 0.5 + 0.5 * Math.sin(t * 0.6);
      apply();
    });
  } else {
    stage.box.addEventListener('pointermove', onMove);
    const bar = controlBar(el);
    select(bar, 'effect', MODES, (v) => {
      state.mode = v;
      deck.setProps({ effects: [effects[v]] });
    });
    slider(bar, 'strength', 0, 1, 0.05, state.strength, (v) => {
      state.strength = v;
      apply();
    });
    readout(el, 'Move the pointer over the map: the effect centre follows it (normalised canvas coordinates).');
  }
  return () => {
    stop();
    stage.box.removeEventListener('pointermove', onMove);
    stage.release(deck);
  };
};

export default mount;
