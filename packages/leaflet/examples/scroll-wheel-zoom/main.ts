// scrollWheelZoom: around the pointer or 'center', wheelPxPerZoomLevel and wheelDebounceTime
import { CircleMarker, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

type Mode = 'pointer' | 'center';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll over the map with the pointer away from the centre. Smaller wheelPxPerZoomLevel means faster zoom.' });
  const log = stage.log('Zoom events');
  const map = stage.own(
    new LeafletMap(stage.box, { center: [48, 10], zoom: 4, scrollWheelZoom: true, wheelPxPerZoomLevel: 60, wheelDebounceTime: 40, zoomControl: !stage.preview }),
  );
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const spot: [number, number] = [52.5, 13.4];
  new CircleMarker(spot, { radius: 6, color: '#f5b83d', fillOpacity: 0.7 }).addTo(map);
  map.on('zoomend', () => log(`zoomend: ${map.getZoom()}`));

  // The handler reads all three options on every wheel turn.
  stage.select<Mode>(
    'scrollWheelZoom',
    [
      { value: 'pointer', label: 'true: around the pointer' },
      { value: 'center', label: "'center'" },
    ],
    'pointer',
    (v) => {
      map.options.scrollWheelZoom = v === 'center' ? 'center' : true;
      stage.say(`scrollWheelZoom: ${v === 'center' ? "'center'" : 'true'}`);
    },
  );
  stage.slider('wheelPxPerZoomLevel', 20, 240, 10, 60, (v) => (map.options.wheelPxPerZoomLevel = v));
  stage.slider('wheelDebounceTime (ms)', 0, 400, 20, 40, (v) => (map.options.wheelDebounceTime = v));
  stage.toggle('scrollWheelZoom on', true, (on) => {
    if (on) map.scrollWheelZoom.enable();
    else map.scrollWheelZoom.disable();
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const gesture = gestures(stage, map, g);
    const reset = (): void => {
      map.setView([48, 10], 4, { animate: false });
    };
    stage.cycle(
      [
        { say: "scrollWheelZoom: true, wheel up at the marker", run: () => (reset(), gesture.wheel(spot, -120)), hold: 2200 },
        { say: 'wheel down', run: () => gesture.wheel(spot, 120), hold: 2000 },
        {
          say: "scrollWheelZoom: 'center', wheel up at the marker",
          run: () => {
            reset();
            map.options.scrollWheelZoom = 'center';
            gesture.wheel(spot, -120);
          },
          hold: 2200,
        },
        { say: 'wheelPxPerZoomLevel: 20, a faster wheel', run: () => ((map.options.scrollWheelZoom = true), (map.options.wheelPxPerZoomLevel = 20), reset(), gesture.wheel(spot, -120)), hold: 2200 },
        { run: () => (map.options.wheelPxPerZoomLevel = 60), hold: 200 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
