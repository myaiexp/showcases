// Style-level transition versus a per-property fill-color-transition
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { slider } from '../../shared/controls.ts';
import { countries, palette } from '../../shared/basemap.ts';

const STYLE_DURATION = 1800;
const SETS = [
  { a: palette.land, b: palette.land },
  { a: palette.blue, b: palette.accent },
];

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: {
      version: 8,
      // The default for every transitionable property that has no *-transition of its own.
      transition: { duration: STYLE_DURATION, delay: 0 },
      sources: { countries: { type: 'geojson', data: countries } },
      layers: [
        { id: 'ocean', type: 'background', paint: { 'background-color': palette.ocean } },
        {
          // Group A follows the style's transition.
          id: 'group-a',
          type: 'fill',
          source: 'countries',
          filter: ['==', ['%', ['id'], 2], 0],
          paint: { 'fill-color': SETS[0]!.a, 'fill-outline-color': palette.border },
        },
        {
          // Group B has its own, much faster, transition.
          id: 'group-b',
          type: 'fill',
          source: 'countries',
          filter: ['==', ['%', ['id'], 2], 1],
          paint: {
            'fill-color': SETS[0]!.b,
            'fill-color-transition': { duration: 150, delay: 0 },
            'fill-outline-color': palette.border,
          },
        },
      ],
    },
    center: [15, 30],
    zoom: preview ? 0.8 : 1.4,
    interactive: !preview,
  });

  let on = false;
  const flip = (): void => {
    if (!map.getLayer('group-a')) return;
    on = !on;
    const set = SETS[on ? 1 : 0]!;
    map.setPaintProperty('group-a', 'fill-color', set.a);
    map.setPaintProperty('group-b', 'fill-color', set.b);
  };

  let timer = 0;
  if (preview) {
    map.once('load', () => {
      timer = window.setInterval(flip, 2600);
    });
  } else {
    const bar = controlBar(el);
    const info = readout(el, '');
    let duration = 150;
    let delay = 0;
    const show = (): void => {
      info.textContent = `group A: style transition ${STYLE_DURATION} ms | group B: fill-color-transition ${duration} ms, delay ${delay} ms`;
    };
    button(bar, 'Flip colours', flip);
    const apply = (): void => {
      if (map.getLayer('group-b')) map.setPaintProperty('group-b', 'fill-color-transition', { duration, delay });
      show();
    };
    slider(bar, 'B duration', 0, 3000, 50, duration, (v) => {
      duration = v;
      apply();
    });
    slider(bar, 'B delay', 0, 2000, 50, delay, (v) => {
      delay = v;
      apply();
    });
    show();
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
