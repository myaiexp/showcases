// Marker toGeoJSON: a Point Feature rounded to a chosen precision
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the marker; the Feature below is marker.toGeoJSON(precision). GeoJSON puts longitude first.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.08], zoom: 13, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker([51.50123456, -0.09123456], { draggable: true, title: 'Drag me' }).addTo(map);

  // Where the output goes: the side panel in the full view, a small overlay on a card.
  const out = stage.side('marker.toGeoJSON()') ?? document.createElement('pre');
  if (stage.preview) {
    out.className = 'geojson-overlay';
    stage.root.append(out);
  }

  let precision: number | false = 6;
  const show = (): void => {
    out.textContent = `toGeoJSON(${String(precision)})\n${JSON.stringify(marker.toGeoJSON(precision), null, 1)}`;
  };
  marker.on('move', show);
  show();

  stage.select(
    'precision',
    [
      { value: '6', label: '6 (default)' },
      { value: '3', label: '3' },
      { value: '0', label: '0' },
      { value: 'false', label: 'false (no rounding)' },
    ],
    '6',
    (v) => {
      precision = v === 'false' ? false : Number(v);
      show();
    },
  );

  if (stage.preview) {
    const stops: [number, number][] = [[51.50123456, -0.09123456], [51.50777777, -0.08333333], [51.49456789, -0.10987654]];
    let i = 0;
    stage.cycle(
      [
        { run: () => ((precision = [6, 3, false][i % 3] as number | false), marker.setLatLng(stops[i++ % 3]!)) },
      ],
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
