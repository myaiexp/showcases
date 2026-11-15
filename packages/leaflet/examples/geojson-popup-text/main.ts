// Popup content from GeoJSON properties: a string is HTML, a DOM element with textContent is plain text
import { GeoJSON, LeafletMap, type Layer, type Marker } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

// Pretend this came from an untrusted source: the property holds markup.
const upload: Feature = {
  type: 'Feature',
  properties: { popupContent: 'Rockies <b>home</b> game <img src="x" alt="" width="1" height="1"> tonight' },
  geometry: { type: 'Point', coordinates: [-104.99404, 39.75621] },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The property contains markup. As a string it is parsed as HTML; through textContent it is shown as written.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [39.76, -104.99], zoom: 14, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let asText = true;
  let layer: GeoJSON | null = null;
  const draw = (): void => {
    layer?.remove();
    layer = new GeoJSON(upload, {
      onEachFeature(feature: Feature, l: Layer) {
        const text = (feature.properties as { popupContent: string }).popupContent;
        if (asText) {
          const div = document.createElement('div');
          div.textContent = text;
          l.bindPopup(div, { maxWidth: 200 });
        } else {
          l.bindPopup(text, { maxWidth: 200 });
        }
      },
    }).addTo(map);
    (layer.getLayers()[0] as Marker).openPopup();
    stage.say(asText ? 'bindPopup(element) with textContent: the tags show as characters' : 'bindPopup(string): the tags are rendered as HTML');
  };
  stage.toggle('textContent (safe)', true, (on) => {
    asText = on;
    draw();
  });
  draw();
  if (stage.preview) stage.every(2600, () => ((asText = !asText), draw()));
  return () => stage.dispose();
};

export default mount;
