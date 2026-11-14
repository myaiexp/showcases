// Interleaved arcs sharing the depth buffer with MapLibre extrusions
import { MapLibreOverlay } from '@deck.gl/maplibre';
import { ArcLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { createMap, mapBox, releaseMap, whenLoaded } from '../../shared/base-maps.ts';
import { CITIES, city } from '../../shared/data.ts';
import { animate } from '../../shared/stage.ts';

const EUROPE = ['London', 'Paris', 'Moscow', 'Istanbul', 'Cairo', 'Lagos'].map(city);

/** A square of `half` degrees around each city, with the metro population as its height. */
const BLOCKS = {
  type: 'FeatureCollection' as const,
  features: CITIES.map((c) => {
    const [x, y] = c.coordinates;
    const h = 1.3;
    return {
      type: 'Feature' as const,
      properties: { height: c.population * 45_000 },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[[x - h, y - h], [x + h, y - h], [x + h, y + h], [x - h, y + h], [x - h, y - h]]],
      },
    };
  }),
};

const mount: Mount = (el, { preview }) => {
  const box = mapBox(el, preview);
  const view = { center: [15, 42] as [number, number], zoom: preview ? 1.5 : 3.2, pitch: 60, bearing: 0 };
  const map = createMap(box, view, preview);
  let overlay: MapLibreOverlay | null = null;

  whenLoaded(map, () => {
    // MapLibre's own 3D layer, added to the style: blocks as tall as each city's population.
    map.addSource('blocks', { type: 'geojson', data: BLOCKS });
    map.addLayer({
      id: 'blocks',
      type: 'fill-extrusion',
      source: 'blocks',
      paint: { 'fill-extrusion-color': '#5a7090', 'fill-extrusion-height': ['get', 'height'], 'fill-extrusion-opacity': 0.95 },
    });
    overlay = new MapLibreOverlay({
      interleaved: true,
      layers: [
        new ArcLayer({
          id: 'depth-arcs',
          data: EUROPE.flatMap((a, i) => EUROPE.slice(i + 1).map((b) => ({ from: a.coordinates, to: b.coordinates }))),
          getSourcePosition: (d) => d.from,
          getTargetPosition: (d) => d.to,
          getSourceColor: [255, 170, 80],
          getTargetColor: [90, 220, 255],
          getWidth: 3,
          getHeight: 0.15,
          // MapLibre's context has no MSAA: have the layer smooth its own edges.
          antialiasing: true,
        }),
      ],
    });
    map.addControl(overlay);
  });

  let stop = (): void => {};
  if (preview) {
    stop = animate((t) => map.jumpTo({ bearing: t * 14, center: [15 + Math.sin(t / 5) * 10, 42] }));
  } else {
    check(controlBar(el), 'map blocks', true, (v) => {
      map.setLayoutProperty('blocks', 'visibility', v ? 'visible' : 'none');
    });
  }

  return () => {
    stop();
    releaseMap(map, box, overlay);
  };
};

export default mount;
