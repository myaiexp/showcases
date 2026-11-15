// glowColor: atmosphere: sweep in cards, control in full view
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { color, type Rgb } from '../../shared/controls.ts';

const palette: Rgb[] = [[0.25, 0.25, 0.3], [0.2, 0.5, 1], [1, 0.3, 0.5], [0.3, 1, 0.5]];
const mix = (a: Rgb, b: Rgb, k: number): Rgb => [0, 1, 2].map((i) => a[i]! + (b[i]! - a[i]!) * k) as Rgb;
// Four seconds per colour, blending into the next.
const at = (t: number): Rgb => {
  const u = (t / 4) % palette.length;
  const i = Math.floor(u);
  return mix(palette[i]!, palette[(i + 1) % palette.length]!, u - i);
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: [''], hint: "The glow is the haze outside the disc and the edge of the ball." });
  const caption = stage.panes[0]!.caption!;

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
    glowColor: [0.25, 0.25, 0.3], // swept
    markers: [
      { location: [37.78, -122.44], size: 0.04 },
      { location: [51.51, -0.13], size: 0.04 },
      { location: [35.68, 139.65], size: 0.04 },
    ],
  });
  stage.own(globe);

  // Cards sweep the value; the full view holds it until the control moves.
  let c: Rgb = [0.25, 0.25, 0.3];
  let phi = 0;
  stage.loop((_dt, t) => {
    if (stage.preview) c = at(t);
    phi += 0.005;
    globe.update({ phi, glowColor: c });
    caption.textContent = `glowColor [${c.map((x) => x.toFixed(2)).join(', ')}]`;
  });

  if (stage.bar) {
    color(stage.bar, 'glowColor', c, (x) => {
      c = x;
    });
  }

  return stage.dispose;
};

export default mount;
