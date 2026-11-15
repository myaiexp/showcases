// markerElevation lifts markers and arcs, so arcs start at the marker tops
import createGlobe from 'cobe';
import type { Arc } from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { badge } from '../../shared/overlay.ts';
import { PLACES } from '../../shared/places.ts';

const PAIRS = [
  [PLACES.sf, PLACES.nyc],
  [PLACES.nyc, PLACES.london],
  [PLACES.london, PLACES.paris],
  [PLACES.paris, PLACES.tokyo],
  [PLACES.tokyo, PLACES.sydney],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One markerElevation raises the dots and the arc ends alike.' });
  const arcs: Arc[] = PAIRS.map(([a, b]) => ({ from: a.location, to: b.location, color: [1, 0.5, 0.5] }));
  const markers = [PLACES.sf, PLACES.nyc, PLACES.london, PLACES.paris, PLACES.tokyo, PLACES.sydney].map((p) => ({
    location: p.location,
    size: 0.04,
  }));

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.35,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.8, 0.3],
    glowColor: [0.2, 0.2, 0.25],
    markers,
    arcs,
    arcColor: [1, 0.5, 1],
    arcWidth: 0.5,
    arcHeight: 0.3,
    markerElevation: 0.02,
  });
  stage.own(globe);

  let elevation = 0.02;
  let manual = false;
  if (stage.bar) {
    slider(stage.bar, 'markerElevation', 0, 0.2, 0.005, elevation, (v) => {
      manual = true;
      elevation = v;
    }, (v) => v.toFixed(3));
  }
  const tag = badge(stage.layer, '', 'top-left');

  let phi = 3.6;
  stage.loop((_dt, t) => {
    phi += 0.004;
    if (!manual) elevation = 0.1 - 0.1 * Math.cos(t * 0.9);
    tag.textContent = `markerElevation ${elevation.toFixed(3)}`;
    // arcs bake the elevation when passed, so they are passed again on every frame
    globe.update({ phi, markerElevation: elevation, arcs: arcs.map((a) => ({ ...a })) });
  });

  return stage.dispose;
};

export default mount;
