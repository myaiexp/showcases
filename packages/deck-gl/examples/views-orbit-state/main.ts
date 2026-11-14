// OrbitView state: rotationX, rotationOrbit, zoom and target, with rotationX limited by minRotationX
import { COORDINATE_SYSTEM, Deck, OrbitView } from '@deck.gl/core';
import type { OrbitViewState } from '@deck.gl/core';
import { LineLayer, PointCloudLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { axes, knot, type Axis, type KnotPoint } from '../../shared/views-scene.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  let state: OrbitViewState = {
    target: [0, 0, 0],
    zoom: ctx.preview ? 0 : 0.8,
    rotationX: 30,
    rotationOrbit: 0,
    // The camera cannot go below the horizon or beyond straight down.
    minRotationX: 0,
    maxRotationX: 90,
    minZoom: -1,
    maxZoom: 3,
  };
  const label = ctx.preview ? null : readout(el);
  const show = (): void => {
    deck.setProps({ viewState: state });
    const f = (n: number | undefined): string => (n ?? 0).toFixed(1);
    if (label) label.textContent = `rotationX ${f(state.rotationX)}   rotationOrbit ${f(state.rotationOrbit)}   zoom ${f(state.zoom)}   target z ${f(state.target[2])}`;
  };

  const deck = new Deck({
    device: stage.device,
    views: new OrbitView({ id: 'orbit', orbitAxis: 'Z', controller: !ctx.preview }),
    viewState: state,
    onViewStateChange: ({ viewState }) => {
      state = viewState as OrbitViewState;
      show();
    },
    layers: [
      new PointCloudLayer<KnotPoint>({ id: 'knot', data: knot(ctx.preview ? 500 : 900), coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, getPosition: (d) => d.position, getColor: (d) => d.color, pointSize: 5 }),
      new LineLayer<Axis>({ id: 'axes', data: axes(), coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, getSourcePosition: (d) => d.from, getTargetPosition: (d) => d.to, getColor: (d) => d.color, getWidth: 3 }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state = { ...state, rotationOrbit: t * 30, rotationX: 45 + Math.sin(t * 0.7) * 45, zoom: Math.sin(t * 0.5) * 0.4 };
      show();
    });
  } else {
    const bar = controlBar(el);
    const set = (patch: Partial<OrbitViewState>) => (): void => void (state = { ...state, ...patch });
    slider(bar, 'rotationX', 0, 90, 1, 30, (v) => { set({ rotationX: v })(); show(); });
    slider(bar, 'rotationOrbit', -180, 180, 1, 0, (v) => { set({ rotationOrbit: v })(); show(); });
    slider(bar, 'zoom', -1, 3, 0.1, 0.8, (v) => { set({ zoom: v })(); show(); });
    slider(bar, 'target z', -60, 60, 1, 0, (v) => { set({ target: [0, 0, v] })(); show(); });
    show();
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
