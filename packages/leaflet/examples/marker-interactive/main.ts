// Marker interactive and bubblingPointerEvents: where a click on a marker goes
import { DefaultIcon, LeafletMap, Marker, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click each marker, then the empty map. The log shows who received the click.' });
  const log = stage.log('Who got the click');
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.09], zoom: 12, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const make = (name: string, color: string, lng: number, options: ConstructorParameters<typeof Marker>[1]): Marker => {
    const m = new Marker([51.5, lng], { icon: new DefaultIcon({ color }), title: name, ...options }).addTo(map);
    m.on('click', () => log(`${name}: the marker fired click`));
    return m;
  };
  // Default: the marker takes the click, and the map never sees it.
  const normal = make('interactive', 'seagreen', -0.125, {});
  // interactive: false: not a target at all, the click falls through to the map (and it has no pointer cursor).
  const passive = make('interactive: false', 'gray', -0.09, { interactive: false });
  // bubblingPointerEvents: true: the marker fires click, and then the map fires the same one.
  const bubbling = make('bubblingPointerEvents', 'crimson', -0.055, { bubblingPointerEvents: true });
  map.on('click', (e: LeafletPointerEvent) => log(`map: click at ${e.latlng.lat.toFixed(3)}, ${e.latlng.lng.toFixed(3)}`));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const click = (m: Marker, say: string) => ({
      say,
      run: () => g.click(m.getLatLng(), m.getElement()),
    });
    stage.cycle(
      [
        click(normal, 'default: the marker gets the click'),
        click(passive, 'interactive: false: the map gets it'),
        click(bubbling, 'bubblingPointerEvents: both get it'),
      ],
      1900,
    );
  }
  return () => stage.dispose();
};

export default mount;
