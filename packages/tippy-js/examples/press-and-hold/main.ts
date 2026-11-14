// touch: 'hold' and ['hold', 500] on two thumbnails; cards act the finger out with show() and hide()
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    height: 240,
    hint: 'On a touch screen: hold the left photo, or long-press the right one. A mouse just hovers.',
  });

  const row = document.createElement('div');
  row.className = 'row';
  const thumb = (cls: string, label: string): HTMLButtonElement => {
    const b = document.createElement('button');
    b.className = `thumb ${cls}`;
    b.setAttribute('aria-label', label);
    const caption = document.createElement('small');
    caption.textContent = label;
    b.append(caption);
    row.append(b);
    return b;
  };
  const quick = thumb('t1', 'Hold');
  const slow = thumb('t2', 'Long press');
  stage.root.append(row);

  // The tip is there only while the finger is down...
  const quickTip = stage.own(
    tippy(quick, { content: 'Lake at dawn', touch: 'hold', placement: 'top', appendTo: stage.root }),
  );
  // ...or only once it has been held for half a second.
  const slowTip = stage.own(
    tippy(slow, { content: 'Pine forest', touch: ['hold', 500], placement: 'top', appendTo: stage.root }),
  );

  if (stage.preview) {
    // Cards never fake touch (it is page-wide): a drawn finger and show()/hide() stand in.
    const finger = document.createElement('div');
    finger.className = 'finger';
    stage.root.append(finger);
    const touch = async (target: HTMLElement, tip: typeof quickTip, after: number, hold: number): Promise<void> => {
      const r = target.getBoundingClientRect();
      const o = stage.root.getBoundingClientRect();
      finger.style.left = `${r.left - o.left + r.width / 2 - 17}px`;
      finger.style.top = `${r.top - o.top + r.height / 2 - 17}px`;
      finger.animate([{ opacity: 0, scale: '1.5' }, { opacity: 1, scale: '1' }], { duration: 250, fill: 'forwards' });
      await stage.wait(after);
      tip.show();
      await stage.wait(hold);
      tip.hide();
      finger.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' });
      await stage.wait(500);
    };
    stage.play(async () => {
      await touch(quick, quickTip, 150, 1400);
      await touch(slow, slowTip, 700, 1400);
    });
  }

  return stage.dispose;
};

export default mount;
