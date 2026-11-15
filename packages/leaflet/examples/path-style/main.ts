// setStyle changes colour, weight, opacity and fill of a live path
import { LeafletMap, Polygon, type PathOptions } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const LOOKS: { name: string; style: PathOptions }[] = [
  { name: 'default', style: { color: '#3388ff', weight: 3, opacity: 1, fillColor: '#3388ff', fillOpacity: 0.2 } },
  { name: 'heavy red', style: { color: '#ef4444', weight: 10, opacity: 1, fillColor: '#ef4444', fillOpacity: 0.2 } },
  { name: 'faint green', style: { color: '#34d399', weight: 2, opacity: 0.5, fillColor: '#34d399', fillOpacity: 0.7 } },
  { name: 'gold on blue', style: { color: '#fbbf24', weight: 6, opacity: 1, fillColor: '#2563eb', fillOpacity: 0.6 } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every slider calls setStyle with one option. A path keeps what you do not mention.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const shape = new Polygon(
    [
      [53, 4],
      [54, 14],
      [49, 17],
      [46, 8],
    ],
    LOOKS[0]!.style,
  ).addTo(map);

  stage.say('Polygon: setStyle changes only the options you pass');
  stage.slider('weight', 1, 16, 1, 3, (weight) => shape.setStyle({ weight }));
  stage.slider('opacity', 0, 1, 0.05, 1, (opacity) => shape.setStyle({ opacity }));
  stage.slider('fillOpacity', 0, 1, 0.05, 0.2, (fillOpacity) => shape.setStyle({ fillOpacity }));
  stage.select(
    'color',
    ['#3388ff', '#ef4444', '#34d399', '#fbbf24'].map((c) => ({ value: c, label: c })),
    '#3388ff',
    (color) => shape.setStyle({ color, fillColor: color }),
  );

  if (stage.preview) {
    stage.cycle(
      LOOKS.map((l) => ({ say: `setStyle(${l.name})`, run: () => shape.setStyle(l.style) })),
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
