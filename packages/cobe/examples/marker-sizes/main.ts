// Marker sizes: dots from 0.01 to 0.1 on the equator, one sweeping the range
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { badge } from '../../shared/overlay.ts';
import './style.css';

const SIZES = [0.01, 0.02, 0.04, 0.06, 0.08, 0.1];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'size is relative to the globe radius. The dot at the top sweeps 0.01 to 0.1.' });
  const ids = SIZES.map((s) => stage.id(`s${s * 100}`));

  const row = SIZES.map((size, i) => ({ location: [0, i * 60] as [number, number], size, id: ids[i]! }));
  let pulse = 0.05;
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
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.2, 0.2, 0.25],
    markers: row,
  });
  stage.own(globe);

  SIZES.forEach((size, i) => {
    const label = document.createElement('div');
    label.className = 'size-label';
    label.textContent = String(size);
    label.style.setProperty('position-anchor', `--cobe-${ids[i]}`);
    label.style.opacity = `var(--cobe-visible-${ids[i]}, 0)`;
    stage.layer.append(label);
  });
  const sizeBadge = badge(stage.layer, '', 'top-left');

  let manual = false;
  if (stage.bar) {
    slider(stage.bar, 'Top dot size', 0.01, 0.1, 0.005, pulse, (v) => {
      manual = true;
      pulse = v;
    }, (v) => v.toFixed(3));
  }

  let phi = 0;
  stage.loop((_dt, t) => {
    phi += 0.004;
    if (!manual) pulse = 0.055 + 0.045 * Math.sin(t * 1.6);
    sizeBadge.textContent = `size ${pulse.toFixed(3)}`;
    globe.update({ phi, markers: [...row, { location: [55, 0], size: pulse }] });
  });

  return stage.dispose;
};

export default mount;
