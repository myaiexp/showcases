// A 1922 map of Newark laid over the tiles with ImageOverlay
import { ImageOverlay, LatLngBounds, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const imageUrl = await images.newark1922();
  const stage = createStage(el, ctx, { hint: 'The image is stretched between the two corners of its bounds and moves with the map.' });
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
  const latLngBounds = new LatLngBounds([
    [40.799311, -74.118464],
    [40.68202047785919, -74.33],
  ]);

  new ImageOverlay(imageUrl, latLngBounds, { opacity: 0.8, alt: altText }).addTo(map);
  map.fitBounds(latLngBounds);

  if (stage.preview) {
    stage.cycle(
      [
        { say: 'fitBounds(bounds): the image fills the view', run: () => map.fitBounds(latLngBounds) },
        { say: 'zoomed out: the image shrinks with the map', run: () => map.setView(latLngBounds.getCenter(), map.getZoom() - 2) },
      ],
      2600,
    );
  }
  return () => stage.dispose();
};

export default mount;
