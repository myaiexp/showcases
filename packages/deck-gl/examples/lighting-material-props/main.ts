// The material prop: ambient, diffuse, shininess, specularColor on extrusions
import { AmbientLight, Deck, DirectionalLight, LightingEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { buildings, SCENE_CENTER, type Building } from '../../shared/effects-buildings.ts';
import { animate, createStage } from '../../shared/stage.ts';

const BUILDINGS = buildings();
type Preset = 'custom' | 'material: true (defaults)' | 'material: false (unlit)';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1722' });
  const view: MapViewState = { longitude: SCENE_CENTER[0], latitude: SCENE_CENTER[1], zoom: ctx.preview ? 13.7 : 14.5, pitch: 55, bearing: 20 };
  const m = { ambient: 0.35, diffuse: 0.6, shininess: 32, specular: 0.15 };
  let preset: Preset = 'custom';

  // A strong key light so specular highlights show.
  const effect = new LightingEffect({
    ambient: new AmbientLight({ intensity: 1 }),
    sun: new DirectionalLight({ intensity: 2, direction: [-1, -1.2, -0.9] }),
  });
  const layer = () =>
    new PolygonLayer<Building>({
      id: 'buildings',
      data: BUILDINGS,
      getPolygon: (d) => d.polygon,
      extruded: true,
      getElevation: (d) => d.height,
      getFillColor: [190, 200, 220],
      material:
        preset === 'custom'
          ? { ambient: m.ambient, diffuse: m.diffuse, shininess: m.shininess, specularColor: [m.specular * 255, m.specular * 255, m.specular * 255] }
          : preset === 'material: true (defaults)',
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, effects: [effect], layers: [layer()] });
  const apply = (): void => deck.setProps({ layers: [layer()] });

  const stops: (() => void)[] = [];
  if (ctx.preview) {
    stops.push(animate((t) => {
      m.shininess = 4 + 120 * (0.5 + 0.5 * Math.sin(t));
      m.specular = 0.6 * (0.5 + 0.5 * Math.sin(t));
      apply();
    }));
  } else {
    const bar = controlBar(el);
    const on = (k: keyof typeof m) => (v: number): void => {
      m[k] = v;
      preset = 'custom';
      apply();
    };
    slider(bar, 'ambient', 0, 1, 0.05, m.ambient, on('ambient'));
    slider(bar, 'diffuse', 0, 1, 0.05, m.diffuse, on('diffuse'));
    slider(bar, 'shininess', 1, 200, 1, m.shininess, on('shininess'));
    slider(bar, 'specular (grey)', 0, 1, 0.05, m.specular, on('specular'));
    select(bar, 'preset', ['custom', 'material: true (defaults)', 'material: false (unlit)'] as Preset[], (v) => {
      preset = v;
      apply();
    });
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
