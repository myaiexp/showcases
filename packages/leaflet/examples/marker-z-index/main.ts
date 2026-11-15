// Marker stacking with zIndexOffset and riseOnHover
import { DefaultIcon, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const COLORS = ['crimson', 'gold', 'seagreen', 'rebeccapurple'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Left stack: the slider sets zIndexOffset of the purple marker, which sits behind the others. Right stack: riseOnHover, so hover the markers; the one under the pointer comes to the front.',
  });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.09], zoom: 14, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // By default a marker's z-index comes from its latitude: the more southern, the further in front.
  // Each stack slopes north-east, so the purple one (the most northern) starts at the back.
  const stack = (lon: number, extra: ConstructorParameters<typeof Marker>[1]): Marker[] =>
    COLORS.map((color, i) =>
      new Marker([51.5 + i * 0.0004, lon + i * 0.0003], { icon: new DefaultIcon({ color }), title: color, ...extra }).addTo(map),
    );

  // Left: no rise, zIndexOffset set by hand.
  const left = stack(-0.095, {});
  // Right: riseOnHover, lifted by riseOffset (250 by default) while the pointer is over it.
  const right = stack(-0.085, { riseOnHover: true, riseOffset: 250 });

  const back = left[3]!;
  const setOffset = (v: number): void => {
    back.setZIndexOffset(v);
    stage.say(`purple.setZIndexOffset(${v})`);
  };
  stage.slider('zIndexOffset', 0, 1000, 50, 0, setOffset);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { say: 'zIndexOffset: 0, purple is behind', run: () => setOffset(0), hold: 1200 },
        { say: 'zIndexOffset: 1000, purple is in front', run: () => setOffset(1000), hold: 1600 },
        { say: 'riseOnHover: hover the purple marker', run: () => (setOffset(0), g.over(right[3]!.getLatLng(), right[3]!.getElement())), hold: 1600 },
        { say: 'riseOnHover: hover the red marker', run: () => (g.out(right[3]!.getElement()), g.over(right[0]!.getLatLng(), right[0]!.getElement())), hold: 1600 },
        { run: () => g.out(right[0]!.getElement()), hold: 300 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
