// OrbitController: dragMode rotate or pan, inertia, and maxBounds on the target of an OrbitView
import { COORDINATE_SYSTEM, Deck, OrbitView } from '@deck.gl/core';
import type { OrbitViewState } from '@deck.gl/core';
import { LineLayer, PointCloudLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, select, slider } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { axes, knot, type Axis, type KnotPoint } from '../../shared/views-scene.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  const home: OrbitViewState = { target: [0, 0, 0], zoom: ctx.preview ? 0 : 0.8, rotationX: 25, rotationOrbit: 30 };
  const info = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Drag to rotate; shift or ctrl + drag pans the target.');
  const opts = { dragMode: 'rotate' as 'rotate' | 'pan', inertia: 0, bounded: false };

  const options = () => ({
    dragMode: opts.dragMode,
    inertia: opts.inertia === 0 ? false : opts.inertia,
    // The target cannot leave this box: pan far and the knot stops following the pointer.
    ...(opts.bounded ? { maxBounds: [[-60, -60, -60], [60, 60, 60]] as [[number, number, number], [number, number, number]] } : {}),
  });

  const deck = new Deck({
    device: stage.device,
    views: new OrbitView({ id: 'orbit', orbitAxis: 'Z' }),
    initialViewState: home,
    controller: ctx.preview ? false : options(),
    layers: [
      new PointCloudLayer<KnotPoint>({ id: 'knot', data: knot(ctx.preview ? 500 : 900), coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, getPosition: (d) => d.position, getColor: (d) => d.color, pointSize: 5 }),
      new LineLayer<Axis>({ id: 'axes', data: axes(), coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, getSourcePosition: (d) => d.from, getTargetPosition: (d) => d.to, getColor: (d) => d.color, getWidth: 3 }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Rotate first, then pan the target about, as dragMode 'rotate' and shift-drag would.
    stop = animate((t) => {
      const pan = Math.floor(t / 4) % 2 === 1;
      info.textContent = pan ? 'shift + drag: pan the target' : 'drag: rotate';
      const u = t * 1.2;
      deck.setProps({ viewState: pan ? { ...home, target: [Math.sin(u) * 50, Math.cos(u) * 30, 0] } : { ...home, rotationOrbit: t * 40, rotationX: 25 + Math.sin(u) * 25 } });
    });
  } else {
    const bar = controlBar(el);
    const apply = (): void => deck.setProps({ controller: options() });
    select(bar, 'dragMode', ['rotate', 'pan'] as const, (v) => { opts.dragMode = v; apply(); }, 'rotate');
    slider(bar, 'inertia (ms, 0 = off)', 0, 2000, 100, 0, (v) => { opts.inertia = v; apply(); });
    check(bar, 'maxBounds on the target', false, (v) => { opts.bounded = v; apply(); });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
