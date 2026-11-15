// doubleClickZoom: true zooms at the pointer, 'center' zooms the centre, false is off
import { CircleMarker, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

type Mode = 'true' | 'center' | 'false';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Double click away from the centre: the point under the pointer stays put, or the centre does. Shift + double click zooms out.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 10], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const spot: [number, number] = [52.5, 13.4];
  new CircleMarker(spot, { radius: 6, color: '#f5b83d', fillOpacity: 0.7 }).addTo(map);

  // The handler reads the option on every double click, so the option can change at any time.
  const setMode = (mode: Mode): void => {
    map.options.doubleClickZoom = mode === 'center' ? 'center' : mode === 'true';
    if (mode === 'false') map.doubleClickZoom.disable();
    else map.doubleClickZoom.enable();
    stage.say(`doubleClickZoom: ${mode === 'center' ? "'center'" : mode}`);
  };
  stage.select<Mode>(
    'doubleClickZoom',
    [
      { value: 'true', label: 'true: around the pointer' },
      { value: 'center', label: "'center': around the centre" },
      { value: 'false', label: 'false: off' },
    ],
    'true',
    setMode,
  );
  stage.button('Reset view', () => map.setView([48, 10], 4));
  map.on('dblclick', (e) => stage.say(`dblclick at ${e.latlng.toString()}, shift: ${e.originalEvent.shiftKey}`));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const gesture = gestures(stage, map, g);
    const reset = (): void => {
      map.setView([48, 10], 4, { animate: false });
    };
    stage.cycle(
      [
        { run: () => (reset(), setMode('true')), hold: 300 },
        { run: () => gesture.dblclick(spot), hold: 2000 },
        { run: () => (reset(), setMode('center')), hold: 300 },
        { run: () => gesture.dblclick(spot), hold: 2000 },
        { run: () => (reset(), setMode('false')), hold: 300 },
        { run: () => gesture.dblclick(spot), hold: 1600 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
