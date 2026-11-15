// Draggable marker: drag events, autoPan near the edge, dragging.enable()
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { markerInput } from '../../shared/marker-input.ts';

const START: [number, number] = [51.5, -0.09];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the marker; push it toward the edge with autoPan on and the map follows. Focus it and use the arrow keys too.' });
  const log = stage.log('Drag events');
  const map = stage.own(new LeafletMap(stage.box, { center: START, zoom: 13, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker(START, {
    draggable: true,
    autoPan: true, // pan the map when the marker is dragged near its edge
    autoPanPadding: [50, 50], // how close to the edge that starts
    autoPanSpeed: 10, // pixels per frame
    title: 'Drag me',
  }).addTo(map);

  let drags = 0;
  marker.on('dragstart', () => ((drags = 0), log('dragstart')));
  marker.on('drag', () => drags++);
  marker.on('dragend', (e) => log(`dragend after ${drags} drag events, distance ${Math.round(e.distance)} px, now ${marker.getLatLng().toString()}`));

  stage.toggle('draggable (dragging.enable / disable)', true, (on) => (on ? marker.dragging?.enable() : marker.dragging?.disable()));
  stage.toggle('autoPan', true, (on) => (marker.options.autoPan = on));
  stage.button('Reset', () => {
    marker.setLatLng(START);
    map.setView(START, 13);
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const input = markerInput(stage, map, g);
    stage.cycle(
      [
        { say: 'draggable: true', run: () => (marker.setLatLng(START), map.setView(START, 13, { animate: false })), hold: 600 },
        { say: 'drag it, and autoPan follows the edge', run: () => input.drag(marker, [-40, 10], 600), hold: 600 },
        { run: () => input.drag(marker, [170, 0], 1600), hold: 1200 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
