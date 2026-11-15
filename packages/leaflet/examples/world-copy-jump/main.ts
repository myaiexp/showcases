// worldCopyJump: when you pan to another copy of the world, jump back so markers stay in view
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const CITIES: [string, [number, number]][] = [
  ['Tokyo', [35.68, 139.69]],
  ['Honolulu', [21.31, -157.86]],
  ['Sydney', [-33.87, 151.21]],
  ['Los Angeles', [34.05, -118.24]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the map sideways past the date line. With worldCopyJump on, the markers are always on screen.' });
  const log = stage.log('worldcopyjump');
  const map = stage.own(new LeafletMap(stage.box, { center: [20, 170], zoom: 2, worldCopyJump: true, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/terrain/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  for (const [name, at] of CITIES) new Marker(at).addTo(map).bindTooltip(name, { permanent: true, direction: 'right' });

  map.on('worldcopyjump', (e) => log(`jumped ${e.worlds} world width${Math.abs(e.worlds) === 1 ? '' : 's'}`));
  // The option is read on every pan, so it can be switched at run time.
  stage.toggle('worldCopyJump', true, (on) => {
    map.options.worldCopyJump = on;
    stage.say(`worldCopyJump = ${on}`);
  });
  stage.button('Pan east 600 px', () => map.panBy([600, 0]));
  stage.button('Pan west 600 px', () => map.panBy([-600, 0]));

  if (stage.preview) {
    stage.cycle(
      [
        { say: 'worldCopyJump: true, pan east across the date line', run: () => map.panBy([260, 0]), hold: 2200 },
        { run: () => map.panBy([260, 0]), hold: 2200 },
        { say: 'worldCopyJump: false, the same pan', run: () => ((map.options.worldCopyJump = false), map.panBy([260, 0])), hold: 2200 },
        { run: () => ((map.options.worldCopyJump = true), map.setView([20, 170], 2)), hold: 1500 },
      ],
      500,
    );
  }
  return () => stage.dispose();
};

export default mount;
