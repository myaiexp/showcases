// A help tip and an alert tip overlap; zIndex decides which one is drawn in front
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Both tips stay open. Swap them to see the stacking change.' });

  const make = (cls: string, label: string): HTMLButtonElement => {
    const b = document.createElement('button');
    b.className = `btn pin ${cls}`;
    b.textContent = label;
    stage.root.append(b);
    return b;
  };
  const helpBtn = make('help', 'Help');
  const alertBtn = make('alert', 'Alert');

  const shared = { trigger: 'manual', placement: 'bottom', arrow: false, maxWidth: 170, appendTo: stage.root } as const;
  const help = stage.own(
    tippy(helpBtn, { ...shared, content: 'Help: pick a date range to filter the list below.', theme: 'help', zIndex: 2 }),
  );
  const alert = stage.own(
    tippy(alertBtn, { ...shared, content: 'Alert: 3 imports failed. Open the log.', theme: 'alert', zIndex: 1, offset: [0, 28] }),
  );
  help.show();
  alert.show();

  // The higher zIndex is drawn in front; flipping the numbers swaps the two.
  let helpOnTop = true;
  const swap = (): void => {
    helpOnTop = !helpOnTop;
    help.setProps({ zIndex: helpOnTop ? 2 : 1 });
    alert.setProps({ zIndex: helpOnTop ? 1 : 2 });
    state.textContent = helpOnTop ? 'Help tip in front (zIndex 2 over 1)' : 'Alert tip in front (zIndex 2 over 1)';
  };
  const state = document.createElement('div');
  state.className = 'state';
  state.textContent = 'Help tip in front (zIndex 2 over 1)';
  stage.root.append(state);

  if (stage.bar) button(stage.bar, 'Swap which is in front', swap);
  else stage.every(1800, swap);

  return stage.dispose;
};

export default mount;
