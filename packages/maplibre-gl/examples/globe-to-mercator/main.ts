// Interpolates the projection from globe to mercator as the zoom grows
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { cities, worldStyle } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: {
      ...worldStyle(),
      // Vertical-perspective up to zoom 3, mercator from zoom 6, blended in between.
      projection: {
        type: ['interpolate', ['linear'], ['zoom'], 3, 'vertical-perspective', 6, 'mercator'],
      },
      // The docs advise interpolating atmosphere-blend when using the globe.
      sky: {
        'sky-color': '#0b1a33',
        'horizon-color': '#58a6ff',
        'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, 1, 4, 1, 6, 0],
      },
    },
    center: cities.london,
    zoom: 2,
    interactive: !preview,
  });

  let timer = 0;
  const off: Array<() => void> = [];

  if (preview) {
    // Zoom in and out so the card shows the whole globe-to-flat transition.
    let zoomedIn = false;
    timer = window.setInterval(() => {
      zoomedIn = !zoomedIn;
      map.easeTo({ zoom: zoomedIn ? 6.5 : 2, duration: 2400 });
    }, 3000);
  } else {
    const bar = controlBar(el);
    const info = readout(el, '');
    const show = (): void => {
      const z = map.getZoom();
      const phase = z <= 3 ? 'globe' : z >= 6 ? 'mercator' : `blending ${Math.round(((z - 3) / 3) * 100)}% towards mercator`;
      info.textContent = `zoom ${z.toFixed(2)}: ${phase}`;
    };
    for (const z of [1, 2, 3, 4.5, 6, 8]) {
      button(bar, `Zoom ${z}`, () => map.easeTo({ zoom: z, duration: 1500 }));
    }
    map.on('zoom', show);
    off.push(() => map.off('zoom', show));
    show();
  }

  return () => {
    clearInterval(timer);
    off.forEach((f) => f());
    map.remove();
  };
};

export default mount;
