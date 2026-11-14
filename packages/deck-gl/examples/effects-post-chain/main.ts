// Several PostProcessEffects in one Deck: they run in order, each on the previous one's output
import { Deck, PostProcessEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { hueSaturation, noise, sepia, vignette } from '@luma.gl/effects';
import type { ShaderPass } from '@luma.gl/shadertools';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 28, zoom: ctx.preview ? 1 : 1.6 };

  const effects = {
    hueSaturation: new PostProcessEffect(hueSaturation, { hue: 0.1, saturation: 0.3 }),
    sepia: new PostProcessEffect(sepia, { amount: 0.6 }),
    vignette: new PostProcessEffect(vignette, { radius: 0.6, amount: 0.7 }),
    noise: new PostProcessEffect(noise, { amount: 0.12 }),
  };
  type Name = keyof typeof effects;
  const NAMES = Object.keys(effects) as Name[];
  const enabled = new Set<Name>(['sepia', 'vignette']);
  const active = (): PostProcessEffect<ShaderPass>[] => NAMES.filter((n) => enabled.has(n)).map((n) => effects[n]);

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: active(),
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 50_000,
        getFillColor: [255, 150, 70],
        radiusMinPixels: 4,
      }),
    ],
  });
  const summary = (): string => `effects: [${NAMES.filter((n) => enabled.has(n)).join(', ') || 'none'}]`;

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(20 + t * 4) } }));
    let i = 0;
    // Switch the chain between a few combinations.
    const combos: Name[][] = [['sepia'], ['sepia', 'vignette'], ['hueSaturation', 'vignette', 'noise'], ['noise']];
    timer = window.setInterval(() => {
      enabled.clear();
      for (const n of combos[++i % combos.length]!) enabled.add(n);
      deck.setProps({ effects: active() });
    }, 1800);
  } else {
    const bar = controlBar(el);
    const line = readout(el, summary());
    const update = (): void => {
      deck.setProps({ effects: active() });
      line.textContent = summary();
    };
    for (const n of NAMES) {
      check(bar, n, enabled.has(n), (v) => {
        if (v) enabled.add(n);
        else enabled.delete(n);
        update();
      });
    }
    slider(bar, 'sepia amount', 0, 1, 0.05, 0.6, (v) => {
      effects.sepia.setProps({ amount: v });
      deck.redraw('sepia amount');
    });
    slider(bar, 'vignette amount', 0, 1, 0.05, 0.7, (v) => {
      effects.vignette.setProps({ radius: 0.6, amount: v });
      deck.redraw('vignette amount');
    });
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
