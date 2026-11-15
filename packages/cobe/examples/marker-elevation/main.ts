// markerElevation: lift off the surface: sweep in cards, control in full view
import createGlobe, { type Arc } from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: [''], hint: "Elevation moves markers and the arcs' end points; arcs are re-sent after each change." });
  const caption = stage.panes[0]!.caption!;
  const arcs: Arc[] = [
    { from: [37.78, -122.44], to: [40.71, -74.01] },
    { from: [51.51, -0.13], to: [35.68, 139.65] },
    { from: [-33.87, 151.21], to: [1.35, 103.82] },
  ];

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
    glowColor: [0.25, 0.25, 0.3],
    markers: [
      { location: [37.78, -122.44], size: 0.05 },
      { location: [40.71, -74.01], size: 0.05 },
      { location: [51.51, -0.13], size: 0.05 },
      { location: [35.68, 139.65], size: 0.05 },
      { location: [-33.87, 151.21], size: 0.05 },
      { location: [1.35, 103.82], size: 0.05 },
    ],
    arcs,
    arcColor: [0.3, 0.6, 1],
    arcWidth: 0.6,
    arcHeight: 0.3,
    markerElevation: 0, // swept
  });
  stage.own(globe);

  // Cards sweep the value; the full view holds it until the control moves.
  let v = 0;
  let phi = 0;
  stage.loop((_dt, t) => {
    const s = 0.5 - 0.5 * Math.cos(t * 0.9);
    if (stage.preview) v = 0 + (0.2 - 0) * s;
    phi += 0.005;
    // arcs go in every update: cobe bakes arcWidth, arcHeight and markerElevation into each
    // arc when it is passed, so a changed value reaches the arcs only on a later update with arcs.
    globe.update({ phi, markerElevation: v, arcs });
    caption.textContent = `markerElevation ${v.toFixed(3)}`;
  });

  if (stage.bar) {
    slider(stage.bar, 'markerElevation', 0, 0.2, 0.005, v, (x) => {
      v = x;
    });
  }

  return stage.dispose;
};

export default mount;
