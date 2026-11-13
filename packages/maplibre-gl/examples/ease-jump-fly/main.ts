// The same destination reached with jumpTo, easeTo and flyTo, from the same start
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { cities, worldStyle } from '../../shared/basemap.ts';

const HOME = { center: cities.london, zoom: 3, bearing: 0, pitch: 0 };
const TARGET = { center: cities.tokyo, zoom: 5, bearing: 30, pitch: 40 };

type Move = 'jumpTo' | 'easeTo' | 'flyTo';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    ...HOME,
    interactive: !preview,
  });

  const go = (how: Move): void => {
    // Reset instantly, then reach the same target with the chosen method.
    map.jumpTo(HOME);
    if (how === 'jumpTo') map.jumpTo(TARGET);
    else if (how === 'easeTo') map.easeTo({ ...TARGET, duration: 2500 });
    else map.flyTo({ ...TARGET, duration: 2500 });
  };

  let timer = 0;
  if (preview) {
    const order: Move[] = ['easeTo', 'flyTo', 'jumpTo'];
    let i = 0;
    map.once('load', () => {
      go('easeTo');
      timer = window.setInterval(() => go(order[++i % order.length] ?? 'easeTo'), 3600);
    });
  } else {
    const bar = controlBar(el);
    const info = readout(el, 'Each button resets to London, then moves to Tokyo (zoom 5, bearing 30, pitch 40).');
    for (const how of ['jumpTo', 'easeTo', 'flyTo'] as Move[]) {
      button(bar, how, () => {
        go(how);
        info.textContent =
          how === 'jumpTo'
            ? 'jumpTo: instant, no animation'
            : how === 'easeTo'
              ? 'easeTo: a straight eased transition'
              : 'flyTo: zooms out and back in along an arc';
      });
    }
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
