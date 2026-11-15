// Focus Location recipe: locationToAngles and easing the globe toward a city
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';
import { PLACES } from '../../shared/places.ts';

// Convert lat/long to globe angles
function locationToAngles(lat: number, long: number): [number, number] {
  return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
}

const CITIES = [PLACES.tokyo, PLACES.sf, PLACES.london, PLACES.sydney, PLACES.saopaulo, PLACES.capetown];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a city; phi and theta ease toward it by 8% of the gap per frame.' });

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.2,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.2, 0.2, 0.25],
    markers: CITIES.map((c) => ({ location: c.location, size: 0.05 })),
  });
  stage.own(globe);

  let [targetPhi, targetTheta] = locationToAngles(...CITIES[0]!.location);
  let currentPhi = 0;
  let currentTheta = 0.2;
  let name = CITIES[0]!.name;

  const label = document.createElement('div');
  label.style.cssText =
    'position:absolute;left:8px;top:6px;font:12px ui-monospace,monospace;color:var(--fg-1);pointer-events:none';
  stage.layer.append(label);

  const focus = (i: number): void => {
    const c = CITIES[i]!;
    [targetPhi, targetTheta] = locationToAngles(...c.location);
    name = c.name;
  };
  if (stage.bar) CITIES.forEach((c, i) => button(stage.bar!, c.name, () => focus(i)));
  const info = stage.bar ? readout(stage.bar) : null;

  let next = 0;
  stage.every(stage.preview ? 2200 : 4000, () => {
    next = (next + 1) % CITIES.length;
    focus(next);
  });

  stage.loop(() => {
    // Ease toward target in animation loop (phi takes the short way round)
    let distPhi = (targetPhi - currentPhi) % (Math.PI * 2);
    if (distPhi > Math.PI) distPhi -= Math.PI * 2;
    if (distPhi < -Math.PI) distPhi += Math.PI * 2;
    currentPhi += distPhi * 0.08;
    currentTheta += (targetTheta - currentTheta) * 0.08;
    globe.update({ phi: currentPhi, theta: currentTheta });
    label.textContent = `focus: ${name}`;
    if (info) info.textContent = `phi ${currentPhi.toFixed(2)} -> ${targetPhi.toFixed(2)}   theta ${currentTheta.toFixed(2)} -> ${targetTheta.toFixed(2)}`;
  });

  return stage.dispose;
};

export default mount;
