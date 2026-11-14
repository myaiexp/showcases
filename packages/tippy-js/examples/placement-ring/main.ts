// A profile card ringed by twelve tips, one for every placement, shown one by one
import tippy, { type Instance, type Placement } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import './style.css';

const PLACEMENTS: Placement[] = [
  'top-start', 'top', 'top-end',
  'right-start', 'right', 'right-end',
  'bottom-end', 'bottom', 'bottom-start',
  'left-end', 'left', 'left-start',
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Every tip belongs to the same card. Replay to watch them appear one by one.' });

  const card = document.createElement('div');
  card.className = 'card';
  const face = document.createElement('span');
  face.className = 'face';
  face.textContent = 'AL';
  const name = document.createElement('span');
  name.textContent = 'Ada Lovelace';
  card.append(face, name);
  stage.root.append(card);

  // A tippy needs its own reference element, so twelve invisible copies of the
  // card's box sit on top of it, one per placement.
  const tips: Instance[] = PLACEMENTS.map((placement) => {
    const ref = document.createElement('div');
    ref.className = 'ref';
    stage.root.append(ref);
    return stage.own(
      tippy(ref, {
        content: placement,
        placement,
        arrow: false,
        // The middle tips sit one row further out so they never cover their neighbours.
        offset: placement === 'top' || placement === 'bottom' ? [0, 26] : [0, 4],
        trigger: 'manual',
        appendTo: stage.root,
        // As on the home page: no flipping, so each tip stays on the side it names.
        popperOptions: {
          modifiers: [
            { name: 'flip', enabled: false },
            { name: 'preventOverflow', options: { altAxis: true, tether: false } },
          ],
        },
      }),
    );
  });

  const sequence = async (wait: (ms: number) => Promise<void>): Promise<void> => {
    for (const t of tips) {
      t.show();
      await wait(260);
    }
    await wait(1600);
    for (const t of tips) t.hide();
    await wait(700);
  };

  if (stage.bar) {
    let run = 0;
    const replay = async (): Promise<void> => {
      const me = ++run;
      for (const t of tips) t.hide();
      await stage.wait(300);
      for (const t of tips) {
        if (me !== run) return;
        t.show();
        await stage.wait(160);
      }
    };
    button(stage.bar, 'Replay one by one', () => void replay().catch(() => {}));
    button(stage.bar, 'Show all', () => {
      run++;
      for (const t of tips) t.show();
    });
    button(stage.bar, 'Hide all', () => {
      run++;
      for (const t of tips) t.hide();
    });
    stage.after(300, () => void replay().catch(() => {}));
  } else {
    stage.play(sequence);
  }

  return stage.dispose;
};

export default mount;
