// SimpleCRS maps one unit to 2^zoom pixels: scale() and zoom(), and how many units the view spans
import { ImageOverlay, LeafletMap, SimpleCRS } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { images } from '../../shared/data.ts';
import { UQM_BOUNDS } from '../../shared/uqm.ts';

const mount: Mount = async (el, ctx) => {
  const url = await images.uqmMap();
  const stage = createStage(el, ctx, { hint: 'At zoom 0 one map unit is one screen pixel, so the 1000-unit map is 1000 px wide: too big for most boxes. Each zoom level halves or doubles it. Think in map units, not image pixels (the image is 2315 px for about 1050 units).', height: 420 });
  const map = stage.own(new LeafletMap(stage.box, { crs: SimpleCRS, minZoom: -5, maxZoom: 3, zoomSnap: 0.25, zoomControl: !stage.preview }));
  new ImageOverlay(url, UQM_BOUNDS).addTo(map);
  map.setView([500, 500], -1);

  const report = (): void => {
    const z = map.getZoom();
    const b = map.getBounds();
    const scale = SimpleCRS.scale(z);
    stage.say(`zoom ${z}: SimpleCRS.scale(${z}) = ${scale.toFixed(3)} px per unit, SimpleCRS.zoom(${scale.toFixed(3)}) = ${SimpleCRS.zoom(scale)}; the view spans ${(b.getEast() - b.getWest()).toFixed(0)} units wide`);
  };
  map.on('zoomend', report);
  report();
  stage.slider('zoom', -5, 3, 0.25, -1, (v) => map.setZoom(v));

  if (stage.preview) {
    const zooms = [-3, -2, -1, 0, 1];
    let i = 0;
    stage.every(2000, () => map.setZoom(zooms[i++ % zooms.length] as number));
  }
  return () => stage.dispose();
};

export default mount;
