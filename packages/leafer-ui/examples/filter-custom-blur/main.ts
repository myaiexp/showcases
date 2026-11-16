// Filter: register a blur filter, then use it on a Rect
import { Leafer, Rect, Filter } from 'leafer-ui';
import '@leafer-in/filter'; // the filter plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';

// Registered once at module level: the registry is page-wide.
Filter.register('blur', {
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
  const stage = createStage(el, ctx, { hint: 'Drag the blurred square. The edges stay soft because getSpread widens the bounds.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({
    ...mid(stage, S),
    width: S,
    height: S,
    cornerRadius: S * 0.3,
    fill: 'rgba(50,205,121,0.7)',
    draggable: true,
    filter: { type: 'blur', blur: 20 }, // an array applies several filters
  });
  leafer.add(rect);

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const c = { x: stage.width / 2, y: stage.height / 2 };
    script(stage, async () => {
      await ghost.drag(c, { x: c.x - 50, y: c.y + 20 }, 800);
      await stage.wait(500);
      await ghost.drag({ x: c.x - 50, y: c.y + 20 }, c, 800);
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
