// _SunLight positions a directional light from a timestamp; the slider is the hour
import { _SunLight as SunLight, AmbientLight, Deck, LightingEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { buildings, SCENE_CENTER, type Building } from '../../shared/effects-buildings.ts';
import { animate, createStage } from '../../shared/stage.ts';

const BUILDINGS = buildings();
/** The scene is in San Francisco: local time is UTC-7 in July. */
const day = (hour: number): number => Date.UTC(2024, 6, 1, hour + 7);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1722' });
  const view: MapViewState = { longitude: SCENE_CENTER[0], latitude: SCENE_CENTER[1], zoom: ctx.preview ? 13.7 : 14.5, pitch: 55, bearing: 200 };
  const label = ctx.preview ? null : readout(el);

  const effect = (hour: number): LightingEffect =>
    new LightingEffect({
      ambient: new AmbientLight({ color: [255, 255, 255], intensity: 0.4 }),
      sun: new SunLight({ timestamp: day(hour), color: [255, 235, 200], intensity: 2.5 }),
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [effect(10)],
    layers: [
      new PolygonLayer<Building>({
        id: 'buildings',
        data: BUILDINGS,
        getPolygon: (d) => d.polygon,
        extruded: true,
        getElevation: (d) => d.height,
        getFillColor: [215, 215, 220],
      }),
    ],
  });
  const set = (hour: number): void => {
    deck.setProps({ effects: [effect(hour)] });
    if (label) label.textContent = `local ${Math.floor(hour)}:${String(Math.round((hour % 1) * 60)).padStart(2, '0')}  timestamp ${day(hour)}`;
  };
  set(10);

  const stops: (() => void)[] = [];
  if (ctx.preview) stops.push(animate((t) => set(6 + ((t * 1.5) % 13))));
  else slider(controlBar(el), 'hour', 5, 20, 0.25, 10, set);
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
