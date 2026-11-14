// A widget board with a header strip: onMeasureConstraints trims the measured box so widgets stay clear of it
import { animate, drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="board${preview ? '' : ' big'}">
      <div class="strip">Header</div>
      <div class="widget">Clock</div>
    </div>`;
  const board = el.querySelector<HTMLElement>('.board')!;
  const strip = el.querySelector<HTMLElement>('.strip')!;
  const widget = el.querySelector<HTMLElement>('.widget')!;
  let trim = true;

  let stop: VoidFunction = () => undefined;
  const arm = (): void => {
    stop();
    stop = drag(widget, {
      constraints: board,
      elastic: 0.1,
      // The measured box is the whole board. Return a copy with the header's height cut off the top.
      onMeasureConstraints: (c) => (trim ? { ...c, top: c.top + strip.offsetHeight } : c),
    });
  };
  const scope = scopeMotion(el, arm);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Drag the clock up toward the header. It stops at the strip, because onMeasureConstraints moved the top edge down. Turn trimming off to cover it.');
    p = panel(el);
    p.toggle('trim top for header', true, (v) => {
      trim = v;
      scope.run(() => {
        arm();
        animate(widget, { x: 0, y: 0 }, { type: 'spring', bounce: 0.2, visualDuration: 0.3 });
      });
    });
  } else {
    loopGesture(el, signal, async (g) => {
      const a = at(el, widget);
      await g.drag(widget, a, { x: a.x + 30, y: a.y - 110 }, 0.7);
      await g.wait(0.9);
      await scope.run(() => animate(widget, { x: 0, y: 0 }, { type: 'spring', bounce: 0.2, visualDuration: 0.5 }));
    }, 0.4);
  }

  return () => {
    stop();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;
