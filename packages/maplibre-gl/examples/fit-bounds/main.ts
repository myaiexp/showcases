// fitBounds to LngLatBounds built from city coordinates, with padding and maxZoom
import { GeoJSONSource, LngLatBounds, Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { cities, palette, worldStyle, type CityName } from '../../shared/basemap.ts';

const groups = {
  Europe: ['helsinki', 'london', 'reykjavik'],
  Asia: ['tokyo', 'mumbai', 'singapore'],
  Americas: ['newYork', 'mexicoCity', 'saoPaulo'],
  'Southern hemisphere': ['sydney', 'capeTown', 'saoPaulo'],
  'Just Cairo': ['cairo'],
} satisfies Record<string, CityName[]>;
type GroupName = keyof typeof groups;
const groupNames = Object.keys(groups) as GroupName[];

/** Grows an empty LngLatBounds to contain each city. */
function boundsOf(group: readonly CityName[]): LngLatBounds {
  const bounds = new LngLatBounds();
  for (const name of group) bounds.extend(cities[name]);
  return bounds;
}

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 30],
    zoom: 1.2,
    interactive: !preview,
  });

  // A dashed rectangle showing the bounds being fitted.
  const showBounds = (b: LngLatBounds): void => {
    const src = map.getSource('fit-box');
    const w = b.getWest(), e = b.getEast(), s = b.getSouth(), n = b.getNorth();
    if (src instanceof GeoJSONSource) {
      // setData returns a promise; ignore a rejection that arrives after map.remove().
      void src.setData({
        type: 'Feature',
        properties: {},
        geometry: { type: 'LineString', coordinates: [[w, s], [e, s], [e, n], [w, n], [w, s]] },
      }).catch(() => {});
    }
  };

  let padding = 40;
  let maxZoom = 6;
  const fit = (name: GroupName): void => {
    const bounds = boundsOf(groups[name]);
    showBounds(bounds);
    map.fitBounds(bounds, { padding, maxZoom, duration: 1600 });
  };

  map.on('load', () => {
    map.addSource('fit-box', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    map.addLayer({
      id: 'fit-box',
      type: 'line',
      source: 'fit-box',
      paint: { 'line-color': palette.accent, 'line-width': 2, 'line-dasharray': [2, 2] },
    });
  });

  let timer = 0;
  if (preview) {
    let i = 0;
    map.once('load', () => {
      fit('Europe');
      timer = window.setInterval(() => fit(groupNames[++i % groupNames.length] ?? 'Europe'), 2600);
    });
  } else {
    const bar = controlBar(el);
    for (const name of groupNames) button(bar, name, () => fit(name));
    const opts = controlBar(el);
    const choose = (label: string, values: number[], set: (v: number) => void, init: number): void => {
      const wrap = document.createElement('label');
      wrap.append(`${label} `);
      const sel = document.createElement('select');
      for (const v of values) sel.add(new Option(String(v), String(v), false, v === init));
      sel.addEventListener('change', () => set(Number(sel.value)));
      wrap.append(sel);
      opts.append(wrap);
    };
    choose('padding', [0, 40, 100, 160], (v) => (padding = v), padding);
    choose('maxZoom', [2, 4, 6, 10], (v) => (maxZoom = v), maxZoom);
    readout(el, 'Padding keeps the bounds off the edges; maxZoom stops a tiny box zooming in too far (try Just Cairo).');
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
