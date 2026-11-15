// panInsideBounds: pan to the closest view that lies inside a rectangle
import { LeafletMap, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

const BOUNDS: [[number, number], [number, number]] = [[34, -12], [62, 32]];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the map out of the dashed rectangle, then press the button: the view slides back to the nearest position inside it.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 10], zoom: 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/vintage/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new Rectangle(BOUNDS, { color: '#f5b83d', weight: 2, fill: false, dashArray: '6' }).addTo(map);

  const back = (options?: { animate?: boolean; duration?: number }): void => {
    stage.say(`map.panInsideBounds(bounds${options ? `, ${JSON.stringify(options)}` : ''})`);
    map.panInsideBounds(BOUNDS, options);
  };
  stage.button('panInsideBounds(bounds)', () => back());
  stage.button('Slow: {duration: 2}', () => back({ duration: 2 }));
  stage.button('No animation', () => back({ animate: false }));
  stage.button('Reset view', () => map.setView([48, 10], 5));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const gesture = gestures(stage, map, g);
    stage.cycle(
      [
        { say: 'Drag the map out of the rectangle', run: () => gesture.drag([48, 10], [-190, 40], 700), hold: 800 },
        { say: 'map.panInsideBounds(bounds)', run: () => back(), hold: 2600 },
      ],
      500,
    );
  }
  return () => stage.dispose();
};

export default mount;
