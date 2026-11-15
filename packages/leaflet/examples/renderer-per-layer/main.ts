// A path's renderer option puts it in a chosen SVG or Canvas renderer, whatever the map uses
import { Canvas, LeafletMap, Polyline, SVG } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Blue lines use an SVG renderer, orange ones a Canvas renderer. They share one map and cross each other.' });
  const log = stage.log('Per-layer renderers', 8);
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const svg = new SVG();
  const canvas = new Canvas();
  const blue = new Polyline([[59.7, 23.5], [60.3, 24.5], [60.0, 26.3]], { color: '#7cb7ff', weight: 8, renderer: svg }).addTo(map);
  const blue2 = new Polyline([[60.7, 23.7], [60.2, 25.2], [59.6, 25.9]], { color: '#38bdf8', weight: 4, renderer: svg }).addTo(map);
  const orange = new Polyline([[60.6, 23.4], [60.1, 24.8], [59.8, 26.6]], { color: '#f59e0b', weight: 8, renderer: canvas }).addTo(map);
  const orange2 = new Polyline([[59.6, 24.0], [60.3, 25.6], [60.7, 26.4]], { color: '#fb923c', weight: 4, renderer: canvas }).addTo(map);

  const root = map.getContainer();
  const describe = (): void => {
    log(`blue.getElement():   ${blue.getElement()?.tagName ?? 'undefined'}`);
    log(`orange.getElement(): ${orange.getElement()?.tagName ?? 'undefined'}`);
    log(`<path> in the map: ${root.querySelectorAll('.leaflet-overlay-pane path').length}`);
    log(`<canvas> in the map: ${root.querySelectorAll('.leaflet-overlay-pane canvas').length}`);
    log(`the two blue lines share a renderer: ${map.getRenderer(blue) === map.getRenderer(blue2)}`);
    log(`blue and orange share one: ${map.getRenderer(blue) === map.getRenderer(orange)}`);
  };
  describe();
  stage.say('SVG paths have an element; canvas paths are only pixels (getElement() is undefined).');

  for (const [name, layer] of [['blue (SVG)', blue], ['orange (Canvas)', orange]] as const) {
    layer.on('click', () => log(`click on ${name}`));
  }

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { say: 'blue lines: SVG renderer, a <path> each', run: () => g.click([60.3, 24.5], blue.getElement()) },
        { say: 'orange lines: Canvas renderer, no element', run: () => g.click([60.1, 24.8]) },
        { say: `${blue2.getElement()?.tagName}: blue2 | ${orange2.getElement()?.tagName ?? 'no element'}: orange2`, run: () => undefined },
      ],
      2300,
    );
  }
  return () => stage.dispose();
};

export default mount;
