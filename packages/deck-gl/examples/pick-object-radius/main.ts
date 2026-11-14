// deck.pickObjectAsync({x, y, radius}): a probe finds the closest object in reach
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { lngLatAt, screenOf } from '../../shared/guide-picking.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Probe {
  at: [number, number];
}

const TARGETS = ['Berlin', 'Paris', 'Madrid', 'Istanbul'].map(city);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 45, zoom: ctx.preview ? 3 : 3.6 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Click near a city');
  let radius = 20;
  let probe: Probe | null = null;
  let hit = -1;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getFillColor: [255, 150, 70],
      getRadius: 4,
      radiusUnits: 'pixels',
      pickable: true,
      highlightedObjectIndex: hit,
      highlightColor: [255, 255, 255],
    }),
    // The probe: a ring as wide as the pick radius.
    new ScatterplotLayer<Probe>({
      id: 'probe',
      data: probe ? [probe] : [],
      getPosition: (d) => d.at,
      getRadius: Math.max(radius, 2),
      radiusUnits: 'pixels',
      filled: false,
      stroked: true,
      getLineColor: [120, 220, 255],
      lineWidthMinPixels: 2,
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    onClick: async ({ x, y }) => {
      const found = await deck.pickObjectAsync({ x, y, radius, layerIds: ['cities'] });
      const at = lngLatAt(deck, x, y);
      if (at) probe = { at };
      hit = found?.index ?? -1;
      label.textContent = found ? `radius ${radius}px: ${(found.object as City).name}` : `radius ${radius}px: nothing in reach`;
      deck.setProps({ layers: layers() });
    },
  });

  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      const target = TARGETS[i % TARGETS.length]!;
      radius = [4, 14, 30][i % 3]!;
      i += 1;
      const at = screenOf(deck, target.coordinates);
      if (!at) return;
      // Aim 12px off the city, so only a wide enough radius reaches it.
      const x = at[0] + 12;
      const found = deck.pickObject({ x, y: at[1], radius, layerIds: ['cities'] });
      probe = { at: lngLatAt(deck, x, at[1]) ?? target.coordinates };
      hit = found?.index ?? -1;
      label.textContent = `radius ${radius}px: ${found ? (found.object as City).name : 'nothing in reach'}`;
      deck.setProps({ layers: layers() });
    }, 1400);
  } else {
    slider(controlBar(el), 'radius px', 0, 60, 2, radius, (v) => (radius = v));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
