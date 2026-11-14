// One LightingEffect holding an ambient, two directional and two point lights under custom keys
import { AmbientLight, Deck, DirectionalLight, LightingEffect, PointLight } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { buildings, offsetMetres, SCENE_CENTER, type Building } from '../../shared/effects-buildings.ts';
import { animate, createStage } from '../../shared/stage.ts';

const BUILDINGS = buildings();

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1722' });
  const view: MapViewState = { longitude: SCENE_CENTER[0], latitude: SCENE_CENTER[1], zoom: ctx.preview ? 13.7 : 14.5, pitch: 55, bearing: 10 };
  const [wl, wa] = offsetMetres(-300, 250);
  const [el2, ea] = offsetMetres(300, -250);

  // The keys are arbitrary: LightingEffect sorts the values by their type.
  const lights = {
    ambient: new AmbientLight({ color: [255, 255, 255], intensity: 0.25 }),
    'sun left': new DirectionalLight({ color: [255, 150, 80], intensity: 1.6, direction: [1, -0.4, -0.8] }),
    'sun right': new DirectionalLight({ color: [90, 140, 255], intensity: 1.6, direction: [-1, 0.4, -0.8] }),
    'lamp west': new PointLight({ color: [255, 80, 120], intensity: 4, position: [wl, wa, 140], attenuation: [1, 0, 0.00001] }),
    'lamp east': new PointLight({ color: [80, 255, 160], intensity: 4, position: [el2, ea, 140], attenuation: [1, 0, 0.00001] }),
  };
  const enabled: Record<string, boolean> = Object.fromEntries(Object.keys(lights).map((k) => [k, true]));
  const effect = (): LightingEffect => new LightingEffect(Object.fromEntries(Object.entries(lights).filter(([k]) => enabled[k])));

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [effect()],
    layers: [
      new PolygonLayer<Building>({ id: 'buildings', data: BUILDINGS, getPolygon: (d) => d.polygon, extruded: true, getElevation: (d) => d.height, getFillColor: [225, 225, 230] }),
    ],
  });

  const stops: (() => void)[] = [];
  if (ctx.preview) {
    stops.push(animate((t) => {
      const keys = Object.keys(lights);
      // Light up one source at a time, then all of them.
      const phase = Math.floor(t / 1.5) % (keys.length + 1);
      for (const [i, k] of keys.entries()) enabled[k] = phase === keys.length || i === phase || k === 'ambient';
      deck.setProps({ effects: [effect()] });
    }));
  } else {
    const bar = controlBar(el);
    for (const key of Object.keys(lights)) {
      check(bar, key, true, (v) => {
        enabled[key] = v;
        deck.setProps({ effects: [effect()] });
      });
    }
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
