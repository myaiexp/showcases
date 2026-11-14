// getPolygonOffset: depth bias that keeps layers on the same plane from z-fighting
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { SolidPolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';

/** A square of `half` degrees around a point, as a closed ring. */
const square = (lng: number, lat: number, half: number): [number, number][] => [
  [lng - half, lat - half], [lng + half, lat - half], [lng + half, lat + half], [lng - half, lat + half], [lng - half, lat - half],
];

const MODES = ['default (stacked by index)', 'none: [0, 0]', 'pull toward camera'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 0, latitude: 0, zoom: ctx.preview ? 5.4 : 6.2, pitch: 60, bearing: 20 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let mode: Mode = 'none: [0, 0]';

  const layers = () => [
    // Two flat polygons on exactly the same plane; the second should be on top.
    new SolidPolygonLayer<{ ring: [number, number][] }>({
      id: 'under',
      data: [{ ring: square(0, 0, 3) }],
      getPolygon: (d) => d.ring,
      getFillColor: [60, 120, 220],
      // With the default, layer index offsets the depth a little. [0, 0] switches it off.
      ...(mode === 'none: [0, 0]' ? { getPolygonOffset: () => [0, 0] as [number, number] } : {}),
    }),
    new SolidPolygonLayer<{ ring: [number, number][] }>({
      id: 'over',
      data: [{ ring: square(0, 0, 3) }],
      getPolygon: (d) => d.ring,
      getFillColor: [255, 170, 60],
      ...(mode === 'none: [0, 0]' ? { getPolygonOffset: () => [0, 0] as [number, number] } : {}),
      // Negative values pull the layer toward the camera.
      ...(mode === 'pull toward camera' ? { getPolygonOffset: () => [-1, -5000] as [number, number] } : {}),
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const apply = (): void => {
    deck.setProps({ layers: layers() });
    label.textContent = `getPolygonOffset: ${mode}`;
  };
  apply();

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      mode = MODES[++i % MODES.length]!;
      apply();
    }, 1800);
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: 20 + t * 8 } }));
  } else {
    select(controlBar(el), 'getPolygonOffset', MODES, (v) => {
      mode = v;
      apply();
    }, mode);
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
