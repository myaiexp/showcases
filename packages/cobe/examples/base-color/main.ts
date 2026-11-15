// baseColor: globe tint: sweep in cards, control in full view
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { color, type Rgb } from '../../shared/controls.ts';

const palette: Rgb[] = [[1, 1, 1], [0.4, 0.7, 1], [1, 0.6, 0.3], [0.5, 1, 0.6]];
const mix = (a: Rgb, b: Rgb, k: number): Rgb => [0, 1, 2].map((i) => a[i]! + (b[i]! - a[i]!) * k) as Rgb;
// Four seconds per colour, blending into the next.
const at = (t: number): Rgb => {
  const u = (t / 4) % palette.length;
  const i = Math.floor(u);
  return mix(palette[i]!, palette[(i + 1) % palette.length]!, u - i);
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: [''], hint: "Pick any colour; cobe takes [r, g, b] with each channel from 0 to 1." });
  const caption = stage.panes[0]!.caption!;

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.25,
    dark: 0,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [1, 1, 1], // swept
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
  let c: Rgb = [1, 1, 1];
  let phi = 0;
  stage.loop((_dt, t) => {
    if (stage.preview) c = at(t);
    phi += 0.005;
    globe.update({ phi, baseColor: c });
    caption.textContent = `baseColor [${c.map((x) => x.toFixed(2)).join(', ')}]`;
  });

  if (stage.bar) {
    color(stage.bar, 'baseColor', c, (x) => {
      c = x;
    });
  }

  return stage.dispose;
};

export default mount;
