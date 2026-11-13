// setFilter with expressions on ~300 seeded random points
import { Map } from 'maplibre-gl';
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Feature, FeatureCollection, Point } from 'geojson';
import type { Mount } from '@/types.ts';
import { controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { palette, seeded, worldStyle } from '../../shared/basemap.ts';
import { slider } from '../../shared/controls.ts';

const kinds = ['quake', 'volcano', 'landslide'] as const;
const kindColors = [palette.red, palette.accent, palette.blue] as const;

const rand = seeded(42);
const features: Feature<Point>[] = Array.from({ length: 300 }, (_, i) => ({
  type: 'Feature',
  id: i,
  properties: { magnitude: Math.round(rand() * 90) / 10, kind: kinds[Math.floor(rand() * 3)] },
  geometry: { type: 'Point', coordinates: [rand() * 340 - 170, rand() * 130 - 60] },
}));
const data: FeatureCollection<Point> = { type: 'FeatureCollection', features };

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 20],
    zoom: preview ? 0.6 : 1.2,
    interactive: !preview,
  });

  let threshold = 0;
  let kind = 'all';
  let info: HTMLElement | null = null;

  const apply = (): void => {
    const clauses: ExpressionSpecification[] = [['>=', ['get', 'magnitude'], threshold]];
    if (kind !== 'all') clauses.push(['==', ['get', 'kind'], kind]);
    map.setFilter('points', ['all', ...clauses]);
    if (info) {
      const n = features.filter(
        (f) => f.properties!.magnitude >= threshold && (kind === 'all' || f.properties!.kind === kind),
      ).length;
      info.textContent = `${n} of ${features.length} points match magnitude >= ${threshold}, kind: ${kind}`;
    }
  };

  let timer = 0;
  map.on('load', () => {
    map.addSource('points', { type: 'geojson', data });
    map.addLayer({
      id: 'points',
      type: 'circle',
      source: 'points',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['get', 'magnitude'], 0, 2, 9, 9],
        'circle-color': ['match', ['get', 'kind'], 'quake', kindColors[0], 'volcano', kindColors[1], kindColors[2]],
        'circle-opacity': 0.8,
      },
    });
    if (preview) {
      let t = 0;
      timer = window.setInterval(() => {
        t += 0.1;
        threshold = Math.round((Math.sin(t) * 0.5 + 0.5) * 80) / 10;
        apply();
      }, 100);
    } else {
      apply();
    }
  });

  if (!preview) {
    const bar = controlBar(el);
    slider(bar, 'min magnitude', 0, 9, 0.5, 0, (v) => {
      threshold = v;
      apply();
    });
    const wrap = document.createElement('label');
    wrap.append('kind ');
    const sel = document.createElement('select');
    for (const k of ['all', ...kinds]) sel.add(new Option(k, k));
    sel.addEventListener('change', () => {
      kind = sel.value;
      apply();
    });
    wrap.append(sel);
    bar.append(wrap);
    info = readout(el);
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
