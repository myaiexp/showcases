// Arc labels: route names anchored to each arc's peak through --cobe-arc-{id}
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PLACES } from '../../shared/places.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each label sits on the highest point of its arc.' });

  // 1. Define arcs with IDs
  const arcs = [
    { id: stage.id('sf-tokyo'), from: PLACES.sf.location, to: PLACES.tokyo.location, label: 'SF → Tokyo' },
    { id: stage.id('nyc-london'), from: PLACES.nyc.location, to: PLACES.london.location, label: 'NYC → London' },
    { id: stage.id('dubai-sydney'), from: PLACES.dubai.location, to: PLACES.sydney.location, label: 'Dubai → Sydney' },
  ];

  // 2. Pass to COBE
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
    markerColor: [1, 1, 1],
    glowColor: [0.3, 0.3, 0.35],
    arcColor: [1, 0.55, 0.3],
    arcWidth: 0.6,
    arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
    arcHeight: 0.3,
    markers: arcs.flatMap((a) => [a.from, a.to]).map((location) => ({ location, size: 0.025 })),
  });
  stage.own(globe);

  // 3. Render labels anchored to arc midpoints
  for (const a of arcs) {
    const label = document.createElement('div');
    label.className = 'arc-label';
    label.textContent = a.label;
    label.style.setProperty('position-anchor', `--cobe-arc-${a.id}`);
    label.style.opacity = `var(--cobe-visible-arc-${a.id}, 0)`;
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
