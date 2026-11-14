// _CameraLight lights what faces the camera; a fixed DirectionalLight does not follow the view
import { _CameraLight as CameraLight, AmbientLight, Deck, DirectionalLight, LightingEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { buildings, SCENE_CENTER, type Building } from '../../shared/effects-buildings.ts';
import { animate, createStage } from '../../shared/stage.ts';

const BUILDINGS = buildings();

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1722' });
  const view: MapViewState = { longitude: SCENE_CENTER[0], latitude: SCENE_CENTER[1], zoom: ctx.preview ? 13.7 : 14.5, pitch: 60, bearing: 0 };
  const ambient = new AmbientLight({ intensity: 0.2 });
  const effects = {
    'camera light': new LightingEffect({ ambient, camera: new CameraLight({ color: [255, 255, 255], intensity: 2.5 }) }),
    'fixed directional light': new LightingEffect({ ambient, sun: new DirectionalLight({ intensity: 2.5, direction: [-1, -1, -1] }) }),
  };
  type Kind = keyof typeof effects;

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [effects['camera light']],
    layers: [
      new PolygonLayer<Building>({
        id: 'buildings',
        data: BUILDINGS,
        getPolygon: (d) => d.polygon,
        extruded: true,
        getElevation: (d) => d.height,
        getFillColor: [210, 214, 222],
      }),
    ],
  });

  const stops: (() => void)[] = [];
  if (ctx.preview) {
    stops.push(animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 25 } })));
  } else {
    select(controlBar(el), 'light (drag to rotate the view)', Object.keys(effects) as Kind[], (v) => deck.setProps({ effects: [effects[v]] }));
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
