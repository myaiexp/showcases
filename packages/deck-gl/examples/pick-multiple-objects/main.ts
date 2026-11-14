// deck.pickMultipleObjects: deep picking returns objects hidden under other objects
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { gaussian, seeded } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { screenOf } from '../../shared/guide-picking.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Disc {
  position: [number, number];
  size: number;
}

/** Fourteen big discs piled around Central Europe. */
const DISCS: Disc[] = (() => {
  const rand = seeded(17);
  return Array.from({ length: 14 }, () => ({
    position: [10 + gaussian(rand) * 0.8, 49 + gaussian(rand) * 0.5] as [number, number],
    size: 38 + rand() * 30,
  }));
})();
const CENTRE: [number, number] = [10, 49];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 49, zoom: ctx.preview ? 4.5 : 5.5 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Click inside the pile of discs');
  let depth = 10;
  let picked = new Set<number>();

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Disc>({
      id: 'discs',
      data: DISCS,
      getPosition: (d) => d.position,
      getRadius: (d) => d.size,
      radiusUnits: 'pixels',
      getFillColor: (_d, { index }) => (picked.has(index) ? [255, 190, 70, 120] : [80, 150, 255, 70]),
      updateTriggers: { getFillColor: [[...picked].join()] },
      stroked: true,
      getLineColor: [255, 255, 255, 160],
      lineWidthMinPixels: 1,
      pickable: true,
    }),
  ];

  const run = (x: number, y: number): void => {
    // Returns one info per object under the pixel, up to `depth`, nearest first.
    const infos = deck.pickMultipleObjects({ x, y, radius: 0, depth, layerIds: ['discs'] });
    picked = new Set(infos.map((i) => i.index));
    label.textContent = `depth ${depth}: ${infos.length} discs under the pointer (${[...picked].join(', ') || 'none'})`;
    deck.setProps({ layers: layers() });
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    onClick: ({ x, y }) => run(x, y),
  });

  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      depth = [1, 3, 10][i++ % 3]!;
      const at = screenOf(deck, CENTRE);
      if (at) run(at[0], at[1]);
    }, 1500);
  } else {
    slider(controlBar(el), 'depth', 1, 10, 1, depth, (v) => (depth = v));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
