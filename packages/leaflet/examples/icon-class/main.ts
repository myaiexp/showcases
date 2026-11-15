// An Icon subclass: shared options in static defaultOptions
import { Icon, LeafletMap, Marker, type PointTuple } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = async (el, ctx) => {
  const [green, red, orange, shadow] = await Promise.all([images.leafGreen(), images.leafRed(), images.leafOrange(), images.leafShadow()]);
  const stage = createStage(el, ctx, { hint: 'Click a leaf. Three icons, one set of shared options.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.495, -0.09], zoom: 13, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);

  // Everything the three leaves share. Instances only add iconUrl; defaultOptions are merged
  // with Icon's own, and nothing global changes because this is a subclass.
  class LeafIcon extends Icon {
    static override defaultOptions = {
      shadowUrl: shadow,
      iconSize: [38, 95] as PointTuple,
      shadowSize: [50, 64] as PointTuple,
      iconAnchor: [22, 94] as PointTuple,
      shadowAnchor: [4, 62] as PointTuple,
      popupAnchor: [-3, -76] as PointTuple,
    };
  }
  const greenIcon = new LeafIcon({ iconUrl: green });
  const redIcon = new LeafIcon({ iconUrl: red });
  const orangeIcon = new LeafIcon({ iconUrl: orange });

  const leaves = [
    new Marker([51.5, -0.09], { icon: greenIcon }).addTo(map).bindPopup('I am a green leaf.'),
    new Marker([51.495, -0.083], { icon: redIcon }).addTo(map).bindPopup('I am a red leaf.'),
    new Marker([51.49, -0.1], { icon: orangeIcon }).addTo(map).bindPopup('I am an orange leaf.'),
  ];

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    let i = 0;
    stage.cycle(
      [
        {
          say: 'new LeafIcon({ iconUrl })',
          run: () => {
            const m = leaves[i++ % leaves.length]!;
            g.click(m.getLatLng(), m.getElement());
          },
        },
      ],
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
