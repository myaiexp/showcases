// Container resize: trackResize watches the box, invalidateSize tells the map by hand
import { LeafletMap, Marker, type InvalidateSizeOptions } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const CENTER: [number, number] = [48.857, 2.352];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Resize the box. With trackResize on, the map follows by itself; off, it keeps its old size until you call invalidateSize().' });
  const log = stage.log('Events');
  let map!: LeafletMap;
  let track = !stage.preview;
  let width = 100;

  // trackResize is only read when the map is created, so toggling it builds a fresh map.
  const build = (): void => {
    map?.remove();
    map = new LeafletMap(stage.box, { center: CENTER, zoom: 5, trackResize: track, zoomControl: false });
    new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
    new Marker(CENTER).addTo(map);
    map.on('resize', (e) => log(`resize ${e.oldSize.x} -> ${e.newSize.x} px wide`));
    stage.say(`trackResize: ${track}`);
  };
  build();
  stage.own({ remove: () => map.remove() });

  const resize = (pct: number): void => {
    width = pct;
    stage.box.style.flex = 'none';
    stage.box.style.width = `${pct}%`;
    stage.box.style.alignSelf = 'center';
  };
  const invalidate = (options?: InvalidateSizeOptions | boolean): void => {
    stage.say(`map.invalidateSize(${options === undefined ? '' : JSON.stringify(options)})`);
    map.invalidateSize(options);
  };

  stage.toggle('trackResize', track, (on) => {
    track = on;
    build();
  });
  stage.slider('Box width (%)', 30, 100, 5, width, resize);
  stage.button('invalidateSize()', () => invalidate());
  stage.button('invalidateSize({pan: false})', () => invalidate({ pan: false }));
  stage.button('invalidateSize(true)', () => invalidate(true));

  if (stage.preview) {
    stage.cycle([
      { say: 'The box shrinks to 55%: the map is still its old size', run: () => resize(55), hold: 1800 },
      { run: () => invalidate({ animate: true }), hold: 2600 },
      { say: 'The box grows back', run: () => resize(100), hold: 1800 },
      { run: () => invalidate(), hold: 2200 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
