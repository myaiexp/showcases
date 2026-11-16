// Filter: one custom filter whose CSS function is a property of the filter object
import { Leafer, Rect, Ellipse, Box, Group, Filter } from 'leafer-ui';
import '@leafer-in/filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

Filter.register('cssFx', {
  apply(filter, _ui, worldBounds, currentCanvas) {
    currentCanvas.filter = filter.css; // e.g. 'sepia(1)'
    currentCanvas.resetTransform();
    currentCanvas.copyWorld(currentCanvas, worldBounds, worldBounds, 'copy');
    currentCanvas.filter = 'none';
  },
  getSpread: () => 0, // colour filters do not grow the element
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a CSS filter function.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const scene = new Box({ ...mid(stage, S * 1.3, S), width: S * 1.3, height: S }); // a Box: a Group ignores filter
  scene.add(Rect.one({ fill: '#2b5fb8', cornerRadius: 12 }, 0, 0, S * 1.3, S));
  scene.add(Ellipse.one({ fill: '#ffe28a' }, S * 0.85, S * 0.12, S * 0.3, S * 0.3));
  scene.add(Rect.one({ fill: '#32cd79', cornerRadius: [0, 0, 12, 12] }, 0, S * 0.62, S * 1.3, S * 0.38));
  scene.add(Rect.one({ fill: '#f06a6a', cornerRadius: 8 }, S * 0.15, S * 0.3, S * 0.4, S * 0.5));
  leafer.add(scene);

  const css = ['grayscale(1)', 'sepia(1)', 'invert(1)', 'hue-rotate(120deg)', 'contrast(2)'] as const;
  pick(stage, 'css', css, (v) => (scene.filter = { type: 'cssFx', css: v }), 1400);

  return stage.dispose;
};

export default mount;
