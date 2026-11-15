// Arcs tab: a basic arc, a custom colour, an id, and the global arc settings
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Blue: global arcColor. Green: its own color. The Tokyo-Sydney arc carries a label at its peak.' });
  const id = stage.id('tokyo-sydney');

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
    arcs: [
      // Basic arc between two points
      { from: [37.78, -122.44], to: [51.51, -0.13] },
      // With custom color
      { from: [40.71, -74.01], to: [48.86, 2.35], color: [0, 1, 0] },
      // With id for CSS anchoring (anchors at arc midpoint)
      { from: [35.68, 139.65], to: [-33.87, 151.21], id },
    ],
    // Global arc settings
    arcColor: [0.3, 0.5, 1], // Default color
    arcWidth: 0.5, // Line thickness
    arcHeight: 0.3, // Curve height above surface
  });
  stage.own(globe);

  const label = document.createElement('div');
  label.className = 'arc-label';
  label.textContent = 'tokyo-sydney';
  label.style.setProperty('position-anchor', `--cobe-arc-${id}`);
  label.style.opacity = `var(--cobe-visible-arc-${id}, 0)`;
  stage.layer.append(label);

  let phi = 4.6;
  stage.loop(() => {
    phi += 0.004;
    globe.update({ phi });
  });

  return stage.dispose;
};

export default mount;
