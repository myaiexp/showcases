// update() takes any option: one globe restyled live, never recreated
import createGlobe from 'cobe';
import type { COBEOptions } from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { badge } from '../../shared/overlay.ts';
import { button } from '../../shared/controls.ts';
import { PLACES } from '../../shared/places.ts';

type Look = Pick<COBEOptions, 'dark' | 'diffuse' | 'mapBrightness' | 'baseColor' | 'markerColor' | 'glowColor' | 'scale'>;

// Three looks; every number in them blends smoothly when passed to update() frame by frame.
const LOOKS: { name: string; look: Look }[] = [
  { name: 'night', look: { dark: 1, diffuse: 1.2, mapBrightness: 6, baseColor: [0.3, 0.3, 0.3], markerColor: [1, 0.6, 0.2], glowColor: [0.3, 0.3, 0.4], scale: 1 } },
  { name: 'paper', look: { dark: 0, diffuse: 1.6, mapBrightness: 4, baseColor: [1, 1, 1], markerColor: [0.9, 0.1, 0.2], glowColor: [0.9, 0.9, 0.9], scale: 0.85 } },
  { name: 'ocean', look: { dark: 1, diffuse: 2.5, mapBrightness: 9, baseColor: [0.1, 0.35, 0.6], markerColor: [0.6, 1, 0.8], glowColor: [0.1, 0.5, 0.9], scale: 1.1 } },
];

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const mix = (a: Look, b: Look, t: number): Look => ({
  dark: lerp(a.dark, b.dark, t),
  diffuse: lerp(a.diffuse, b.diffuse, t),
  mapBrightness: lerp(a.mapBrightness, b.mapBrightness, t),
  scale: lerp(a.scale ?? 1, b.scale ?? 1, t),
  baseColor: a.baseColor.map((v, i) => lerp(v, b.baseColor[i]!, t)) as Look['baseColor'],
  markerColor: a.markerColor.map((v, i) => lerp(v, b.markerColor[i]!, t)) as Look['markerColor'],
  glowColor: a.glowColor.map((v, i) => lerp(v, b.glowColor[i]!, t)) as Look['glowColor'],
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const name = badge(stage.layer, LOOKS[0]!.name, 'top-left');

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.25,
    mapSamples: 16000,
    markers: [PLACES.paris, PLACES.lagos, PLACES.mumbai].map((p) => ({ location: p.location, size: 0.05 })),
    ...LOOKS[0]!.look,
  });
  stage.own(globe);

  let from = LOOKS[0]!.look;
  let to = from;
  let blend = 1;
  let index = 0;
  const goTo = (i: number): void => {
    from = mix(from, to, blend); // start from wherever the last blend got to
    to = LOOKS[i]!.look;
    blend = 0;
    index = i;
    name.textContent = LOOKS[i]!.name;
  };

  if (stage.bar) {
    for (const [i, l] of LOOKS.entries()) button(stage.bar, l.name, () => goTo(i));
  } else {
    stage.every(2600, () => goTo((index + 1) % LOOKS.length));
  }

  let phi = 0;
  stage.loop((dt) => {
    phi += 0.004;
    blend = Math.min(1, blend + dt);
    // Every option goes through the same call that turns the globe.
    globe.update({ phi, ...mix(from, to, blend) });
  });

  return stage.dispose;
};

export default mount;
