// Marker rotation and setRotation, turning an icon around its anchor
import { DefaultIcon, Icon, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const [leaf, shadow] = await Promise.all([images.leafGreen(), images.leafShadow()]);
  const stage = createStage(el, ctx, {
    hint: 'rotation is in degrees, clockwise, around the icon anchor. Any rotation, even 0, hides the shadow; null removes the rotation and brings it back.',
  });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.09], zoom: 12, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // The default pin, rotated 30° from the start through the option.
  const pin = new Marker([51.5, -0.12], { icon: new DefaultIcon(), rotation: 30 }).addTo(map);
  // A leaf with a shadow image: the shadow is hidden while it has a rotation.
  const leafIcon = new Icon({
    iconUrl: leaf,
    shadowUrl: shadow,
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
  });
  const leafMarker = new Marker([51.5, -0.06], { icon: leafIcon }).addTo(map);
  // An unrotated twin of the pin, to compare against.
  new Marker([51.5, -0.09]).addTo(map);

  const set = (deg: number | null): void => {
    pin.setRotation(deg);
    leafMarker.setRotation(deg);
    stage.say(deg === null ? 'setRotation(null): no rotation, the shadow is back' : `setRotation(${deg}), getRotation() = ${pin.getRotation()}`);
  };
  stage.slider('rotation', 0, 360, 5, 30, set);
  stage.button('setRotation(null)', () => set(null));

  if (stage.preview) {
    stage.cycle([0, 45, 90, 180, 270, null].map((deg) => ({ run: () => set(deg) })), 1300);
  } else {
    set(30);
  }
  return () => stage.dispose();
};

export default mount;
