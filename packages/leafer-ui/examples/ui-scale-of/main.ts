// UI: scaleOf scales around an origin
import { Ellipse, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an origin and press scale.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.6;
  const rect = new Rect({ x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2 - 8, width: S, height: S, fill: '#32cd79', cornerRadius: 10 });
  const dot = new Ellipse({ width: 10, height: 10, fill: '#FF4B4B', hittable: false });
  leafer.add([rect, dot]);
  const note = caption(stage, leafer);
  const origins = ['top-left', 'center', 'bottom-right', 'top'] as const;
  let origin: (typeof origins)[number] = 'top-left';
  const mark = (): void => {
    const p = rect.getWorldPointByBox({ x: origin.includes('left') ? 0 : origin.includes('right') ? S : S / 2, y: origin.startsWith('top') ? 0 : origin.startsWith('bottom') ? S : S / 2 });
    dot.set({ x: p.x - 5, y: p.y - 5 });
  };
  let grow = true;
  const go = (): void => {
    rect.scaleOf(origin, grow ? 1.3 : 1 / 1.3);
    grow = !grow;
    note.text = `scaleOf('${origin}', ${grow ? '1/1.3' : '1.3'})`;
    mark();
  };
  pick(stage, 'origin', origins, (o) => ((origin = o), rect.set({ scaleX: 1, scaleY: 1, x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2 - 8 }), (grow = true), mark()), 5200);
  mark();
  if (stage.bar) button(stage.bar, 'scale', go);
  else stage.every(900, go);

  return stage.dispose;
};

export default mount;
