// Symbol layer with generated icons, data-driven rotation and size, and labels
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { palette, worldStyle } from '../../shared/basemap.ts';
import { arrow, iconColors, places } from './icons.ts';

type Flag = 'icon-allow-overlap' | 'text-allow-overlap' | 'text-optional' | 'icon-ignore-placement';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(), // no `glyphs` in the style, so text is drawn with local fonts
    center: [20, 30],
    zoom: preview ? 1.4 : 2,
    interactive: !preview,
  });

  map.on('load', () => {
    for (const [id, color] of Object.entries(iconColors)) map.addImage(id, arrow(color));
    map.addSource('places', { type: 'geojson', data: places() });
    map.addLayer({
      id: 'places',
      type: 'symbol',
      source: 'places',
      layout: {
        'icon-image': ['get', 'icon'],
        'icon-rotate': ['get', 'heading'],
        'icon-size': ['get', 'scale'],
        'icon-rotation-alignment': 'map',
        'text-field': ['get', 'name'],
        'text-size': 11,
        // The label sits below the icon, anchored at its top edge.
        'text-anchor': 'top',
        'text-offset': [0, 1],
        // Collision options: all off by default, so crowded symbols drop out.
        'icon-allow-overlap': false,
        'text-allow-overlap': false,
        'text-optional': false,
        'icon-ignore-placement': false,
      },
      paint: { 'text-color': palette.text, 'text-halo-color': palette.ocean, 'text-halo-width': 1.5 },
    });
  });

  let timer = 0;
  if (preview) {
    // Spin every arrow by the same angle on a timer (layout properties re-layout, so keep it coarse).
    // Started on load: the layer does not exist before that.
    map.once('load', () => {
      timer = window.setInterval(() => {
        const spin = (performance.now() / 20) % 360;
        map.setLayoutProperty('places', 'icon-rotate', ['+', ['get', 'heading'], spin]);
      }, 120);
    });
  } else {
    const bar = controlBar(el);
    readout(el, 'Zoom out and back in to watch labels and icons win or lose their places.');
    const flags: Flag[] = ['icon-allow-overlap', 'text-allow-overlap', 'text-optional', 'icon-ignore-placement'];
    for (const flag of flags) {
      const wrap = document.createElement('label');
      wrap.style.fontSize = '13px';
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.addEventListener('change', () => {
        if (map.getLayer('places')) map.setLayoutProperty('places', flag, box.checked);
      });
      wrap.append(box, ` ${flag}`);
      bar.append(wrap);
    }
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
