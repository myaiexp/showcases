// CARTESIAN positions in an OrthographicView, shifted by coordinateOrigin
import { COORDINATE_SYSTEM, Deck, OrthographicView } from '@deck.gl/core';
import type { OrthographicViewState } from '@deck.gl/core';
import { LineLayer, ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';

interface Dot {
  position: [number, number];
  hue: number;
}

/** A spiral of 300 points around [0, 0]; units are whatever the data means. */
const SPIRAL: Dot[] = Array.from({ length: 300 }, (_, i) => {
  const a = i * 0.28;
  const r = 6 + i * 0.9;
  return { position: [Math.cos(a) * r, Math.sin(a) * r], hue: i / 300 };
});
const AXES = [
  { from: [-320, 0] as [number, number], to: [320, 0] as [number, number] },
  { from: [0, -200] as [number, number], to: [0, 200] as [number, number] },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0b1118' });
  const view: OrthographicViewState = { target: [0, 0, 0], zoom: ctx.preview ? -0.2 : 0.4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);

  const layers = (shift: number) => [
    new LineLayer<(typeof AXES)[number]>({
      id: 'axes',
      data: AXES,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, // the default in a non-geospatial view
      getSourcePosition: (d) => d.from,
      getTargetPosition: (d) => d.to,
      getColor: [90, 105, 130],
      getWidth: 1,
    }),
    new ScatterplotLayer<Dot>({
      id: 'spiral',
      data: SPIRAL,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      // The origin is added to every position: slide it and the whole spiral moves.
      coordinateOrigin: [shift, 0, 0],
      getPosition: (d) => d.position,
      getRadius: 4,
      radiusUnits: 'common', // one unit of the same space as the positions
      getFillColor: (d) => [90 + d.hue * 165, 180 - d.hue * 80, 255 - d.hue * 160],
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    views: new OrthographicView({ id: 'plane', controller: !ctx.preview }),
    initialViewState: view,
    layers: layers(0),
  });
  const set = (shift: number): void => {
    deck.setProps({ layers: layers(shift) });
    label.textContent = `coordinateOrigin: [${shift.toFixed(0)}, 0, 0]`;
  };
  set(0);

  let stop = (): void => {};
  if (ctx.preview) stop = animate((t) => set(Math.sin(t * 0.8) * 140));
  else slider(controlBar(el), 'origin x', -200, 200, 10, 0, set);
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
