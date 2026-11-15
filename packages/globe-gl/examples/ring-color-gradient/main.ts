// Rings: ringColor as an array or a function of t shades each ring outwards
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['ringColor: array of colours', 'ringColor: function of t'],
    hint: 'The colour at a ring depends on how far it has spread: t is 0 at the centre and 1 at the maximum radius.',
  });
  const dark = await texture('dark');
  const spots = cities.filter((c) => ['Tokyo', 'Delhi', 'Cairo', 'Lagos', 'Moscow', 'London', 'Mumbai', 'Istanbul'].includes(c.name));

  const [left, right] = stage.panes;
  const stops = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .ringsData(spots)
    .ringMaxRadius(9)
    .ringPropagationSpeed(5)
    // A colour at each stop, blended between the centre and the maximum radius.
    .ringColor(() => ['#ffffff', '#ffd166', '#ef476f', 'rgba(239, 71, 111, 0)']);

  const fn = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .ringsData(spots)
    .ringMaxRadius(9)
    .ringPropagationSpeed(5)
    // An interpolator t => colour, here fading out as the ring grows.
    .ringColor(() => (t: number) => `rgba(94, 200, 255, ${Math.sqrt(1 - t)})`);

  for (const g of [stops, fn]) {
    g.pointOfView({ lat: 30, lng: 45, altitude: stage.preview ? 2.8 : 2.5 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.5;
  }

  return stage.dispose;
};

export default mount;
