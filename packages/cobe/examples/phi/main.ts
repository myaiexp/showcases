// phi: horizontal rotation: sweep in cards, control in full view
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: [''], hint: "Drag the slider to turn the globe by hand." });
  const caption = stage.panes[0]!.caption!;

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0.6, // swept
    theta: 0.25,
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
  let v = 0.6;
  stage.loop((_dt, t) => {
    if (stage.preview) v = (t * 0.7) % (2 * Math.PI);
    globe.update({ phi: v });
    caption.textContent = `phi ${`${v.toFixed(2)} rad = ${Math.round((v * 180) / Math.PI)} deg`}`;
  });

  if (stage.bar) {
    slider(stage.bar, 'phi', 0, 2 * Math.PI, 0.01, v, (x) => {
      v = x;
    });
  }

  return stage.dispose;
};

export default mount;
