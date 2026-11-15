// HTML elements: htmlLat, htmlLng and htmlAltitude as attribute names or functions
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

// Data that does not use the default `lat` and `lng` keys.
interface Pin {
  label: string;
  pos: { latitude: number; longitude: number };
  height: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pins hover at their own height, read from the datum with attribute names and functions.' });
  const dark = await texture('dark');

  const pins: Pin[] = cities.slice(0, stage.preview ? 12 : 20).map((c) => ({
    label: c.name,
    pos: { latitude: c.lat, longitude: c.lng },
    height: 0.02 + c.pop / 120,
  }));

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .htmlElementsData(pins)
    .htmlLat((d) => (d as Pin).pos.latitude)
    .htmlLng((d) => (d as Pin).pos.longitude)
    // An attribute name works too.
    .htmlAltitude('height')
    .htmlElement((d) => {
      const pin = document.createElement('div');
      pin.textContent = (d as Pin).label;
      pin.style.cssText = `font:${stage.preview ? 10 : 12}px/1 system-ui,sans-serif;color:#1b1b1b;background:#ffd166;
        border-radius:4px;padding:2px 6px;white-space:nowrap`;
      return pin;
    });

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;
  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.3 });

  return stage.dispose;
};

export default mount;
