// Draggable recipe: a drag sets a spring target, release lets it settle
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the globe sideways; let go and it springs back.' });

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.25,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.2, 0.2, 0.25],
    markers: [{ location: [37.78, -122.44], size: 0.05 }],
  });
  stage.own(globe);

  // A tiny critically-damped-ish spring standing in for react-spring's useSpring({ r }).
  const spring = { r: 0, v: 0, target: 0 };
  const step = (dt: number): void => {
    const k = 120;
    const c = 2 * Math.sqrt(k) * 0.9;
    spring.v += (k * (spring.target - spring.r) - c * spring.v) * dt;
    spring.r += spring.v * dt;
  };

  let pointer: number | null = null; // the pointerRef: clientX at pointer down
  const canvas = stage.canvas;
  const down = (e: PointerEvent): void => {
    pointer = e.clientX;
    canvas.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent): void => {
    if (pointer !== null) spring.target = (e.clientX - pointer) / 200; // api.start({ r: delta / 200 })
  };
  const up = (e: PointerEvent): void => {
    pointer = null;
    spring.target = 0;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
  };
  if (!stage.preview) {
    canvas.style.cursor = 'grab';
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    stage.onDispose(() => {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
    });
  }

  const info = stage.bar ? readout(stage.bar) : null;
  const baseRotation = 0.5;
  stage.loop((dt, t) => {
    if (stage.preview) {
      // No pointer in a card: fake a drag. Pull for 1.2 s, then release for 1.8 s.
      const cycle = t % 3;
      spring.target = cycle < 1.2 ? Math.min(1, cycle) * 0.9 : 0;
    }
    step(Math.min(dt, 1 / 30));
    globe.update({ phi: baseRotation + spring.r });
    if (info) info.textContent = `target r ${spring.target.toFixed(2)}   spring r ${spring.r.toFixed(2)}`;
  });

  return stage.dispose;
};

export default mount;
