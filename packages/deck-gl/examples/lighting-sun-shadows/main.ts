// A SunLight with _shadow: a day's worth of timestamps sweeps the shadows across the ground
import { _SunLight as SunLight, AmbientLight, Deck, LightingEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { buildings, ground, SCENE_CENTER, type Building } from '../../shared/effects-buildings.ts';
import { animate, createStage } from '../../shared/stage.ts';

const BUILDINGS = buildings(7, 29);
const GROUND = [{ polygon: ground() }];
const day = (hour: number): number => Date.UTC(2024, 5, 21, hour + 7);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1722' });
  const view: MapViewState = { longitude: SCENE_CENTER[0], latitude: SCENE_CENTER[1], zoom: ctx.preview ? 13.7 : 14.5, pitch: 40, bearing: 0 };
  const label = ctx.preview ? null : readout(el);
  let hour = 9;
  let playing = true;
  let slide: HTMLInputElement | null = null;

  const sun = new SunLight({ timestamp: day(hour), intensity: 2.4, _shadow: true });
  const effect = new LightingEffect({ ambient: new AmbientLight({ intensity: 0.5 }), sun });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [effect],
    layers: [
      new PolygonLayer<{ polygon: Building['polygon'] }>({ id: 'ground', data: GROUND, getPolygon: (d) => d.polygon, getFillColor: [150, 158, 170] }),
      new PolygonLayer<Building>({ id: 'buildings', data: BUILDINGS, getPolygon: (d) => d.polygon, extruded: true, getElevation: (d) => d.height, getFillColor: [225, 225, 230] }),
    ],
  });
  const apply = (): void => {
    // The light is read every frame: change its timestamp and ask for a redraw.
    sun.timestamp = day(hour);
    deck.redraw('sun moved');
    if (label) label.textContent = `local ${Math.floor(hour)}:${String(Math.floor((hour % 1) * 60)).padStart(2, '0')}  (timestamp ${day(hour)})`;
  };
  apply();

  const stop = animate((t) => {
    if (!playing) return;
    hour = 7.5 + ((t * 0.9) % 11);
    if (slide) slide.value = String(hour);
    apply();
  });
  if (!ctx.preview) {
    const bar = controlBar(el);
    check(bar, 'play', true, (v) => (playing = v));
    slide = slider(bar, 'hour', 7.5, 18.5, 0.1, hour, (v) => {
      hour = v;
      playing = false;
      apply();
    });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
