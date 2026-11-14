// An AmbientLight alone lights all faces equally: colour and intensity, no shape
import { AmbientLight, Deck, LightingEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { buildings, SCENE_CENTER, type Building } from '../../shared/effects-buildings.ts';
import { animate, createStage } from '../../shared/stage.ts';

const BUILDINGS = buildings();
const COLORS: Record<string, [number, number, number]> = {
  white: [255, 255, 255],
  warm: [255, 200, 140],
  cool: [140, 190, 255],
  green: [140, 255, 170],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1722' });
  const view: MapViewState = { longitude: SCENE_CENTER[0], latitude: SCENE_CENTER[1], zoom: ctx.preview ? 13.7 : 14.5, pitch: 55, bearing: 20 };
  const light = new AmbientLight({ color: COLORS.white, intensity: 1 });
  const effect = new LightingEffect({ light });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [effect],
    layers: [
      new PolygonLayer<Building>({
        id: 'buildings',
        data: BUILDINGS,
        getPolygon: (d) => d.polygon,
        extruded: true,
        getElevation: (d) => d.height,
        getFillColor: [200, 205, 215],
      }),
    ],
  });

  // The light object is read when the effect renders: set its fields, then ask for a redraw.
  const apply = (): void => deck.setProps({ effects: [new LightingEffect({ light })] });

  const stops: (() => void)[] = [];
  if (ctx.preview) {
    stops.push(
      animate((t) => {
        light.intensity = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t * 1.2));
        apply();
        deck.setProps({ viewState: { ...view, bearing: 20 + t * 6 } });
      }),
    );
  } else {
    const bar = controlBar(el);
    slider(bar, 'intensity', 0, 2, 0.05, 1, (v) => {
      light.intensity = v;
      apply();
    });
    select(bar, 'color', Object.keys(COLORS), (v) => {
      light.color = COLORS[v]!;
      apply();
    });
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
