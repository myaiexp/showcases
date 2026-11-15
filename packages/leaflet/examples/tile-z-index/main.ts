// zIndex, setZIndex(), bringToFront() and bringToBack() order tile layers in one pane
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The transparent coast and label layer only shows while its zIndex is above the opaque base.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [45, 10], zoom: 4 }));

  const base = new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { zIndex: 5, attribution: LAND_ATTRIBUTION }).addTo(map);
  // ?layers= asks the pretend server for only these parts, on a transparent background.
  const lines = new LocalTileLayer('https://tiles.example/light/{z}/{x}/{y}.png?layers=coast,borders,labels', { zIndex: 8 }).addTo(map);

  const report = (what: string): void => stage.say(`${what}: base zIndex ${base.options.zIndex}, lines zIndex ${lines.options.zIndex}`, lines.options.zIndex > base.options.zIndex ? 'ok' : 'warn');
  report('zIndex options');

  const slider = stage.slider('lines zIndex', 0, 12, 1, 8, (v) => (lines.setZIndex(v), report(`lines.setZIndex(${v})`)));
  stage.button('lines.bringToFront()', () => (lines.bringToFront(), report('bringToFront()'), slider && (slider.value = String(lines.options.zIndex))));
  stage.button('lines.bringToBack()', () => (lines.bringToBack(), report('bringToBack()'), slider && (slider.value = String(lines.options.zIndex))));

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => (lines.setZIndex(2), report('lines.setZIndex(2)')) },
        { run: () => (lines.setZIndex(9), report('lines.setZIndex(9)')) },
        { run: () => (lines.bringToBack(), report('lines.bringToBack()')) },
        { run: () => (lines.bringToFront(), report('lines.bringToFront()')) },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
