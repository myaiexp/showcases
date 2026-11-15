// fitWorld picks the biggest zoom that still shows the whole world in the map's current size
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the map height, then press fitWorld(): a taller map fits the world at a bigger zoom.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48.857, 2.352], zoom: 6 }));
  new LocalTileLayer('https://tiles.example/light/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const report = (what: string): void => stage.say(`${what}: zoom ${map.getZoom()}, map ${map.getSize().x} x ${map.getSize().y} px`);
  const world = (options?: { animate?: boolean; maxZoom?: number }): void => {
    map.fitWorld(options);
    map.once('moveend', () => report(options ? `fitWorld(${JSON.stringify(options)})` : 'fitWorld()'));
  };

  stage.button('fitWorld()', () => world());
  stage.button('fitWorld({maxZoom: 1})', () => world({ maxZoom: 1 }));
  stage.button('fitWorld({animate: false})', () => world({ animate: false }));
  stage.button('Back to Paris', () => map.setView([48.857, 2.352], 6));
  stage.slider('Map height (px)', 160, 640, 20, 420, (v) => {
    stage.box.style.height = `${v}px`;
  });

  if (stage.preview) {
    stage.cycle([
      { say: 'setView(Paris, 6)', run: () => map.setView([48.857, 2.352], 6) },
      { say: 'map.fitWorld()', run: () => map.fitWorld(), hold: 3000 },
      { say: 'map.fitWorld({maxZoom: 1})', run: () => map.setView([-33.87, 151.21], 5, { animate: false }), hold: 900 },
      { run: () => map.fitWorld({ maxZoom: 1 }), hold: 3000 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
