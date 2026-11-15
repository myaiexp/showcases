// stop() ends a running flyTo or panTo where it is
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Start the flight, then press stop() before it lands.' });
  const log = stage.log('Events');
  const map = stage.own(new LeafletMap(stage.box, { center: [51.505, -0.09], zoom: 6 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new Marker([35.68, 139.69]).addTo(map).bindTooltip('Tokyo', { permanent: true });

  map.on('movestart', () => log('movestart'));
  map.on('moveend', () => log(`moveend at zoom ${map.getZoom()}`));
  const start = (): void => {
    stage.say('map.flyTo(Tokyo, 8, {duration: 5})');
    map.flyTo([35.68, 139.69], 8, { duration: 5 });
  };
  const stop = (): void => {
    stage.say('map.stop(): the map stays where it is and settles on a whole zoom level');
    map.stop();
  };
  stage.button('flyTo(Tokyo)', start);
  stage.button('stop()', stop);
  stage.button('Back to London', () => map.setView([51.505, -0.09], 6, { animate: false }));

  if (stage.preview) {
    stage.cycle([
      { run: () => map.setView([51.505, -0.09], 6, { animate: false }), hold: 600 },
      { run: start, hold: 1600 },
      { run: stop, hold: 2200 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
