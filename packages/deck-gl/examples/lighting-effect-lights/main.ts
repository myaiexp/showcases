// LightingEffect with custom Ambient and Directional lights versus the defaults
import { AmbientLight, Deck, DirectionalLight, LightingEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { buildings, ground, SCENE_CENTER, type Building } from '../../shared/effects-buildings.ts';
import { animate, createStage } from '../../shared/stage.ts';

const BUILDINGS = buildings();
const GROUND = ground();

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1722' });
  const view: MapViewState = { longitude: SCENE_CENTER[0], latitude: SCENE_CENTER[1], zoom: ctx.preview ? 13.7 : 14.5, pitch: 55, bearing: 20 };

  // A low blue-ish ambient fill plus a strong warm key light from the south-east.
  const ambientLight = new AmbientLight({ color: [120, 150, 255], intensity: 0.7 });
  const directionalLight = new DirectionalLight({ color: [255, 220, 170], intensity: 2.2, direction: [-1, 1.5, -1.2] });
  const custom = new LightingEffect({ ambientLight, directionalLight });
  const defaults = new LightingEffect();

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [custom],
    layers: [
      new PolygonLayer<{ polygon: Building['polygon'] }>({ id: 'ground', data: [{ polygon: GROUND }], getPolygon: (d) => d.polygon, getFillColor: [30, 40, 54] }),
      new PolygonLayer<Building>({
        id: 'buildings',
        data: BUILDINGS,
        getPolygon: (d) => d.polygon,
        extruded: true,
        getElevation: (d) => d.height,
        getFillColor: [210, 215, 225],
      }),
    ],
  });

  const stops: (() => void)[] = [];
  if (ctx.preview) {
    let on = true;
    const timer = window.setInterval(() => {
      on = !on;
      deck.setProps({ effects: [on ? custom : defaults] });
    }, 2200);
    stops.push(() => clearInterval(timer), animate((t) => deck.setProps({ viewState: { ...view, bearing: 20 + t * 8 } })));
  } else {
    check(controlBar(el), 'use the default lighting (new LightingEffect() with no lights)', false, (v) => deck.setProps({ effects: [v ? defaults : custom] }));
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
