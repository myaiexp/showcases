// A custom marker icon: the tutorial's green leaf with shadow and anchors
import { Icon, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = async (el, ctx) => {
  // The tutorial's leaf-green.png and leaf-shadow.png, inlined as data URLs.
  const [leafGreen, leafShadow] = await Promise.all([images.leafGreen(), images.leafShadow()]);
  const stage = createStage(el, ctx, { hint: 'Click the leaf. The icon image is 38×95 px; its tip, at [22, 94], sits on the marker position.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.09], zoom: 13, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);

  const greenIcon = new Icon({
    iconUrl: leafGreen,
    shadowUrl: leafShadow,
    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  const marker = new Marker([51.5, -0.09], { icon: greenIcon, alt: 'Green leaf' }).addTo(map).bindPopup('I am a green leaf.');

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { say: 'new Marker(latlng, { icon: greenIcon })', run: () => marker.closePopup() },
        { say: 'the popup opens from popupAnchor', run: () => g.click(marker.getLatLng(), marker.getElement()) },
      ],
      2400,
    );
  }
  return () => stage.dispose();
};

export default mount;
