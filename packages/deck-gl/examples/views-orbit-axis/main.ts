// OrbitView orbitAxis: which axis, Z or Y, the camera can spin around through a full 360 degrees
import { COORDINATE_SYSTEM, Deck, OrbitView } from '@deck.gl/core';
import type { OrbitViewState } from '@deck.gl/core';
import { LineLayer, PointCloudLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { axes, knot, type Axis, type KnotPoint } from '../../shared/views-scene.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  let state: OrbitViewState = { target: [0, 0, 0], zoom: ctx.preview ? 0 : 0.8, rotationX: 25, rotationOrbit: 20 };
  let spin = true;

  const data = knot(ctx.preview ? 500 : 900);
  const layers = [
    new PointCloudLayer<KnotPoint>({
      id: 'knot',
      data,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getPosition: (d) => d.position,
      getColor: (d) => d.color,
      pointSize: 5,
    }),
    new LineLayer<Axis>({
      id: 'axes',
      data: axes(),
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getSourcePosition: (d) => d.from,
      getTargetPosition: (d) => d.to,
      getColor: (d) => d.color,
      getWidth: 3,
    }),
  ];

  const makeView = (orbitAxis: 'Y' | 'Z') => new OrbitView({ id: 'orbit', orbitAxis, controller: !ctx.preview });
  const deck = new Deck({
    device: stage.device,
    views: makeView('Z'),
    viewState: state,
    onViewStateChange: ({ viewState }) => {
      state = viewState as OrbitViewState;
      deck.setProps({ viewState: state });
    },
    layers,
  });

  // The orbit axis is the one that rotationOrbit turns around; the other tilts with rotationX.
  const stop = animate((t) => {
    if (ctx.preview || spin) {
      state = { ...state, rotationOrbit: (state.rotationOrbit ?? 0) + 0.6, rotationX: ctx.preview ? 25 + Math.sin(t) * 25 : state.rotationX };
      deck.setProps({ viewState: state });
    }
  });
  if (ctx.preview) {
    const timer = window.setInterval(() => deck.setProps({ views: makeView(Math.floor(performance.now() / 4000) % 2 ? 'Y' : 'Z') }), 1000);
    return () => {
      stop();
      clearInterval(timer);
      stage.release(deck);
    };
  }
  const bar = controlBar(el);
  select(bar, 'orbitAxis', ['Z', 'Y'] as const, (v) => deck.setProps({ views: makeView(v) }), 'Z');
  check(bar, 'spin', true, (v) => { spin = v; });
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
