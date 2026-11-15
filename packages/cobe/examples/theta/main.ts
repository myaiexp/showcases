// theta: vertical tilt: sweep in cards, control in full view
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: [''], hint: "Slider range is -π/2 to π/2: pole to pole." });
  const caption = stage.panes[0]!.caption!;

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.25, // swept
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.25, 0.25, 0.3],
    markers: [
      { location: [37.78, -122.44], size: 0.04 },
      { location: [51.51, -0.13], size: 0.04 },
      { location: [35.68, 139.65], size: 0.04 },
    ],
  });
  stage.own(globe);

  // Cards sweep the value; the full view holds it until the control moves.
  let v = 0.25;
  let phi = 0;
  stage.loop((_dt, t) => {
    const s = 0.5 - 0.5 * Math.cos(t * 0.9);
    if (stage.preview) v = -Math.PI / 2 + (Math.PI / 2 - -Math.PI / 2) * s;
    phi += 0.005;
    globe.update({ phi, theta: v });
    caption.textContent = `theta ${`${v.toFixed(2)} rad = ${Math.round((v * 180) / Math.PI)} deg`}`;
  });

  if (stage.bar) {
    slider(stage.bar, 'theta', -Math.PI / 2, Math.PI / 2, 0.01, v, (x) => {
      v = x;
    });
  }

  return stage.dispose;
};

export default mount;
