// width, height and devicePixelRatio side by side, with each canvas size
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['width = size, dpr 1', 'width = size, dpr 2', 'width = size * 2, dpr 2'],
    hint: 'The canvas is always drawn at the same CSS size; size changes only how many pixels back it.',
  });
  const [a, b, c] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0], (typeof stage.panes)[0]];
  const size0 = a.width; // CSS px the pane is shown at

  const common = { phi: 0, theta: 0.25, dark: 1, diffuse: 1.2, mapSamples: 16000, mapBrightness: 6 } as const;
  const colors = {
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.25, 0.25, 0.3],
  } as const;
  const markers = [{ location: [37.78, -122.44], size: 0.05 }] satisfies { location: [number, number]; size: number }[];

  // 1. CSS size, density 1: canvas.width = width * 1
  const g1 = createGlobe(a.canvas, {
    devicePixelRatio: 1, width: size0, height: size0, ...common,
    baseColor: [...colors.baseColor], markerColor: [...colors.markerColor], glowColor: [...colors.glowColor], markers,
  });
  stage.own(g1, a);
  // 2. The same CSS size, density 2: canvas.width = width * 2
  const g2 = createGlobe(b.canvas, {
    devicePixelRatio: 2, width: size0, height: size0, ...common,
    baseColor: [...colors.baseColor], markerColor: [...colors.markerColor], glowColor: [...colors.glowColor], markers,
  });
  stage.own(g2, b);
  // 3. The docs' Usage form: width and height doubled, devicePixelRatio 2 (canvas.width = size * 4)
  const g3 = createGlobe(c.canvas, {
    devicePixelRatio: 2, width: size0 * 2, height: size0 * 2, ...common,
    baseColor: [...colors.baseColor], markerColor: [...colors.markerColor], glowColor: [...colors.glowColor], markers,
  });
  stage.own(g3, c);

  let size = size0;
  let phi = 0;
  stage.loop((_dt, t) => {
    // Cards shrink and grow the size so the sharpness change is visible.
    if (stage.preview) size = Math.round(size0 * (0.3 + 0.7 * (0.5 - 0.5 * Math.cos(t * 0.9))));
    phi += 0.005;
    // width and height only take effect when both are passed.
    g1.update({ phi, width: size, height: size });
    g2.update({ phi, width: size, height: size });
    g3.update({ phi, width: size * 2, height: size * 2 });
    for (const [pane, base] of [[a, 'size'], [b, 'size'], [c, 'size * 2']] as const) {
      pane.caption!.textContent = `${base}=${base === 'size' ? size : size * 2} -> canvas ${pane.canvas.width}x${pane.canvas.height}`;
    }
  });

  if (stage.bar) {
    slider(stage.bar, 'size (px)', 40, Math.round(size0 * 1.5), 1, size, (x) => {
      size = x;
    });
  }

  return stage.dispose;
};

export default mount;
