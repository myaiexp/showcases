// Filter: the same blur with and without getSpread
import { Leafer, Rect, Filter } from 'leafer-ui';
import '@leafer-in/filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';

const apply: Parameters<typeof Filter.register>[1]['apply'] = (filter, _ui, worldBounds, currentCanvas) => {
  currentCanvas.filter = `blur(${filter.blur}px)`;
  currentCanvas.resetTransform();
  currentCanvas.copyWorld(currentCanvas, worldBounds, worldBounds, 'copy');
  currentCanvas.filter = 'none';
};
Filter.register('blurSpreadOn', { apply, getSpread: (filter) => filter.blur });
Filter.register('blurSpreadOff', { apply, getSpread: () => 0 }); // render bounds not grown

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['getSpread returns blur', 'getSpread returns 0'],
    hint: 'Same filter, same square. Without a spread the blurred edge is clipped.',
  });
  const [a, b] = stage.panes;
  const S = size(stage) * (stage.preview ? 0.6 : 0.8);

  ['blurSpreadOn', 'blurSpreadOff'].forEach((type, i) => {
    const pane = i ? b! : a!;
    const leafer = stage.own(new Leafer({ view: pane.view }), pane);
    leafer.add(
      new Rect({
        x: (pane.width - S) / 2,
        y: (pane.height - S) / 2,
        width: S,
        height: S,
        fill: '#32cd79',
        filter: { type, blur: 14 },
      }),
    );
  });

  return stage.dispose;
};

export default mount;
