// Particles: particlesSizeAttenuation shrinks dots with distance, or not
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { randomSpot, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['particlesSizeAttenuation: true (size 1)', 'particlesSizeAttenuation: false (size 3)'],
    hint: 'Zoom both globes. Attenuated dots grow as you approach; the others stay a fixed number of pixels.',
  });
  const dark = await texture('dark');

  const rand = rng(21);
  const dots = Array.from({ length: 500 }, () => ({ ...randomSpot(rand), alt: 0.02 + rand() * 0.15 }));

  const [left, right] = stage.panes;
  const near = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .particlesData([dots])
    .particleAltitude('alt')
    // Size is in world units, so a nearer dot looks bigger.
    .particlesSizeAttenuation(true)
    .particlesSize(1)
    .particlesColor(() => '#ffd166');

  const flat = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .particlesData([dots])
    .particleAltitude('alt')
    // Size is in screen pixels, whatever the distance.
    .particlesSizeAttenuation(false)
    .particlesSize(3)
    .particlesColor(() => '#5ec8ff');

  for (const g of [near, flat]) {
    g.pointOfView({ lat: 20, lng: 20, altitude: 2.4 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.6;
  }

  // Cards cannot be zoomed by hand: both cameras dolly in and out together.
  if (stage.preview) {
    stage.loop((_dt, t) => {
      const altitude = 1.4 + 1.2 * (0.5 + 0.5 * Math.sin(t * 0.8));
      for (const g of [near, flat]) g.pointOfView({ altitude });
    });
  }

  return stage.dispose;
};

export default mount;
