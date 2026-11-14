// OrthographicController zoomAxis: wheel zoom applies to X only, Y only, or both
import { COORDINATE_SYSTEM, Deck, OrthographicController, OrthographicView } from '@deck.gl/core';
import type { OrthographicViewState } from '@deck.gl/core';
import { LineLayer, ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Pt = [number, number];
interface Tick {
  from: Pt;
  to: Pt;
}
interface Mark {
  text: string;
  at: Pt;
}

/** A 20 x 10 grid of 50-unit steps, with a sine curve sampled as dots. */
const GRID: Tick[] = [
  ...Array.from({ length: 21 }, (_, i): Tick => ({ from: [i * 50, 0], to: [i * 50, 500] })),
  ...Array.from({ length: 11 }, (_, i): Tick => ({ from: [0, i * 50], to: [1000, i * 50] })),
];
const CURVE: Pt[] = Array.from({ length: 80 }, (_, i) => [i * 12.5, 250 + Math.sin(i * 0.2) * 150]);
const MARKS: Mark[] = Array.from({ length: 11 }, (_, i) => ({ text: String(i * 100), at: [i * 100, -14] }));

/** zoomAxis is documented for this controller but missing from Deck's controller prop type, hence a variable (no excess-property check). */
const controllerFor = (zoomAxis: 'X' | 'Y' | 'all') => {
  const options = { type: OrthographicController, zoomAxis };
  return options;
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  const home: OrthographicViewState = { target: [500, 240, 0], zoomX: ctx.preview ? -0.6 : -0.1, zoomY: ctx.preview ? -0.6 : -0.2 };
  const info = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Scroll over the plot: only the chosen axis scales.');

  const deck = new Deck({
    device: stage.device,
    views: new OrthographicView({ id: 'chart', flipY: false }),
    initialViewState: home,
    controller: ctx.preview ? false : controllerFor('X'),
    layers: [
      new LineLayer<Tick>({ id: 'grid', data: GRID, coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, getSourcePosition: (d) => d.from, getTargetPosition: (d) => d.to, getColor: [50, 64, 84], getWidth: 1 }),
      new ScatterplotLayer<Pt>({ id: 'curve', data: CURVE, coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, getPosition: (d) => d, getRadius: 5, radiusUnits: 'pixels', getFillColor: [255, 170, 70] }),
      new TextLayer<Mark>({ id: 'marks', data: MARKS, coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, getPosition: (d) => d.at, getText: (d) => d.text, getSize: 11, getColor: [150, 165, 190] }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Zoom X alone, then Y alone, then both, as zoomAxis 'X', 'Y' and 'all' would.
    stop = animate((t) => {
      const phase = Math.floor(t / 2.5) % 3;
      const k = Math.sin(((t % 2.5) / 2.5) * Math.PI) * 0.7;
      info.textContent = `zoomAxis: '${['X', 'Y', 'all'][phase]}'`;
      deck.setProps({ viewState: { ...home, zoomX: (home.zoomX ?? 0) + (phase !== 1 ? k : 0), zoomY: (home.zoomY ?? 0) + (phase !== 0 ? k : 0) } });
    });
  } else {
    select(controlBar(el), 'zoomAxis', ['X', 'Y', 'all'] as const, (zoomAxis) => deck.setProps({ controller: controllerFor(zoomAxis) }), 'X');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
