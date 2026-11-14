// DirectionalLight({_shadow}), LightingEffect.shadowColor, shadowEnabled opt-out
import { AmbientLight, Deck, DirectionalLight, LightingEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select } from '../../shared/controls.ts';
import { buildings, ground, SCENE_CENTER, type Building } from '../../shared/effects-buildings.ts';
import { animate, createStage } from '../../shared/stage.ts';

const BUILDINGS = buildings();
const GROUND = [{ polygon: ground() }];
const SHADOW_COLORS: Record<string, [number, number, number, number]> = {
  'black 80%': [0, 0, 0, 0.8],
  'blue 70%': [10, 20, 120, 0.7],
  'faint 35%': [0, 0, 0, 0.35],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1722' });
  const view: MapViewState = { longitude: SCENE_CENTER[0], latitude: SCENE_CENTER[1], zoom: ctx.preview ? 13.7 : 14.5, pitch: 50, bearing: 0 };
  let shadows = true;
  let groundReceives = true;
  let azimuth = 60;
  let shadowColor = SHADOW_COLORS['black 80%']!;

  // One effect and one light for the whole session: the light is mutated, never rebuilt.
  const sun = new DirectionalLight({ intensity: 2.2, direction: [0, 0, -1], _shadow: true });
  const effect = new LightingEffect({ ambient: new AmbientLight({ intensity: 0.5 }), sun });
  const aim = (): void => {
    const a = (azimuth * Math.PI) / 180;
    sun.direction = [Math.sin(a), Math.cos(a), -0.7];
    sun.shadow = shadows;
    effect.shadowColor = shadowColor;
    // setProps re-sorts the lights and re-reads which of them cast shadows.
    effect.setProps(effect.props);
    deck.redraw('light changed');
  };
  // shadowEnabled is a documented layer prop that the layer typings leave out; spreading skips the excess-property check.
  const groundShadow = (): object => ({ shadowEnabled: groundReceives });
  const layers = () => [
    // A layer opts out of receiving and casting shadows with shadowEnabled: false.
    new PolygonLayer<{ polygon: Building['polygon'] }>({ id: 'ground', data: GROUND, getPolygon: (d) => d.polygon, getFillColor: [150, 158, 170], ...groundShadow() }),
    new PolygonLayer<Building>({ id: 'buildings', data: BUILDINGS, getPolygon: (d) => d.polygon, extruded: true, getElevation: (d) => d.height, getFillColor: [225, 225, 230] }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, effects: [effect], layers: layers() });
  aim();
  const apply = (): void => {
    deck.setProps({ layers: layers() });
    aim();
  };

  const stops: (() => void)[] = [];
  if (ctx.preview) {
    stops.push(animate((t) => {
      azimuth = 20 + ((t * 25) % 140);
      apply();
    }));
  } else {
    const bar = controlBar(el);
    check(bar, '_shadow on the light', true, (v) => {
      shadows = v;
      apply();
    });
    check(bar, 'ground shadowEnabled', true, (v) => {
      groundReceives = v;
      apply();
    });
    select(bar, 'shadowColor', Object.keys(SHADOW_COLORS), (v) => {
      shadowColor = SHADOW_COLORS[v]!;
      apply();
    });
    select(bar, 'light from', ['60', '150', '240', '330'].map((a) => `${a}°`), (v) => {
      azimuth = parseInt(v, 10);
      apply();
    }, '60°');
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
