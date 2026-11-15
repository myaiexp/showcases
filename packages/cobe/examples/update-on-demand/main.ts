// update() draws exactly one frame: a globe with no loop, redrawn only when asked
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { badge } from '../../shared/overlay.ts';
import { button, slider } from '../../shared/controls.ts';
import { PLACES } from '../../shared/places.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'No animation loop: the globe changes only when update() runs.' });
  const counter = badge(stage.layer, '', 'top-left');
  let frames = 1; // createGlobe draws the first frame itself

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.1, 0.8, 1],
    glowColor: [0.2, 0.3, 0.4],
    markers: [{ location: PLACES.helsinki.location, size: 0.06 }],
  });
  stage.own(globe);

  let phi = 0;
  let theta = 0.3;
  const draw = (state: { phi?: number; theta?: number }): void => {
    globe.update(state);
    frames += 1;
    counter.textContent = `frames drawn: ${frames}`;
  };
  // The land map decodes after createGlobe returns and 2.0.1 does not redraw for it,
  // so ask for one more frame shortly after.
  stage.after(150, () => draw({}));

  if (stage.bar) {
    const phiInput = slider(stage.bar, 'phi', 0, 6.28, 0.01, phi, (v) => draw({ phi: (phi = v) }), (v) => v.toFixed(2));
    slider(stage.bar, 'theta', -1.5, 1.5, 0.01, theta, (v) => draw({ theta: (theta = v) }), (v) => v.toFixed(2));
    button(stage.bar, 'Step phi +0.5', () => {
      phi = (phi + 0.5) % 6.28;
      phiInput.value = String(phi);
      phiInput.dispatchEvent(new Event('input'));
    });
  } else {
    // Card: one update every 700 ms, so the globe jumps instead of gliding.
    stage.every(700, () => draw({ phi: (phi += 0.5) }));
  }

  return stage.dispose;
};

export default mount;
