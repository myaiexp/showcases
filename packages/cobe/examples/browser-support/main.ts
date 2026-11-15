// Browser support fallback: @supports hides anchored labels or lists them instead
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { badge } from '../../shared/overlay.ts';
import { select } from '../../shared/controls.ts';
import { PLACES } from '../../shared/places.ts';
import './style.css';

// 'anchored' is what this browser does on its own; the other two apply the docs' two
// @supports fallbacks by class, so a browser with anchor positioning can preview them.
const MODES = ['anchored', 'fallback: hide', 'fallback: list'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const supported = CSS.supports('anchor-name: --test');
  const status = badge(stage.layer, '', 'bottom-left');

  const cities = [PLACES.sf, PLACES.mexico, PLACES.saopaulo, PLACES.reykjavik];
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
    markerColor: [0.5, 0.7, 1],
    glowColor: [0.25, 0.3, 0.4],
    markers: cities.map((c) => ({ location: c.location, size: 0.04, id: stage.id(c.key) })),
  });
  stage.own(globe);

  const labels = document.createElement('div');
  labels.className = 'labels';
  for (const c of cities) {
    const label = document.createElement('div');
    label.className = 'marker-label';
    label.textContent = c.name;
    label.style.setProperty('position-anchor', `--cobe-${stage.id(c.key)}`);
    label.style.setProperty('--visible', `var(--cobe-visible-${stage.id(c.key)}, 0)`);
    labels.append(label);
  }
  stage.layer.append(labels);

  const show = (mode: Mode): void => {
    labels.classList.toggle('simulate-hide', mode === 'fallback: hide');
    labels.classList.toggle('simulate-list', mode === 'fallback: list');
    status.textContent = `anchor positioning: ${supported ? 'yes' : 'no'} · ${mode}`;
  };
  show('anchored');

  if (stage.bar) {
    select(stage.bar, 'Show', MODES, show);
  } else {
    let i = 0;
    stage.every(2200, () => show(MODES[++i % MODES.length]!));
  }

  let phi = 0;
  stage.loop(() => {
    phi += 0.004;
    globe.update({ phi });
  });

  return stage.dispose;
};

export default mount;
