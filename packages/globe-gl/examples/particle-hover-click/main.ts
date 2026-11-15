// Particles: onParticleHover and onParticleClick report the dot under the pointer
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Dot {
  name: string;
  lat: number;
  lng: number;
  alt: number;
}

const dots: Dot[] = [
  { name: 'Alpha', lat: 30, lng: 0, alt: 0.1 },
  { name: 'Bravo', lat: 10, lng: 25, alt: 0.2 },
  { name: 'Charlie', lat: 25, lng: 50, alt: 0.15 },
  { name: 'Delta', lat: 0, lng: 10, alt: 0.3 },
  { name: 'Echo', lat: 40, lng: 30, alt: 0.25 },
  { name: 'Foxtrot', lat: -5, lng: 45, alt: 0.1 },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot for its name, click it to fly there. The hovered dot turns red and the set gets bigger.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Hover or click a dot');

  let hovered: Dot | null = null;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    // One set, so the datum is the array of dots itself.
    .particlesData([dots])
    .particleAltitude('alt')
    .particleLabel((d) => `<b>${(d as Dot).name}</b>`)
    .particlesSize(6)
    .particlesSizeAttenuation(false)
    .particlesColor(() => '#ffd166')
    .onParticleHover((p) => {
      hovered = p as Dot | null;
      if (log) log.textContent = hovered ? `Hovering ${hovered.name}` : 'Hover or click a dot';
      // Colour belongs to the set, so the hover is shown by making the whole set bigger.
      globe.particlesSize(hovered ? 9 : 6).particlesColor(() => (hovered ? '#ff5d73' : '#ffd166'));
    })
    .onParticleClick((p, _event, { lat, lng, altitude }) => {
      const d = p as Dot;
      globe.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1.8 }, 1000);
      if (log) log.textContent = `Clicked ${d.name} at ${lat.toFixed(1)}, ${lng.toFixed(1)}, altitude ${altitude.toFixed(2)}`;
    });
  globe.pointOfView({ lat: 20, lng: 25, altitude: 2.3 });

  if (stage.preview) {
    const ghost = stage.ghost(globe);
    let i = 0;
    stage.every(2200, () => {
      const d = dots[i++ % dots.length]!;
      globe.pointOfView({ lat: d.lat - 8, lng: d.lng, altitude: 2.3 }, 600);
      stage.after(800, () => ghost.at(d.lat, d.lng, d.alt));
      stage.after(1500, () => ghost.click());
    });
  } else {
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.3;
  }

  return stage.dispose;
};

export default mount;
