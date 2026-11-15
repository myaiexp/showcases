// Blur while hidden: the visibility variable's fallback blurs and fades a label
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PLACES } from '../../shared/places.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Labels blur and fade as their city turns to the far side.' });

  const markers = [PLACES.reykjavik, PLACES.helsinki, PLACES.dubai, PLACES.capetown, PLACES.saopaulo, PLACES.mexico].map(
    (p) => ({ id: stage.id(p.key), location: p.location, label: p.name }),
  );

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
    baseColor: [0.25, 0.3, 0.35],
    markerColor: [0.4, 0.9, 1],
    glowColor: [0.2, 0.35, 0.45],
    markers: markers.map((m) => ({ location: m.location, size: 0.04, id: m.id })),
  });
  stage.own(globe);

  for (const m of markers) {
    const label = document.createElement('div');
    label.className = 'marker-label';
    label.textContent = m.label;
    label.style.setProperty('position-anchor', `--cobe-${m.id}`);
    // Fade out when marker rotates to back of globe
    label.style.opacity = `var(--cobe-visible-${m.id}, 0)`;
    // Blur when marker is hidden (fallback used when var is undefined)
    label.style.filter = `blur(var(--cobe-visible-${m.id}, 8px))`;
    stage.layer.append(label);
  }

  let phi = 0;
  stage.loop(() => {
    phi += 0.005;
    globe.update({ phi });
  });

  return stage.dispose;
};

export default mount;
