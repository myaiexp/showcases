// Marker opacity option and setOpacity, fading icon and shadow together
import { Icon, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const [leaf, shadow] = await Promise.all([images.leafOrange(), images.leafShadow()]);
  const stage = createStage(el, ctx, { hint: 'The slider calls setOpacity on every marker; the fixed ones were created with the opacity option.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.1025], zoom: 12, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const icon = new Icon({ iconUrl: leaf, shadowUrl: shadow, iconSize: [38, 95], shadowSize: [50, 64], iconAnchor: [22, 94], shadowAnchor: [4, 62] });
  // Opacity set when the marker is created.
  new Marker([51.5, -0.14], { opacity: 1 }).addTo(map);
  new Marker([51.5, -0.115], { opacity: 0.6 }).addTo(map);
  new Marker([51.5, -0.09], { opacity: 0.25 }).addTo(map);
  // Opacity changed afterwards: the icon and its shadow fade together.
  const fading = new Marker([51.5, -0.065], { icon }).addTo(map);

  const set = (v: number): void => {
    fading.setOpacity(v);
    stage.say(`setOpacity(${v.toFixed(2)})`);
  };
  stage.slider('setOpacity', 0, 1, 0.05, 1, set);

  if (stage.preview) {
    let t = 0;
    stage.every(120, () => set(0.5 + 0.5 * Math.cos((t += 0.12))));
  }
  return () => stage.dispose();
};

export default mount;
