// setZoomAround keeps a chosen point fixed on screen while the zoom changes
import { CircleMarker, LeafletMap, Point, type LatLngExpression, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the map to choose the point to hold still, then zoom around it or around the centre.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [41.9, 12.5], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let anchor: LatLngExpression = stage.preview ? [45.5, 8] : [44, 9];
  const ring = new CircleMarker(anchor, { radius: 8, color: '#f5b83d', fillColor: '#f5b83d', fillOpacity: 0.5 }).addTo(map);
  map.on('click', (e: LeafletPointerEvent) => {
    anchor = e.latlng;
    ring.setLatLng(anchor);
  });

  const around = (dz: number): void => {
    stage.say(`map.setZoomAround(anchor, ${map.getZoom() + dz})`);
    map.setZoomAround(anchor, map.getZoom() + dz);
  };
  const centre = (dz: number): void => {
    stage.say(`map.setZoom(${map.getZoom() + dz}): around the centre`);
    map.setZoom(map.getZoom() + dz);
  };
  const corner = (): void => {
    stage.say('map.setZoomAround(new Point(0, 0), zoom + 1): the top-left pixel stays put');
    map.setZoomAround(new Point(0, 0), map.getZoom() + 1);
  };
  stage.button('Zoom in around point', () => around(1));
  stage.button('Zoom out around point', () => around(-1));
  stage.button('setZoom +1 (centre)', () => centre(1));
  stage.button('Zoom in around top-left pixel', corner);

  if (stage.preview) {
    stage.cycle([
      { run: () => around(1) },
      { run: () => around(-1) },
      { run: () => centre(1) },
      { run: () => centre(-1) },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
