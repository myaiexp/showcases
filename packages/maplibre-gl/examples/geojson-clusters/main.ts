// A clustered GeoJSON source drawn as sized circles with counts; click to zoom
import { Map } from 'maplibre-gl';
import type { GeoJSONSource } from 'maplibre-gl';
import type { Point } from 'geojson';
import type { Mount } from '@/types.ts';
import { mapContainer, readout } from '../../shared/setup.ts';
import { palette, worldStyle } from '../../shared/basemap.ts';
import { scatter } from './data.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [20, 30],
    zoom: preview ? 0.6 : 1.4,
    interactive: !preview,
  });
  const info = preview ? null : readout(el, 'Click a cluster to zoom to where it breaks apart.');

  let frame = 0;
  let removed = false;
  map.on('load', () => {
    map.addSource('quakes', {
      type: 'geojson',
      data: scatter(),
      cluster: true,
      clusterRadius: 50,
      clusterMaxZoom: 7,
      // Aggregate a property across each cluster's points.
      clusterProperties: { magSum: ['+', ['get', 'mag']] },
    });
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'quakes',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': ['step', ['get', 'point_count'], palette.blue, 30, palette.accent, 100, palette.red],
        'circle-radius': ['step', ['get', 'point_count'], 14, 30, 19, 100, 26],
        'circle-opacity': 0.85,
      },
    });
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'quakes',
      filter: ['has', 'point_count'],
      // No glyphs URL in the style, so the text is drawn with local fonts.
      layout: { 'text-field': ['get', 'point_count_abbreviated'], 'text-size': 12 },
      paint: { 'text-color': '#0a1320' },
    });
    map.addLayer({
      id: 'single',
      type: 'circle',
      source: 'quakes',
      filter: ['!', ['has', 'point_count']],
      paint: { 'circle-color': palette.green, 'circle-radius': 3.5 },
    });

    const source = map.getSource<GeoJSONSource>('quakes') as GeoJSONSource;

    if (preview) {
      // Zoom in and out slowly so clusters merge and split.
      const t0 = performance.now();
      const loop = (now: number): void => {
        const k = (Math.sin((now - t0) / 2600) + 1) / 2;
        map.jumpTo({ zoom: 0.6 + k * 3.6, center: [10 + k * 10, 38] });
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
      return;
    }

    map.on('click', 'clusters', async (e) => {
      const feature = e.features?.[0];
      if (!feature) return;
      const clusterId = feature.properties.cluster_id as number;
      let zoom: number;
      try {
        zoom = await source.getClusterExpansionZoom(clusterId);
      } catch {
        return; // the map was removed while the worker was answering
      }
      if (removed) return;
      map.easeTo({ center: (feature.geometry as Point).coordinates as [number, number], zoom });
    });
    map.on('mouseenter', 'clusters', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      const p = e.features?.[0]?.properties;
      if (p && info) {
        info.textContent = `${p.point_count} points, magnitude sum ${p.magSum}`;
      }
    });
    map.on('mouseleave', 'clusters', () => {
      map.getCanvas().style.cursor = '';
    });
  });

  return () => {
    removed = true;
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
