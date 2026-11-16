// Filter: the same blur on a Text and on a Box
import { Leafer, Rect, Ellipse, Box, Group, Text, Filter } from 'leafer-ui';
import '@leafer-in/filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

Filter.register('blurAny', {
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
  const stage = createStage(el, ctx, { hint: 'The slider changes the blur of both.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const k = stage.preview ? 0.7 : 1;
  const text = new Text({ x: 20 * k, y: 30 * k, text: 'Blurred text', fontSize: 38 * k, fontWeight: 'bold', fill: '#1d4e89' });
  const group = new Box({ x: 20 * k, y: 100 * k, width: 160 * k, height: 110 * k }); // a Box: a Group ignores filter
  group.add(Rect.one({ fill: '#f06a6a', cornerRadius: 12 }, 0, 0, 110 * k, 70 * k));
  group.add(Ellipse.one({ fill: '#32cd79' }, 70 * k, 20 * k, 90 * k, 90 * k));
  leafer.add([text, group]);

  drive(stage, 'blur', [0, 12, 0.5], 4, (v) => {
    text.filter = { type: 'blurAny', blur: v };
    group.filter = { type: 'blurAny', blur: v };
  }, 5);

  return stage.dispose;
};

export default mount;
