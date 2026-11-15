// mapSamples: dot count: sweep in cards, control in full view
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: [''], hint: "Range from the docs: 1000 to 100000. See the summary for what happens past 32768." });
  const caption = stage.panes[0]!.caption!;

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.25,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000, // swept
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
  let v = 16000;
  let phi = 0;
  stage.loop((_dt, t) => {
    const s = 0.5 - 0.5 * Math.cos(t * 0.9);
    if (stage.preview) v = Math.round(1000 * (100000 / 1000) ** s);
    phi += 0.005;
    globe.update({ phi, mapSamples: v });
    caption.textContent = `mapSamples ${`${v}${v > 32767 ? ' (above 32767)' : ''}`}`;
  });

  if (stage.bar) {
    slider(stage.bar, 'mapSamples', 1000, 100000, 1000, v, (x) => {
      v = x;
    });
  }

  return stage.dispose;
};

export default mount;
