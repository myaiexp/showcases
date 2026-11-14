// A custom hideOnEsc plugin on a click-opened panel; cards draw the Esc key instead
import tippy, { type Instance, type Plugin } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// The docs' plugin: while the tip is open, the Escape key hides it.
const hideOnEsc: Plugin = {
  name: 'hideOnEsc',
  defaultValue: true,
  fn({ hide }) {
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') hide();
    }
    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown);
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown);
      },
      // Not in the docs: destroying a tip while it is open would leave the listener behind.
      onDestroy() {
        document.removeEventListener('keydown', onKeyDown);
      },
    };
  },
};

function panel(): HTMLElement {
  const box = document.createElement('div');
  box.className = 'panel';
  for (const text of ['Only unread', 'Has attachment', 'From my team']) {
    const label = document.createElement('label');
    const check = document.createElement('input');
    check.type = 'checkbox';
    label.append(check, ` ${text}`);
    box.append(label);
  }
  return box;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Click a button, then press Esc. Only the first one listens.' });

  const row = document.createElement('div');
  row.className = 'row';
  const makeButton = (label: string): HTMLButtonElement => {
    const b = document.createElement('button');
    b.className = 'btn btn-primary';
    b.textContent = label;
    row.append(b);
    return b;
  };
  const filters = makeButton(stage.preview ? 'Filters' : 'Filters (with plugin)');
  const common = {
    trigger: 'click',
    interactive: true,
    placement: 'bottom-start' as const,
    appendTo: stage.root,
  };
  const withEsc = stage.own(tippy(filters, { ...common, content: panel(), plugins: [hideOnEsc] }));

  // Same panel, no plugin: Esc does nothing, it closes only on a click elsewhere.
  if (!stage.preview) {
    const plain = makeButton('Filters (no plugin)');
    stage.own(tippy(plain, { ...common, content: panel() }));
  }

  const key = document.createElement('kbd');
  key.className = 'key';
  key.textContent = 'Esc';
  stage.root.append(row);
  if (stage.preview) stage.root.append(key);

  if (stage.preview) {
    // Card: a document keydown would reach every card's Esc-aware tip, so the key is a picture
    // that presses itself and the same hide path runs through instance.hide().
    const tip: Instance = withEsc;
    stage.play(async (wait) => {
      await stage.ghost.click(filters, 700);
      await wait(1100);
      await stage.ghost.moveTo({ x: 200, y: 150 }, 500);
      key.classList.add('down');
      key.animate([{ translate: '0 0' }, { translate: '0 3px' }, { translate: '0 0' }], { duration: 240 });
      await wait(160);
      tip.hide();
      await wait(250);
      key.classList.remove('down');
      await wait(1000);
    });
  }

  return stage.dispose;
};

export default mount;
