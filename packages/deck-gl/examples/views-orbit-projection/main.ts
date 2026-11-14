// OrbitView orthographic and fovy: perspective with a field of view, or parallel
import { COORDINATE_SYSTEM, Deck, OrbitView } from '@deck.gl/core';
import { LineLayer, PointCloudLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { axes, knot, type Axis, type KnotPoint } from '../../shared/views-scene.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  const makeView = (orthographic: boolean, fovy: number) => new OrbitView({ id: 'orbit', orthographic, fovy, controller: !ctx.preview });
  const view = (rotationOrbit: number) => ({ target: [0, 0, 0] as [number, number, number], zoom: ctx.preview ? 0.1 : 0.9, rotationX: 30, rotationOrbit });

  const deck = new Deck({
    device: stage.device,
    views: makeView(false, 50),
    initialViewState: view(25),
    layers: [
      new PointCloudLayer<KnotPoint>({ id: 'knot', data: knot(ctx.preview ? 500 : 900), coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, getPosition: (d) => d.position, getColor: (d) => d.color, pointSize: 5 }),
      new LineLayer<Axis>({ id: 'axes', data: axes(), coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, getSourcePosition: (d) => d.from, getTargetPosition: (d) => d.to, getColor: (d) => d.color, getWidth: 3 }),
    ],
  });

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    let ortho = false;
    timer = window.setInterval(() => deck.setProps({ views: makeView((ortho = !ortho), 50) }), 2500);
    stop = animate((t) => deck.setProps({ viewState: view(t * 30) }));
  } else {
    let ortho = false;
    let fovy = 50;
    const bar = controlBar(el);
    const apply = (): void => deck.setProps({ views: makeView(ortho, fovy) });
    check(bar, 'orthographic', false, (v) => { ortho = v; apply(); });
    slider(bar, 'fovy', 15, 120, 1, 50, (v) => { fovy = v; apply(); });
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
