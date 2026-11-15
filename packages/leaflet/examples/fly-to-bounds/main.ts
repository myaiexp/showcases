// flyToBounds and fitBounds: fit a country's bounds with a flight or a pan
import { LeafletMap, Rectangle, type LatLngBoundsExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const COUNTRIES: Record<string, LatLngBoundsExpression> = {
  Italy: [[36.6, 6.6], [47.1, 18.5]],
  Japan: [[30.2, 129.5], [45.6, 145.8]],
  Brazil: [[-33.7, -73.9], [5.3, -34.8]],
  Finland: [[59.8, 20.5], [70.1, 31.6]],
  Egypt: [[22, 25], [31.7, 36.9]],
};

type How = 'flyToBounds' | 'fitBounds';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'flyToBounds takes the same bounds and options as fitBounds, but flies there.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [20, 10], zoom: 2 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  for (const bounds of Object.values(COUNTRIES)) new Rectangle(bounds, { color: '#f5b83d', weight: 1, fill: false, dashArray: '4' }).addTo(map);

  let how: How = 'flyToBounds';
  const go = (name: string): void => {
    stage.say(`map.${how}(${name}, {padding: [20, 20]})`);
    map[how](COUNTRIES[name]!, { padding: [20, 20] });
  };
  for (const name of Object.keys(COUNTRIES)) stage.button(name, () => go(name));
  stage.select<How>(
    'Method',
    [
      { value: 'flyToBounds', label: 'flyToBounds' },
      { value: 'fitBounds', label: 'fitBounds' },
    ],
    how,
    (v) => (how = v),
  );

  if (stage.preview) {
    stage.cycle(
      ['Japan', 'Brazil', 'Egypt', 'Finland', 'Italy'].map((name) => ({ run: () => go(name), hold: 3400 })),
    );
  }
  return () => stage.dispose();
};

export default mount;
