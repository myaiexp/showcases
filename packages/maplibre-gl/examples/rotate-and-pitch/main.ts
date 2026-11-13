// Camera bearing and pitch with rotateTo, setPitch, easeTo and resetNorth
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { cities, worldStyle } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: cities.london,
    zoom: 4,
    pitch: preview ? 55 : 0,
    maxPitch: 80,
    interactive: !preview,
  });

  let frame = 0;
  if (preview) {
    // Orbit: keep turning the bearing while the pitch slowly breathes.
    const orbit = (t: number): void => {
      map.setBearing(map.getBearing() + 0.3);
      map.setPitch(55 + Math.sin(t / 1500) * 15);
      frame = requestAnimationFrame(orbit);
    };
    map.once('load', () => (frame = requestAnimationFrame(orbit)));
  } else {
    const bar = controlBar(el);
    const info = readout(el);
    const update = (): void => {
      info.textContent = `bearing ${map.getBearing().toFixed(0)}, pitch ${map.getPitch().toFixed(0)}`;
    };
    map.on('rotate', update);
    map.on('pitch', update);
    update();

    button(bar, 'rotateTo 90', () => void map.rotateTo(90, { duration: 1500 }));
    button(bar, 'rotateTo -45', () => void map.rotateTo(-45, { duration: 1500 }));
    button(bar, 'setPitch 60', () => void map.setPitch(60));
    button(bar, 'easeTo pitch 70', () => void map.easeTo({ pitch: 70, bearing: 20, duration: 2000 }));
    button(bar, 'resetNorth', () => void map.resetNorth({ duration: 1000 }));
    button(bar, 'resetNorthPitch', () => void map.resetNorthPitch({ duration: 1000 }));
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
