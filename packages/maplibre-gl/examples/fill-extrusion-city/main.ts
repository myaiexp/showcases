// Fill-extrusion layer: a generated block grid extruded from height and base
import { Map, NavigationControl } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { palette } from '../../shared/basemap.ts';
import { CITY, blocks } from './data.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: {
      version: 8,
      sources: { blocks: { type: 'geojson', data: blocks() } },
      layers: [
        { id: 'ground', type: 'background', paint: { 'background-color': palette.ocean } },
        {
          id: 'buildings',
          type: 'fill-extrusion',
          source: 'blocks',
          paint: {
            // Height, base and colour all come from each footprint's properties.
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'base'],
            'fill-extrusion-color': [
              'interpolate', ['linear'], ['get', 'height'],
              0, '#2c3d52',
              40, palette.blue,
              90, palette.accent,
              140, '#ffe9b0',
            ],
            'fill-extrusion-opacity': 0.92,
            'fill-extrusion-vertical-gradient': true,
          },
        },
      ],
    },
    center: CITY,
    zoom: preview ? 14.4 : 14.8,
    pitch: 62,
    bearing: -25,
    maxPitch: 80,
    interactive: !preview,
  });

  let frame = 0;
  if (preview) {
    const orbit = (): void => {
      map.setBearing(map.getBearing() + 0.25);
      frame = requestAnimationFrame(orbit);
    };
    map.once('load', orbit);
  } else {
    map.addControl(new NavigationControl({ visualizePitch: true }));
    const bar = controlBar(el);
    readout(el, 'Footprints with "base" above 0 are towers standing on podiums.');
    slider(bar, 'height scale', 0.2, 3, 0.1, 1, (k) =>
      map.setPaintProperty('buildings', 'fill-extrusion-height', ['*', ['get', 'height'], k]),
    );
    // The base must scale with the height, or towers would float or sink into their podiums.
    slider(bar, 'base scale', 0.2, 3, 0.1, 1, (k) =>
      map.setPaintProperty('buildings', 'fill-extrusion-base', ['*', ['get', 'base'], k]),
    );
    slider(bar, 'opacity', 0.2, 1, 0.05, 0.92, (v) => map.setPaintProperty('buildings', 'fill-extrusion-opacity', v));
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
