// GlobeControl: a button that toggles the projection between mercator and globe
import { Map, GlobeControl, NavigationControl } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, readout } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [20, 25],
    zoom: preview ? 1 : 1.8,
    interactive: !preview,
  });

  let frame = 0;
  let timer = 0;
  if (preview) {
    // Cycle the projection ourselves (the button needs a pointer).
    let globe = true;
    map.once('load', () => {
      map.setProjection({ type: 'globe' });
      timer = window.setInterval(() => {
        globe = !globe;
        map.setProjection({ type: globe ? 'globe' : 'mercator' });
      }, 3000);
      const spin = (): void => {
        map.setCenter([map.getCenter().lng + 0.2, 25]);
        frame = requestAnimationFrame(spin);
      };
      spin();
    });
  } else {
    const out = readout(el, 'Projection: mercator');
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new GlobeControl(), 'top-right');
    map.on('projectiontransition', () => {
      out.textContent = `Projection: ${map.getProjection()?.type ?? 'mercator'}`;
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
