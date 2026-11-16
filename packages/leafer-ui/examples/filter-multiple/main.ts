// Filter: [grayscale, blur] on one element
import { Leafer, Rect, Ellipse, Box, Filter } from 'leafer-ui';
import '@leafer-in/filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';

Filter.register('grayStack', {
  apply(_filter, _ui, worldBounds, currentCanvas) {
    currentCanvas.filter = 'grayscale(1)';
    currentCanvas.resetTransform();
    currentCanvas.copyWorld(currentCanvas, worldBounds, worldBounds, 'copy');
    currentCanvas.filter = 'none';
  },
  getSpread: () => 0,
});
Filter.register('blurStack', {
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
  const stage = createStage(el, ctx, { hint: 'Toggle the two filters of the array.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const group = new Box({ ...mid(stage, S, S), width: S, height: S }); // a Box: a Group ignores filter
  group.add(Rect.one({ fill: '#f06a6a', cornerRadius: 16 }, 0, 0, S, S));
  group.add(Ellipse.one({ fill: '#32cd79' }, S * 0.25, S * 0.25, S * 0.5, S * 0.5));
  leafer.add(group);

  let gray = true;
  let blur = false;
  const apply = (): void => {
    group.filter = [
      { type: 'grayStack', visible: gray },
      { type: 'blurStack', blur: 8, visible: blur },
    ];
  };
  toggle(stage, 'grayscale', gray, (v) => ((gray = v), apply()), 1800);
  toggle(stage, 'blur', blur, (v) => ((blur = v), apply()), 2900);

  return stage.dispose;
};

export default mount;
