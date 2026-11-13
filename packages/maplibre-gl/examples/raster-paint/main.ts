// Raster paint properties on a canvas-made image source, with sliders
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';
import { pictureDataUrl } from './picture.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 15],
    zoom: preview ? 1.4 : 2,
    interactive: !preview,
  });

  map.on('load', () => {
    // An image source stretches one picture across four [lng, lat] corners (clockwise from top left).
    map.addSource('picture', {
      type: 'image',
      url: pictureDataUrl(),
      coordinates: [[-50, 60], [70, 60], [70, -30], [-50, -30]],
    });
    map.addLayer({
      id: 'picture',
      type: 'raster',
      source: 'picture',
      paint: {
        'raster-opacity': 1,
        'raster-hue-rotate': 0,
        'raster-saturation': 0,
        'raster-contrast': 0,
        'raster-brightness-min': 0,
        'raster-brightness-max': 1,
        'raster-fade-duration': 0,
      },
    });
  });

  let frame = 0;
  if (preview) {
    const cycle = (): void => {
      map.setPaintProperty('picture', 'raster-hue-rotate', (performance.now() / 15) % 360);
      frame = requestAnimationFrame(cycle);
    };
    map.once('load', cycle);
  } else {
    const bar = controlBar(el);
    readout(el, 'The picture is drawn on a canvas and passed to an image source as a data URL.');
    const set = (prop: 'raster-hue-rotate' | 'raster-saturation' | 'raster-contrast' | 'raster-brightness-min' | 'raster-brightness-max' | 'raster-opacity') => (v: number) => {
      if (map.getLayer('picture')) map.setPaintProperty('picture', prop, v);
    };
    slider(bar, 'hue-rotate', 0, 360, 5, 0, set('raster-hue-rotate'));
    slider(bar, 'saturation', -1, 1, 0.05, 0, set('raster-saturation'));
    slider(bar, 'contrast', -1, 1, 0.05, 0, set('raster-contrast'));
    slider(bar, 'brightness-min', 0, 1, 0.05, 0, set('raster-brightness-min'));
    slider(bar, 'brightness-max', 0, 1, 0.05, 1, set('raster-brightness-max'));
    slider(bar, 'opacity', 0, 1, 0.05, 1, set('raster-opacity'));
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
