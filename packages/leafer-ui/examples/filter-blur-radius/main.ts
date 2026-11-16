// Filter: assign a new filter value and the element redraws
import { Leafer, Rect, Filter } from 'leafer-ui';
import '@leafer-in/filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

Filter.register('blurRadius', {
  apply(filter, _ui, worldBounds, currentCanvas) {
    currentCanvas.filter = `blur(${filter.blur}px)`; // a CSS filter on the canvas context
    currentCanvas.resetTransform();
    currentCanvas.copyWorld(currentCanvas, worldBounds, worldBounds, 'copy'); // redraw the element through the filter
    currentCanvas.filter = 'none';
  },
  getSpread(filter) {
    return filter.blur; // grow the render bounds so the blur is not clipped
  },
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the slider: the filter object is replaced on every change.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.3, fill: '#32cd79', stroke: '#1d7a48', strokeWidth: 6 });
  leafer.add(rect);

  drive(stage, 'blur', [0, 40, 1], 0, (v) => (rect.filter = { type: 'blurRadius', blur: v }), 5);

  return stage.dispose;
};

export default mount;
