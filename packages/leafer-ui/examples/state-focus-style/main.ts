// Interaction: focus() moves a focus style between two rects
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/state';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label, cycle } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Focus A, then B (A loses it), then clear." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = Math.round(Math.min(stage.width * 0.3, stage.height * 0.5));
  const y = Math.round((stage.height - s) / 2 - 8);
  const make = (x: number): Rect =>
    new Rect({ x, y, width: s, height: s, fill: 'rgba(50,205,121, 0.7)', cornerRadius: 30, focusStyle: { stroke: '#FEB027', strokeWidth: 8 } });
  const a = make(Math.round(stage.width * 0.17));
  const b = make(Math.round(stage.width * 0.53));
  leafer.add([a, b]);
  const say = label(stage, '', true);
  const focus = (which: 'A' | 'B' | 'none'): void => {
    if (which === 'A') a.focus();
    else if (which === 'B') b.focus();
    else {
      a.focus(false);
      b.focus(false);
    }
    say('focus: ' + which);
  };
  focus('none');
  if (stage.bar) {
    button(stage.bar, 'A.focus()', () => focus('A'));
    button(stage.bar, 'B.focus()', () => focus('B'));
    button(stage.bar, 'focus(false)', () => focus('none'));
  } else cycle(stage, ['A', 'B', 'none'] as const, focus, 1300);

  return stage.dispose;
};

export default mount;
