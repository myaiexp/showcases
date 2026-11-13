// Markers built from our own DOM elements, placed with anchor and offset
import { Map, Marker } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, readout } from '../../shared/setup.ts';
import { worldStyle, cities, palette } from '../../shared/basemap.ts';
import './style.css';

type CityName = keyof typeof cities;

/** A round badge element; MapLibre positions whatever element it is given. */
function badge(label: string, color: string): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'badge';
  div.style.background = color;
  div.textContent = label;
  return div;
}

/** A flag-like element for the anchor demo. */
function flag(text: string): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'flag';
  div.textContent = text;
  return div;
}

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [15, 35],
    zoom: preview ? 0.6 : 1.4,
    interactive: !preview,
  });

  const badges: [CityName, string, string][] = [
    ['london', 'L', palette.red],
    ['tokyo', 'T', palette.purple],
    ['newYork', 'N', '#f59e0b'],
    ['sydney', 'S', '#22c55e'],
  ];
  const all: Marker[] = badges.map(([city, label, color]) =>
    new Marker({ element: badge(label, color) }).setLngLat(cities[city]).addTo(map),
  );

  // anchor: the flag's bottom-left corner sits on the coordinate; offset nudges it in pixels.
  const flagMarker = new Marker({ element: flag('Cairo'), anchor: 'bottom-left', offset: [4, -4] })
    .setLngLat(cities.cairo)
    .addTo(map);
  const dot = new Marker({ element: badge('', palette.text), anchor: 'center' })
    .setLngLat(cities.cairo)
    .addTo(map);
  all.push(flagMarker, dot);

  let frame = 0;
  if (preview) {
    let t = 0;
    const tick = (): void => {
      t += 1;
      all[0]?.setOffset([0, 10 * Math.sin(t / 15)]);
      map.setCenter([15 + 10 * Math.sin(t / 200), 35]);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  } else {
    const out = readout(el, 'Click a badge to bump its offset (setOffset).');
    for (const m of all.slice(0, badges.length)) {
      m.getElement().addEventListener('click', () => {
        const [x, y] = [m.getOffset().x, m.getOffset().y - 8];
        m.setOffset([x, y]);
        out.textContent = `getOffset(): ${x}, ${y}`;
      });
    }
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
