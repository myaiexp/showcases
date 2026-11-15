// One variable, many properties: --cobe-visible-{id} on opacity, blur, scale
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PLACES } from '../../shared/places.ts';
import './style.css';

// Each label uses the visibility variable on a different CSS property. Hidden: the
// variable is undefined and the fallback applies. Visible: it holds an invalid value,
// so the property falls back to its initial value (opacity 1, no filter, no scale).
const STYLES = [
  { place: PLACES.nyc, kind: 'opacity', css: (v: string) => ({ opacity: `var(${v}, 0)` }) },
  { place: PLACES.london, kind: 'blur', css: (v: string) => ({ filter: `blur(calc((1 - var(${v}, 0)) * 8px))` }) },
  { place: PLACES.lagos, kind: 'scale', css: (v: string) => ({ scale: `var(${v}, 0)` }) },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three labels, one variable each, three different exits.' });

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
    markerColor: [1, 0.85, 0.3],
    glowColor: [0.3, 0.3, 0.3],
    markers: STYLES.map((s) => ({ location: s.place.location, size: 0.05, id: stage.id(s.place.key) })),
  });
  stage.own(globe);

  for (const s of STYLES) {
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = `${s.place.name} · ${s.kind}`;
    label.style.setProperty('position-anchor', `--cobe-${stage.id(s.place.key)}`);
    Object.assign(label.style, s.css(`--cobe-visible-${stage.id(s.place.key)}`));
    stage.layer.append(label);
  }

  let phi = 0;
  stage.loop(() => {
    phi += 0.006;
    globe.update({ phi });
  });

  return stage.dispose;
};

export default mount;
