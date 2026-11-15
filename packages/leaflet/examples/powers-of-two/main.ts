// Each zoom level doubles the world's width and height: 2^z tiles per side, 256 * 2^z pixels
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Step the zoom with setZoom. The grid tiles show how each tile splits into four.' });

  const map = stage.own(new LeafletMap(stage.box, { minZoom: 0, maxZoom: 5 }).setView([0, 0], 0));
  new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const describe = (): void => {
    const z = map.getZoom();
    const px = map.getPixelWorldBounds(z)?.getSize().x;
    stage.say(`Zoom ${z}: ${2 ** z} x ${2 ** z} tiles, the world is ${px} px wide (256 * 2^${z})`);
  };
  map.on('zoomend', describe);
  describe();

  stage.slider('setZoom', 0, 5, 1, 0, (v) => map.setZoom(v));
  if (stage.preview) {
    let z = 0;
    let dir = 1;
    stage.every(2200, () => {
      if (z + dir > 4 || z + dir < 0) dir = -dir;
      z += dir;
      map.setZoom(z);
    });
  }
  return () => stage.dispose();
};

export default mount;
