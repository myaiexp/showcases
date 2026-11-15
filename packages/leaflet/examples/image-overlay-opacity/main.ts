// setOpacity fades an image overlay to show the tiles underneath
import { ImageOverlay, LatLngBounds, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const imageUrl = await images.newark1922();
  const stage = createStage(el, ctx, { hint: 'Drag the slider: opacity 1 hides the tiles, 0 hides the image.' });
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/terrain/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const bounds = new LatLngBounds([
    [40.799311, -74.118464],
    [40.68202047785919, -74.33],
  ]);
  const overlay = new ImageOverlay(imageUrl, bounds, { opacity: 1 }).addTo(map);
  map.fitBounds(bounds);

  const set = (v: number): void => {
    overlay.setOpacity(v);
    stage.say(`overlay.setOpacity(${v.toFixed(2)})`);
  };
  stage.slider('opacity', 0, 1, 0.05, 1, set);

  if (stage.preview) {
    let t = 0;
    stage.every(120, () => {
      t += 0.08;
      set(0.5 + 0.5 * Math.cos(t));
    });
  }
  return () => stage.dispose();
};

export default mount;
