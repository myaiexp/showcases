// The style option as a plain object: every line and polygon gets the same look
import { GeoJSON, LeafletMap } from 'leaflet';
import type { GeoJSON as GeoJSONData } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const myLines = [
  { type: 'LineString', coordinates: [[-100, 40], [-105, 45], [-110, 55]] },
  { type: 'LineString', coordinates: [[-105, 40], [-110, 45], [-115, 55]] },
] as GeoJSONData[];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One style object for all paths. The slider changes its weight and rebuilds the layer.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [47, -108], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let layer: GeoJSON | null = null;
  const draw = (weight: number): void => {
    layer?.remove();
    const myStyle = { color: '#ff7800', weight, opacity: 0.65 };
    layer = new GeoJSON(myLines, { style: myStyle }).addTo(map);
    stage.say(`style: { color: '#ff7800', weight: ${weight}, opacity: 0.65 }`);
  };
  stage.slider('weight', 1, 14, 1, 5, draw);
  draw(5);

  if (stage.preview) {
    const weights = [5, 12, 2, 8];
    let i = 0;
    stage.every(1400, () => draw(weights[++i % weights.length]!));
  }
  return () => stage.dispose();
};

export default mount;
