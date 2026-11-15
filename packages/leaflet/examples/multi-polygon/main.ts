// A MultiPolygon: an array of polygons, each with its own outline and holes
import { LeafletMap, Polygon } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three separate shapes, one layer. The first has a hole.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const multi = new Polygon(
    [
      [
        // first polygon: outline, then a hole
        [
          [54, 0],
          [54, 8],
          [48, 8],
          [48, 0],
        ],
        [
          [52.5, 2],
          [52.5, 6],
          [49.5, 6],
          [49.5, 2],
        ],
      ],
      [
        // second polygon: outline only
        [
          [53, 11],
          [54, 19],
          [49, 18],
        ],
      ],
      [
        [
          [47, 11],
          [47, 16],
          [44, 16],
          [44, 11],
        ],
      ],
    ],
    { color: '#f472b6', fillOpacity: 0.35 },
  ).addTo(map);

  stage.say(`getLatLngs() nests ${multi.getLatLngs().length} polygons; toGeoJSON gives a ${multi.toGeoJSON().geometry.type}`);
  let lit = false;
  multi.on('pointerover', () => multi.setStyle({ weight: 5 }));
  multi.on('pointerout', () => multi.setStyle({ weight: 3 }));
  if (stage.preview) {
    stage.every(1500, () => {
      lit = !lit;
      multi.setStyle({ weight: lit ? 6 : 3, fillOpacity: lit ? 0.55 : 0.35 });
    });
  }
  return () => stage.dispose();
};

export default mount;
