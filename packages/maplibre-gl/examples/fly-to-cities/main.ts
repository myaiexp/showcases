// flyTo between the shared cities with adjustable curve and speed
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { cities, cityLabels, worldStyle, type CityName } from '../../shared/basemap.ts';
import { slider } from '../../shared/controls.ts';

const names = Object.keys(cities) as CityName[];

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: cities.helsinki,
    zoom: preview ? 2.5 : 3,
    interactive: !preview,
  });

  // The documented FlyToOptions this example exposes.
  let curve = 1.42;
  let speed = 1.2;
  let current = 0;
  // True while the last camera move was our own flyTo; user input clears it.
  let ours = false;

  const flyTo = (i: number): void => {
    current = i;
    ours = true;
    map.flyTo({
      center: cities[names[i] ?? 'helsinki'],
      zoom: 4,
      curve, // how much the flight arc zooms out
      speed, // the average flight speed
      essential: true,
    });
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(() => flyTo((current + 1) % names.length), 2600);
  } else {
    const bar = controlBar(el);
    names.forEach((name, i) => button(bar, cityLabels[name], () => flyTo(i)));
    const opts = controlBar(el);
    slider(opts, 'curve', 1, 3, 0.05, curve, (v) => (curve = v));
    slider(opts, 'speed', 0.4, 3, 0.1, speed, (v) => (speed = v));
    const info = readout(el, 'Pick a city. A high curve zooms out far on the way; 1 flies a flat arc.');
    // A movestart with an originalEvent comes from the user (drag, wheel, keys), not from flyTo.
    map.on('movestart', (e) => {
      if (e.originalEvent) ours = false;
    });
    map.on('moveend', () => {
      const c = map.getCenter();
      const where = ours ? `At ${cityLabels[names[current] ?? 'helsinki']}` : `At ${c.lat.toFixed(2)}, ${c.lng.toFixed(2)}`;
      info.textContent = `${where}: zoom ${map.getZoom().toFixed(1)}, curve ${curve}, speed ${speed}`;
    });
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
