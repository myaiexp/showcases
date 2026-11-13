// A Map from an inline style document, with a slow camera drift in previews
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    // A style can be a URL or, as here, a style object built in code.
    style: worldStyle(),
    center: [15, 30],
    zoom: preview ? 0.4 : 1.2,
    interactive: !preview,
  });

  let frame = 0;
  if (preview) {
    const drift = (): void => {
      map.setCenter([map.getCenter().lng + 0.15, 30]);
      frame = requestAnimationFrame(drift);
    };
    map.once('load', drift);
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
