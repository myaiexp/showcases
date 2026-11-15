// The docs' Usage snippet: white globe, two markers, one arc, a frame loop
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.2,
    dark: 0,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [1, 1, 1],
    markerColor: [0.2, 0.4, 1],
    glowColor: [1, 1, 1],
    markers: [
      { location: [37.78, -122.44], size: 0.03, id: stage.id('sf') },
      { location: [40.71, -74.01], size: 0.03, id: stage.id('nyc') },
    ],
    arcs: [{ from: [37.78, -122.44], to: [40.71, -74.01] }],
    arcColor: [0.3, 0.5, 1],
    arcWidth: 0.5,
    arcHeight: 0.3,
  });
  stage.own(globe);

  // Animate the globe: cobe has no loop of its own, each update() draws one frame.
  let phi = 0;
  stage.loop(() => {
    phi += 0.005;
    globe.update({ phi });
  });

  return stage.dispose;
};

export default mount;
