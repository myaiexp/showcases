// Layer names in a layers control can hold HTML, such as a styled span
import { LayerGroup, LayersControl, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, cityMarkers, DENVER, parkMarkers, pressEntry } from '../../shared/group-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The keys of the two objects are plain strings here, but Leaflet sets them as HTML.' });
  const cities = new LayerGroup(cityMarkers());
  const parks = new LayerGroup(parkMarkers());
  const light = baseTiles('light');
  const night = baseTiles('night');
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, layers: [light, cities, parks], zoomControl: !stage.preview }));

  const baseMaps = {
    Streets: light,
    "<span style='color: #e11d48'>Night (red label)</span>": night,
  };
  const overlayMaps = {
    "<span style='display:inline-block;width:10px;height:10px;border-radius:50%;background:#2563eb'></span> <b>Cities</b>": cities,
    "<span style='display:inline-block;width:10px;height:10px;border-radius:50%;background:#16a34a'></span> <i>Parks</i>": parks,
  };
  new LayersControl(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

  if (stage.preview) {
    stage.cycle(
      [
        { say: 'Names styled with <span>, <b> and <i>', run: () => pressEntry(map, 'red label') },
        { say: 'The styled names are real HTML inside the labels', run: () => pressEntry(map, 'Cities') },
        { run: () => pressEntry(map, 'Streets') },
        { run: () => pressEntry(map, 'Cities') },
      ],
      1900,
    );
  }
  return () => stage.dispose();
};

export default mount;
