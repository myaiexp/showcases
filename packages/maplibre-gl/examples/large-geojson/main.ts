// Tens of thousands of points with the GeoJSON options the large-data guide gives
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { palette, worldStyle } from '../../shared/basemap.ts';
import { generatePoints } from './points.ts';

interface Options {
  count: number;
  cluster: boolean;
  maxzoom: number;
  tolerance: number;
}

const mount: Mount = (el, { preview }) => {
  const opts: Options = { count: preview ? 4000 : 50000, cluster: true, maxzoom: 12, tolerance: 0.375 };
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [20, 30],
    zoom: preview ? 1.2 : 1.8,
    interactive: !preview,
  });
  const info = preview ? null : readout(el, '');

  let started = 0;
  let loadMs = 0;
  const show = (): void => {
    if (!info) return;
    const { count, cluster, maxzoom, tolerance } = opts;
    info.textContent = `${count.toLocaleString()} points | cluster ${cluster ? 'on' : 'off'} | maxzoom ${maxzoom} | tolerance ${tolerance} | first tiles ${loadMs.toFixed(0)} ms`;
  };

  // The source options are fixed once added, so a change removes and re-adds source and layers.
  const rebuild = (): void => {
    for (const id of ['clusters', 'points']) if (map.getLayer(id)) map.removeLayer(id);
    if (map.getSource('pts')) map.removeSource('pts');
    const generated = performance.now();
    const data = generatePoints(opts.count);
    started = performance.now();
    map.addSource('pts', {
      type: 'geojson',
      data,
      maxzoom: opts.maxzoom,
      tolerance: opts.tolerance,
      buffer: 64,
      cluster: opts.cluster,
      clusterRadius: 50,
      clusterMaxZoom: opts.maxzoom - 1,
    });
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'pts',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': ['step', ['get', 'point_count'], palette.blue, 100, palette.purple, 1000, palette.red],
        'circle-radius': ['step', ['get', 'point_count'], 8, 100, 12, 1000, 17],
        'circle-opacity': 0.85,
      },
    });
    map.addLayer({
      id: 'points',
      type: 'circle',
      source: 'pts',
      filter: ['!', ['has', 'point_count']],
      minzoom: 1,
      paint: { 'circle-color': palette.accent, 'circle-radius': 1.8, 'circle-opacity': 0.7 },
    });
    loadMs = started - generated;
    show();
  };

  const onSourceData = (e: { sourceId?: string; isSourceLoaded?: boolean }): void => {
    if (e.sourceId !== 'pts' || !e.isSourceLoaded || !started) return;
    loadMs = performance.now() - started;
    started = 0;
    show();
  };
  map.on('sourcedata', onSourceData);
  map.on('load', rebuild);

  let frame = 0;
  if (preview) {
    map.once('load', () => {
      const drift = (): void => {
        const c = map.getCenter();
        map.setCenter([c.lng + 0.06, c.lat]);
        frame = requestAnimationFrame(drift);
      };
      frame = requestAnimationFrame(drift);
    });
  } else {
    const bar = controlBar(el);
    for (const n of [10000, 50000, 100000]) {
      button(bar, `${n / 1000}k points`, () => {
        opts.count = n;
        rebuild();
      });
    }
    const clusterBtn = button(bar, 'Cluster: on', () => {
      opts.cluster = !opts.cluster;
      clusterBtn.textContent = `Cluster: ${opts.cluster ? 'on' : 'off'}`;
      rebuild();
    });
    const zoomBtn = button(bar, 'maxzoom: 12', () => {
      opts.maxzoom = opts.maxzoom === 12 ? 8 : opts.maxzoom === 8 ? 16 : 12;
      zoomBtn.textContent = `maxzoom: ${opts.maxzoom}`;
      rebuild();
    });
    const tolBtn = button(bar, 'tolerance: 0.375', () => {
      opts.tolerance = opts.tolerance === 0.375 ? 4 : 0.375;
      tolBtn.textContent = `tolerance: ${opts.tolerance}`;
      rebuild();
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    map.off('sourcedata', onSourceData);
    map.remove();
  };
};

export default mount;
