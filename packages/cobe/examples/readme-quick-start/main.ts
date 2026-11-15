// The README's Quick Start options, driven by update() (2.0.1 has no onRender)
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0,
    dark: 0,
    diffuse: 1.2,
    scale: 1,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.5, 1],
    glowColor: [1, 1, 1],
    offset: [0, 0],
    markers: [
      { location: [37.7595, -122.4367], size: 0.03 },
      { location: [40.7128, -74.006], size: 0.1, color: [1, 0, 0] }, // custom color
    ],
    arcs: [
      {
        from: [37.7595, -122.4367],
        to: [40.7128, -74.006],
        color: [1, 0.5, 0.5], // custom color (optional)
      },
    ],
    arcColor: [1, 0.5, 1],
    arcWidth: 0.5,
    arcHeight: 0.3,
    markerElevation: 0.02,
  });
  stage.own(globe);

  // The README passes onRender(state) here, the v1 hook. 2.0.1 neither types nor calls it,
  // so the same per-frame step goes in our own loop.
  let phi = 0;
  stage.loop(() => {
    globe.update({ phi });
    phi += 0.01;
  });

  if (stage.bar) readout(stage.bar, 'onRender is gone in v2: a requestAnimationFrame loop calls update({ phi })');

  return stage.dispose;
};

export default mount;
