// Custom animation: a frame loop re-creates the layer with a new radiusScale and opacity
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 25, zoom: ctx.preview ? 0.6 : 1.4 };
  let period = 2;
  let paused = false;
  let frozenT = 0;
  const label = ctx.preview ? null : readout(el);

  const layers = (t: number) => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'pulse',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      // The accessor never changes. Only uniforms below move, so no attribute is recomputed.
      getRadius: (d) => Math.sqrt(d.population) * 40_000,
      getFillColor: [255, 140, 60],
      radiusScale: 0.4 + 0.6 * (0.5 + 0.5 * Math.sin((t / period) * Math.PI * 2)),
      opacity: 0.45 + 0.4 * (0.5 + 0.5 * Math.cos((t / period) * Math.PI * 2)),
      radiusMinPixels: 2,
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers(0) });
  const stop = animate((t) => {
    if (paused) return;
    frozenT = t;
    deck.setProps({ layers: layers(t) });
    if (label) label.textContent = `t = ${t.toFixed(1)} s  radiusScale and opacity set every frame`;
  });

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'period s', 0.5, 6, 0.5, period, (v) => (period = v));
    check(bar, 'paused', false, (v) => {
      paused = v;
      if (v && label) label.textContent = `paused at t = ${frozenT.toFixed(1)} s`;
    });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
