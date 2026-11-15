// Pointer position in a SimpleCRS map: map units as [y, x], and the matching pixel of the image
import { ImageOverlay, LeafletMap, SimpleCRS } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { images } from '../../shared/data.ts';
import { UQM_BOUNDS, UQM_PIXELS } from '../../shared/uqm.ts';

const mount: Mount = async (el, ctx) => {
  const url = await images.uqmMap();
  const stage = createStage(el, ctx, { hint: 'Move over the map. latlng.lat is the y coordinate and latlng.lng the x coordinate, in map units. Dividing by the bounds\' size and multiplying by 2315 gives the pixel of the image.', height: 420 });
  const map = stage.own(new LeafletMap(stage.box, { crs: SimpleCRS, minZoom: -5, maxZoom: 2, zoomSnap: 0.25, zoomControl: !stage.preview }));
  new ImageOverlay(url, UQM_BOUNDS).addTo(map);
  map.fitBounds(UQM_BOUNDS, { animate: false });

  const [[south, west], [north, east]] = UQM_BOUNDS as [[number, number], [number, number]];
  const show = (lat: number, lng: number): void => {
    const px = ((lng - west) / (east - west)) * UQM_PIXELS;
    const py = ((north - lat) / (north - south)) * UQM_PIXELS;
    stage.say(`[y, x] = [${lat.toFixed(1)}, ${lng.toFixed(1)}] map units: image pixel (${px.toFixed(0)}, ${py.toFixed(0)}) of ${UQM_PIXELS}`);
  };
  map.on('pointermove', (e) => show(e.latlng.lat, e.latlng.lng));
  show(500, 500);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const path: [number, number][] = [[145, 175], [130, 42], [56, 13], [8, 219], [500, 500]];
    let i = 0;
    stage.every(1500, () => g.move(path[i++ % path.length] as [number, number]));
  }
  return () => stage.dispose();
};

export default mount;
