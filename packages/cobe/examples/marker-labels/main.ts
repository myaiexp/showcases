// Marker labels: DOM labels on marker ids, fading as markers turn away
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PLACES } from '../../shared/places.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each label is a plain <div> placed by CSS Anchor Positioning.' });

  // 1. Define markers with IDs (stage.id keeps them unique on a page of many globes).
  const markers = [PLACES.sf, PLACES.tokyo, PLACES.london, PLACES.sydney, PLACES.saopaulo].map((p) => ({
    id: stage.id(p.key),
    location: p.location,
    label: p.name,
  }));

  // 2. Pass to COBE (label is our own property, so it stays behind).
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
    glowColor: [0.25, 0.25, 0.3],
    markers: markers.map((m) => ({ location: m.location, size: 0.04, id: m.id })),
  });
  stage.own(globe);

  // 3. Render labels anchored to markers: --cobe-{id} places them,
  //    --cobe-visible-{id} hides them while the marker is on the far side.
  for (const m of markers) {
    const label = document.createElement('div');
    label.className = 'marker-label';
    label.textContent = m.label;
    label.style.setProperty('position-anchor', `--cobe-${m.id}`);
    label.style.opacity = `var(--cobe-visible-${m.id}, 0)`;
    stage.layer.append(label);
  }

  let phi = 0;
  stage.loop(() => {
    phi += 0.004;
    globe.update({ phi });
  });

  return stage.dispose;
};

export default mount;
