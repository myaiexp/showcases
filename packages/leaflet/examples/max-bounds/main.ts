// setMaxBounds and maxBoundsViscosity: how solid the map's edge is when dragging
import { LeafletMap, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

const BOUNDS: [[number, number], [number, number]] = [[35, -10], [60, 30]];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag past the dashed edge. Viscosity 0 lets you out and snaps back on release; 1 stops the map at the edge.' });
  const log = stage.log('Events');
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 10], zoom: 4, maxBoundsViscosity: 0.5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/night/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new Rectangle(BOUNDS, { color: '#f5b83d', weight: 2, fill: false, dashArray: '6' }).addTo(map);
  map.setMaxBounds(BOUNDS);

  map.on('dragend', () => log(`dragend, centre ${map.getCenter().lat.toFixed(1)}, ${map.getCenter().lng.toFixed(1)}`));
  map.on('moveend', () => log('moveend'));

  // The option is read when a drag starts, so changing it takes effect on the next drag.
  stage.select(
    'maxBoundsViscosity',
    [
      { value: '0', label: '0: free, then snaps back' },
      { value: '0.5', label: '0.5: half speed outside' },
      { value: '1', label: '1: solid' },
    ],
    '0.5',
    (v) => {
      map.options.maxBoundsViscosity = Number(v);
      stage.say(`maxBoundsViscosity = ${v}`);
    },
  );
  stage.button('setMaxBounds()', () => {
    map.setMaxBounds();
    stage.say('setMaxBounds() with no argument removes the restriction');
  });
  stage.button('setMaxBounds(bounds)', () => {
    map.setMaxBounds(BOUNDS);
    stage.say('setMaxBounds(bounds) restricts the view again, and pans back inside if needed');
  });
  stage.button('setView(Moscow, 4)', () => {
    map.setView([55.75, 37.6], 4);
    stage.say('setView outside the bounds is clamped to the nearest allowed centre');
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const gesture = gestures(stage, map, g);
    map.options.maxBoundsViscosity = 0;
    stage.cycle(
      [
        { say: 'Drag east past the edge (viscosity 0) ...', run: () => gesture.drag([48, 10], [-260, 0], 800), hold: 200 },
        { say: '... and the map snaps back on release', run: () => undefined, hold: 1800 },
        { say: 'setView(Moscow, 4) is clamped to the bounds', run: () => map.setView([55.75, 37.6], 4), hold: 2200 },
        { say: 'setView(Paris, 4)', run: () => map.setView([48.9, 2.3], 4), hold: 1600 },
      ],
      500,
    );
  }
  return () => stage.dispose();
};

export default mount;
