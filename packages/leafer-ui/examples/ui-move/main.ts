// UI: three ways to translate an element
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a method and press move: the rect travels (40, 0) each time.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.4;
  const group = new Group({ x: stage.width / 2, y: stage.height / 2, rotation: 30 });
  const ghostRect = new Rect({ x: -S * 1.6, y: -S / 2, width: S, height: S, stroke: '#aaa', strokeWidth: 1, dashPattern: [4, 4] });
  const rect = new Rect({ x: -S * 1.6, y: -S / 2, width: S, height: S, fill: '#32cd79' });
  group.add([ghostRect, rect]);
  leafer.add(group);
  const note = caption(stage, leafer);
  const methods = ['move', 'moveInner', 'moveWorld'] as const;
  let method: (typeof methods)[number] = 'move';
  const reset = (): void => { rect.set({ x: -S * 1.6, y: -S / 2 }); };
  const go = (): void => {
    if (rect.x! > S) reset();
    rect[method](40, 0);
    note.text = `rect.${method}(40, 0)`;
  };
  pick(stage, 'method', methods, (m) => ((method = m), reset()), 4800);
  if (stage.bar) button(stage.bar, 'move', go);
  else stage.every(700, go);

  return stage.dispose;
};

export default mount;
