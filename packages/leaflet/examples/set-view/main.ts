// setView with pan options: a near city glides, a far one jumps, {reset: true} never animates
import { LeafletMap, type LatLngExpression, type ZoomPanOptions } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

type Mode = 'default' | 'animate' | 'reset';

const CITIES: Record<string, LatLngExpression> = {
  London: [51.505, -0.09],
  Paris: [48.857, 2.352],
  Berlin: [52.52, 13.405],
  Rome: [41.9, 12.5],
  Tokyo: [35.68, 139.69],
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a city. Neighbours glide with a pan animation; Tokyo is off screen, so the view just resets.' });
  const log = stage.log('Events');

  const map = stage.own(new LeafletMap(stage.box, { center: CITIES['Paris']!, zoom: 5 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let mode: Mode = 'default';
  let duration = 1.5;
  let started = 0;
  map.on('movestart', () => {
    started = performance.now();
    log('movestart');
  });
  map.on('moveend', () => log(`moveend after ${Math.round(performance.now() - started)} ms`));

  // The options each mode passes as setView's third argument.
  const optionsFor = (m: Mode): ZoomPanOptions => {
    if (m === 'reset') return { reset: true };
    if (m === 'animate') return { animate: true, duration };
    return { duration };
  };
  const go = (name: string): void => {
    const options = optionsFor(mode);
    stage.say(`map.setView(${name}, 5, ${JSON.stringify(options)})`);
    map.setView(CITIES[name]!, 5, options);
  };

  for (const name of Object.keys(CITIES)) stage.button(name, () => go(name));
  stage.select<Mode>(
    'Options',
    [
      { value: 'default', label: '{duration}' },
      { value: 'animate', label: '{animate: true, duration}' },
      { value: 'reset', label: '{reset: true}' },
    ],
    mode,
    (v) => (mode = v),
  );
  stage.slider('Duration (s)', 0.25, 4, 0.25, duration, (v) => (duration = v));

  if (stage.preview) {
    duration = 1;
    const tour: [string, Mode][] = [
      ['London', 'default'],
      ['Berlin', 'default'],
      ['Tokyo', 'default'],
      ['Rome', 'reset'],
      ['Paris', 'default'],
    ];
    stage.cycle(
      tour.map(([name, m]) => ({
        run: () => {
          mode = m;
          go(name);
        },
      })),
      2400,
    );
  }
  return () => stage.dispose();
};

export default mount;
