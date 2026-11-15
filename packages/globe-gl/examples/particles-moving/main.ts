// Particles: set particlesData again every frame to move the dots
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Orbit {
  /** Orbit tilt in degrees, and altitude in globe radii. */
  tilt: number;
  alt: number;
  /** Degrees travelled per second. */
  speed: number;
  color: string;
  count: number;
}

const orbits: Orbit[] = [
  { tilt: 20, alt: 0.12, speed: 40, color: '#ffd166', count: 24 },
  { tilt: 70, alt: 0.25, speed: -25, color: '#5ec8ff', count: 18 },
  { tilt: 110, alt: 0.4, speed: 15, color: '#ef476f', count: 12 },
];

/** Dots spread round one orbit, `phase` degrees along: a circle tilted about the x axis. */
function place(o: Orbit, phase: number): { lat: number; lng: number; alt: number }[] {
  const rad = Math.PI / 180;
  return Array.from({ length: o.count }, (_, i) => {
    const a = (phase + (i * 360) / o.count) * rad;
    const x = Math.cos(a);
    const y = Math.sin(a) * Math.cos(o.tilt * rad);
    const z = Math.sin(a) * Math.sin(o.tilt * rad);
    return { lat: Math.asin(z) / rad, lng: Math.atan2(y, x) / rad, alt: o.alt };
  });
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three rings of dots circle the globe at different tilts, heights and speeds.' });
  const dark = await texture('dark');

  let rate = 1;
  const sets = (t: number) =>
    orbits.map((o) => ({ color: o.color, size: 2, list: place(o, o.speed * rate * t) }));

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .particlesData(sets(0))
    .particlesList('list')
    .particleAltitude('alt')
    .particlesColor('color')
    .particlesSize('size');

  // New data every frame moves every dot; at 30 per second this stays smooth.
  let clock = 0;
  let since = 0;
  stage.loop((dt) => {
    clock += dt;
    since += dt;
    if (since < 1 / 30) return;
    since = 0;
    globe.particlesData(sets(clock));
  });

  if (stage.bar) {
    slider(stage.bar, 'Speed', 0, 4, 0.25, 1, (v) => (rate = v), (v) => `${v}x`);
  }

  globe.pointOfView({ lat: 25, lng: 30, altitude: 2.6 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.3;

  return stage.dispose;
};

export default mount;
