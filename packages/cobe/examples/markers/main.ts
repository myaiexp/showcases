// Markers tab: a basic marker, one with a custom colour, and one with an id
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { badge } from '../../shared/overlay.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Orange: basic. Red: custom colour. Blue: has an id, so a label can follow it.' });
  const tokyo = stage.id('tokyo');

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
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.2, 0.2, 0.25],
    markers: [
      // Basic marker
      { location: [37.78, -122.44], size: 0.03 },
      // With custom color (RGB 0-1)
      { location: [51.51, -0.13], size: 0.05, color: [1, 0, 0] },
      // With id for CSS anchoring (stage.id makes it unique to this mount)
      { location: [35.68, 139.65], size: 0.04, id: tokyo },
    ],
  });
  stage.own(globe);

  const label = document.createElement('div');
  label.className = 'tokyo-label';
  label.textContent = 'tokyo';
  label.style.setProperty('position-anchor', `--cobe-${tokyo}`);
  label.style.opacity = `var(--cobe-visible-${tokyo}, 0)`;
  stage.layer.append(label);
  if (stage.preview) badge(stage.layer, 'size 0.03 / 0.05 / 0.04', 'bottom-left');

  let phi = 3.2;
  stage.loop(() => {
    phi += 0.005;
    globe.update({ phi });
  });

  return stage.dispose;
};

export default mount;
