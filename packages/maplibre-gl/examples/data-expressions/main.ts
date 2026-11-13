// Data expressions (get, has, case, coalesce, concat) for city labels and colours
import { Map } from 'maplibre-gl';
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Feature, FeatureCollection, Point } from 'geojson';
import type { Mount } from '@/types.ts';
import { controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { cities, palette, seeded, worldStyle } from '../../shared/basemap.ts';
import { select } from '../../shared/controls.ts';

const nicknames: Record<string, string> = { newYork: 'Big Apple', reykjavik: 'Smoky Bay', singapore: 'Lion City', helsinki: 'Daughter of the Baltic' };

/** City points with invented properties: pop (millions), an optional nickname, and a capital flag. */
function places(): FeatureCollection<Point> {
  const rand = seeded(11);
  const features = Object.entries(cities).map(([key, coordinates]): Feature<Point> => {
    const nickname = nicknames[key];
    return {
      type: 'Feature',
      properties: {
        name: key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()),
        pop: Math.round((0.5 + rand() * 24) * 10) / 10,
        capital: rand() < 0.5,
        ...(nickname ? { nickname } : {}), // some cities have no nickname property at all
      },
      geometry: { type: 'Point', coordinates },
    };
  });
  return { type: 'FeatureCollection', features };
}

// Each entry is a text-field expression.
const labels: Record<string, ExpressionSpecification> = {
  'get': ['get', 'name'],
  'concat + to-string': ['concat', ['get', 'name'], ' (', ['to-string', ['get', 'pop']], 'M)'],
  'coalesce': ['coalesce', ['get', 'nickname'], ['upcase', ['get', 'name']]],
  'case + has': ['case', ['has', 'nickname'], ['concat', ['get', 'name'], '\n"', ['get', 'nickname'], '"'], ['get', 'name']],
  'case + comparison': [
    'case',
    ['>', ['get', 'pop'], 15], ['concat', ['downcase', ['get', 'name']], ': mega'],
    ['>', ['get', 'pop'], 5], ['concat', ['get', 'name'], ': large'],
    ['concat', ['get', 'name'], ': small'],
  ],
};

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(), // no glyphs URL: labels use local fonts
    center: [15, 30],
    zoom: preview ? 1.3 : 1.8,
    interactive: !preview,
  });
  const names = Object.keys(labels);
  const setLabel = (name: string): void => {
    const expr = labels[name];
    if (expr) map.setLayoutProperty('cities', 'text-field', expr);
  };

  map.on('load', () => {
    map.addSource('cities', { type: 'geojson', data: places() });
    map.addLayer({
      id: 'cities',
      type: 'symbol',
      source: 'cities',
      layout: {
        'text-field': labels[names[0] ?? ''] ?? '',
        'text-size': 12,
        'text-anchor': 'top',
        'text-offset': [0, 0.8],
        'text-allow-overlap': true,
      },
      paint: {
        'text-color': ['case', ['get', 'capital'], palette.accent, palette.text],
        'text-halo-color': palette.ocean,
        'text-halo-width': 1.5,
      },
    });
    map.addLayer({
      id: 'dots',
      type: 'circle',
      source: 'cities',
      paint: {
        // Nickname -> purple; otherwise big cities red and the rest blue.
        'circle-color': ['case', ['has', 'nickname'], palette.purple, ['>=', ['get', 'pop'], 15], palette.red, palette.blue],
        'circle-radius': ['+', 3, ['/', ['get', 'pop'], 4]],
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1,
      },
    });
  });

  let timer = 0;
  if (preview) {
    let i = 0;
    map.once('load', () => {
      timer = window.setInterval(() => setLabel(names[++i % names.length] ?? ''), 1600);
    });
  } else {
    const bar = controlBar(el);
    const out = readout(el, 'Values are invented. Amber text = capital flag; purple dot = has a nickname property.');
    select(bar, 'text-field', names, (n) => {
      setLabel(n);
      out.textContent = `text-field: ${JSON.stringify(labels[n])}`;
    });
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
