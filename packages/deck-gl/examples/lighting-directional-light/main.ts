// DirectionalLight: sliders turn an azimuth and a height into the light's direction vector
import { AmbientLight, Deck, DirectionalLight, LightingEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { buildings, SCENE_CENTER, type Building } from '../../shared/effects-buildings.ts';
import { animate, createStage } from '../../shared/stage.ts';

const BUILDINGS = buildings();
const COLORS: Record<string, [number, number, number]> = { white: [255, 255, 255], amber: [255, 190, 110], pink: [255, 140, 200], cyan: [120, 230, 255] };

/** direction is where the light travels: x east, y north, z up (negative shines down). */
function directionFor(azimuthDeg: number, height: number): [number, number, number] {
  const a = (azimuthDeg * Math.PI) / 180;
  return [Math.sin(a), Math.cos(a), -height];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1722' });
  const view: MapViewState = { longitude: SCENE_CENTER[0], latitude: SCENE_CENTER[1], zoom: ctx.preview ? 13.7 : 14.5, pitch: 55, bearing: 0 };
  let azimuth = 45;
  let height = 0.8;
  let color = COLORS.white!;

  const effect = (): LightingEffect =>
    new LightingEffect({
      ambient: new AmbientLight({ color: [255, 255, 255], intensity: 0.25 }),
      sun: new DirectionalLight({ color, intensity: 2.4, direction: directionFor(azimuth, height) }),
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [effect()],
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
  const apply = (): void => deck.setProps({ effects: [effect()] });

  const stops: (() => void)[] = [];
  if (ctx.preview) {
    stops.push(
      animate((t) => {
        azimuth = (t * 40) % 360;
        apply();
      }),
    );
  } else {
    const bar = controlBar(el);
    slider(bar, 'azimuth °', 0, 360, 5, azimuth, (v) => {
      azimuth = v;
      apply();
    });
    slider(bar, 'height (down-component)', 0.1, 3, 0.1, height, (v) => {
      height = v;
      apply();
    });
    select(bar, 'color', Object.keys(COLORS), (v) => {
      color = COLORS[v]!;
      apply();
    });
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
