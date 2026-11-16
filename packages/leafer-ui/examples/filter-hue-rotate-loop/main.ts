// Filter: hue-rotate driven by a frame loop
import { Leafer, Rect, Ellipse, Filter } from 'leafer-ui';
import '@leafer-in/filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';

Filter.register('hueFx', {
  apply(filter, _ui, worldBounds, currentCanvas) {
    currentCanvas.filter = `hue-rotate(${filter.deg}deg)`;
    currentCanvas.resetTransform();
    currentCanvas.copyWorld(currentCanvas, worldBounds, worldBounds, 'copy');
    currentCanvas.filter = 'none';
  },
  getSpread: () => 0,
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The filter angle advances 60 degrees a second.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S * 1.3, S), width: S * 1.3, height: S, fill: '#f06a6a', cornerRadius: 20 });
  const dot = new Ellipse({ x: mid(stage, S * 1.3, S).x + S * 0.4, y: mid(stage, S * 1.3, S).y + S * 0.25, width: S * 0.5, height: S * 0.5, fill: '#32cd79' });
  leafer.add([rect, dot]);

  stage.loop((_dt, t) => {
    const f = { type: 'hueFx', deg: Math.round((t * 60) % 360) };
    rect.filter = f;
    dot.filter = f;
  });

  return stage.dispose;
};

export default mount;
