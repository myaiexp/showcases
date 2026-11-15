// DomEvent.stopPropagation(e) in a marker's click handler keeps the click away from the map
import { DomEvent, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the marker, then empty map. With the toggle on, the marker click does not count as a map click.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [41, 12], zoom: 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  // Markers do not bubble by default: bubblingPointerEvents lets the click go on to the map.
  const marker = new Marker([41.9, 12.5], { bubblingPointerEvents: true }).addTo(map);

  let stopping = true;
  let onMarker = 0;
  let onMap = 0;
  const say = (): void => stage.say(`${stopping ? 'stopPropagation(e): ON' : 'stopPropagation(e): off'}   marker clicks ${onMarker}, map clicks ${onMap}`);
  marker.on('click', (e) => {
    onMarker++;
    if (stopping) DomEvent.stopPropagation(e);
    say();
  });
  map.on('click', () => (onMap++, say()));
  stage.toggle('stopPropagation in the marker handler', true, (on) => (stopping = on));
  say();

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    let n = 0;
    stage.cycle(
      [
        {
          run: () => {
            n++;
            stopping = Math.floor((n - 1) / 4) % 2 === 0;
            if (n % 2) g.click([41.9, 12.5], marker.getElement());
            else g.click([46, 4]);
          },
        },
      ],
      1500,
    );
  }
  return () => stage.dispose();
};

export default mount;
