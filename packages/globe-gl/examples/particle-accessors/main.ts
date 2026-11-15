// Particles: particle accessors read nested fields, converted units and labels
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

// Not the default field names, and the particles sit inside a wrapper object.
interface Fleet {
  callsign: string;
  ships: { id: string; position: { la: number; ln: number }; heightKm: number }[];
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot. Its position, height and tooltip all come from custom fields.' });
  const dark = await texture('dark');

  const fleets: Fleet[] = [
    {
      callsign: 'Low orbit',
      ships: Array.from({ length: 40 }, (_, i) => ({
        id: `LO-${i + 1}`,
        position: { la: 45 * Math.sin((i * 2 * Math.PI) / 40), ln: -180 + i * 9 },
        heightKm: 500 + (i % 4) * 80,
      })),
    },
    {
      callsign: 'High orbit',
      ships: Array.from({ length: 24 }, (_, i) => ({
        id: `HO-${i + 1}`,
        position: { la: 8 * Math.cos(i), ln: -180 + i * 15 },
        heightKm: 2500 + (i % 3) * 300,
      })),
    },
  ];

  type Ship = Fleet['ships'][number];
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .particlesData(fleets)
    // Where each set keeps its particles (by function; an attribute name works too).
    .particlesList((d) => (d as Fleet).ships)
    .particleLat((d) => (d as Ship).position.la)
    .particleLng((d) => (d as Ship).position.ln)
    // Kilometres above the surface, as globe radii (the Earth is about 6371 km).
    .particleAltitude((d) => (d as Ship).heightKm / 6371)
    .particleLabel((d) => `<b>${(d as Ship).id}</b><br>${(d as Ship).heightKm} km`)
    .particlesSize(1.8)
    .particlesColor((d) => ((d as Fleet).callsign === 'Low orbit' ? '#5ec8ff' : '#ffd166'));

  if (stage.preview) {
    globe.pointOfView({ lat: 20, lng: 0, altitude: 2.4 });
  } else {
    globe.pointOfView({ lat: 20, lng: 0, altitude: 2.2 });
  }
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  return stage.dispose;
};

export default mount;
