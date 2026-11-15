// Selector sources: view, any mark, one mark type
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 170,
    padding: 5,

    signals: [
      { name: 'anywhere', value: 0, on: [{ events: 'click', update: 'anywhere + 1' }] },
      { name: 'onMarks', value: 0, on: [{ events: '*:click', update: 'onMarks + 1' }] },
      { name: 'onRect', value: 0, on: [{ events: 'rect:click', update: 'onRect + 1' }] },
      { name: 'onSymbol', value: 0, on: [{ events: 'symbol:click', update: 'onSymbol + 1' }] },
    ],

    marks: [
      line("'click        (the view)   ' + anywhere", 4),
      line("'*:click      (any mark)   ' + onMarks", 24),
      line("'rect:click   (rects)      ' + onRect", 44),
      line("'symbol:click (symbols)    ' + onSymbol", 64),
      { type: 'rect', encode: { update: { x: { value: 40 }, y: { value: 100 }, width: { value: 120 }, height: { value: 56 }, fill: { value: 'steelblue' } } } },
      { type: 'symbol', encode: { update: { x: { value: 290 }, y: { value: 128 }, size: { value: 3000 }, fill: { value: 'orange' } } } },
    ],
  };

  const view = await stage.render(spec);
  // Cards: click the rect, the symbol and the empty background in turn.
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const spots: [number, number][] = [[100, 128], [290, 128], [370, 30]];
    stage.every(900, (i) => {
      const [x, y] = spots[i % 3] ?? [0, 0];
      ghost.click(x, y);
    });
  }
  return () => stage.dispose();
};

export default mount;
