// A CRS subclass: SimpleCRS with its own Transformation, so coordinates are image pixels and zoom 0 fits the image
import { ImageOverlay, LeafletMap, Marker, SimpleCRS, Transformation } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { images } from '../../shared/data.ts';
import { STARS, UQM_BOUNDS, UQM_PIXELS } from '../../shared/uqm.ts';

/** y is up, in image pixels: 2315 units map to one 256 px tile at zoom 0. */
class ImagePixels extends SimpleCRS {
  static override transformation = new Transformation(256 / UQM_PIXELS, 0, -256 / UQM_PIXELS, 256);
}

const mount: Mount = async (el, ctx) => {
  const url = await images.uqmMap();
  const stage = createStage(el, ctx, { hint: 'Coordinates are pixels of the image (0, 0 at its bottom left), so no unit conversion and no negative minZoom. Zoom 0 is the whole image in 256 px; each level doubles it. Hover a marker.', height: 520 });
  const map = stage.own(new LeafletMap(stage.box, { crs: ImagePixels, minZoom: 0, maxZoom: 5, zoomControl: !stage.preview }));
  new ImageOverlay(url, [[0, 0], [UQM_PIXELS, UQM_PIXELS]]).addTo(map);
  map.setView([UQM_PIXELS / 2, UQM_PIXELS / 2], 1);

  // The tutorial's measured bounds turn a game coordinate into a pixel of the image.
  const [[south, west], [north, east]] = UQM_BOUNDS as [[number, number], [number, number]];
  const markers = STARS.map((s) => {
    const x = ((s.x - west) / (east - west)) * UQM_PIXELS;
    const y = ((s.y - south) / (north - south)) * UQM_PIXELS;
    return new Marker([y, x], { title: s.name }).addTo(map).bindTooltip(`${s.name}: pixel (${x.toFixed(0)}, ${y.toFixed(0)})`, { direction: 'top' });
  });
  stage.say(`ImagePixels.scale(0) = ${ImagePixels.scale(0)}, scale(3) = ${ImagePixels.scale(3)}: ${ImagePixels.latLngToPoint(map.getCenter(), 0).toString()} is the centre at zoom 0`);

  if (stage.preview) {
    let i = 0;
    stage.every(2200, () => {
      const m = markers[i++ % markers.length] as Marker;
      map.panTo(m.getLatLng());
      m.openTooltip();
      stage.say(`${STARS[(i - 1) % STARS.length]?.name} at image pixel ${m.getLatLng().lng.toFixed(0)}, ${m.getLatLng().lat.toFixed(0)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
