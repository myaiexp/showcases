// A FeatureGroup receives its members' events; propagatedFrom names the member that sent them
import { Circle, FeatureGroup, LeafletMap, Marker, Polyline, type LayerEvent, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, DENVER } from '../../shared/group-demo.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click any member. The one handler on the group runs for all of them, and its popup opens on the clicked one.' });
  const log = stage.log('Group events', 8);
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, zoomControl: !stage.preview }));
  baseTiles('light').addTo(map);

  const marker = new Marker([39.74, -104.99], { title: 'marker' });
  const route = new Polyline([[39.61, -105.02], [39.7, -104.9], [39.73, -104.8]], { color: '#e11d48', weight: 6 });
  const ring = new Circle([39.77, -105.23], { radius: 6000, color: '#2563eb' });
  const names = new globalThis.Map<object, string>([[marker, 'Marker'], [route, 'Polyline'], [ring, 'Circle']]);

  const group = new FeatureGroup([marker]);
  group.bindPopup('A popup bound once, to the group.');
  group.on('click', (e: LeafletPointerEvent) => {
    const from = e.propagatedFrom;
    log(`click: target is the group ${e.target === group}, propagatedFrom ${from ? (names.get(from) ?? '?') : '?'}`);
  });
  group.on('layeradd', (e: LayerEvent) => log(`layeradd: ${names.get(e.layer) ?? '?'}`));
  group.on('layerremove', (e: LayerEvent) => log(`layerremove: ${names.get(e.layer) ?? '?'}`));
  group.addLayer(route).addLayer(ring).addTo(map);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const hits: [string, () => void][] = [
      ['Marker', () => g.click([39.74, -104.99], marker.getElement())],
      ['Polyline', () => g.click([39.7, -104.9], route.getElement())],
      ['Circle', () => g.click([39.77, -105.23], ring.getElement())],
    ];
    stage.cycle(hits.map(([, run]) => ({ run })), 2200);
  }
  return () => stage.dispose();
};

export default mount;
