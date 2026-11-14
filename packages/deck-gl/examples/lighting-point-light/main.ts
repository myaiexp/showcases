// PointLight orbiting the block: lng/lat/altitude position, distance attenuation
import { AmbientLight, Deck, LightingEffect, PointLight } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer, ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { buildings, offsetMetres, SCENE_CENTER, type Building } from '../../shared/effects-buildings.ts';
import { animate, createStage } from '../../shared/stage.ts';

const BUILDINGS = buildings();

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1722' });
  const view: MapViewState = { longitude: SCENE_CENTER[0], latitude: SCENE_CENTER[1], zoom: ctx.preview ? 13.7 : 14.5, pitch: 58, bearing: 30 };
  let falloff = 0.00004;
  let altitude = 90;
  let t = 0;

  const lightAt = (): PointLight => {
    const [lng, lat] = offsetMetres(Math.cos(t) * 260, Math.sin(t) * 260);
    // Position uses the view's coordinates: [longitude, latitude, altitude in metres].
    return new PointLight({ color: [255, 190, 110], intensity: 1.6, position: [lng, lat, altitude], attenuation: [1, 0, falloff] });
  };
  const layers = (light: PointLight) => [
    new PolygonLayer<Building>({
      id: 'buildings',
      data: BUILDINGS,
      getPolygon: (d) => d.polygon,
      extruded: true,
      getElevation: (d) => d.height,
      getFillColor: [210, 214, 222],
    }),
    // A marker where the light is.
    new ScatterplotLayer<PointLight>({ id: 'lamp', data: [light], getPosition: (d) => d.position, getRadius: 12, getFillColor: [255, 230, 160], parameters: { depthCompare: 'always' } }),
  ];

  const first = lightAt();
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [new LightingEffect({ ambient: new AmbientLight({ intensity: 0.15 }), lamp: first })],
    layers: layers(first),
  });
  const tick = (): void => {
    const light = lightAt();
    deck.setProps({ effects: [new LightingEffect({ ambient: new AmbientLight({ intensity: 0.15 }), lamp: light })], layers: layers(light) });
  };

  const stops = [animate((s) => {
    t = s * 0.8;
    tick();
  })];
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'attenuation C_quadratic x 1e-5', 0, 20, 0.5, falloff * 1e5, (v) => (falloff = v * 1e-5));
    slider(bar, 'altitude m', 10, 300, 10, altitude, (v) => (altitude = v));
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
