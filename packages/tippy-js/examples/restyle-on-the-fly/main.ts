// One tip restyled while it exists: setProps changes its look
import tippy, { type Placement, type Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/themes/light.css';
import type { Mount } from '@/types.ts';
import { button as barButton, checkbox, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

type Change = Partial<Pick<Props, 'placement' | 'arrow' | 'animation' | 'theme' | 'maxWidth'>>;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Change a setting; the tip is updated, not rebuilt.' });

  const target = document.createElement('button');
  target.className = 'btn btn-primary';
  target.textContent = 'Settings';
  stage.root.append(target);

  const tip = stage.own(
    tippy(target, {
      content: 'I can be restyled while I am open',
      trigger: 'manual',
      hideOnClick: false,
      showOnCreate: true,
      placement: 'top',
      maxWidth: 200,
      appendTo: stage.root,
    }),
  );

  // Hiding and showing again lets a new animation play, since it only runs on the way in and out.
  const replay = (): void => {
    tip.hide();
    stage.after(450, () => tip.show());
  };
  const apply = (change: Change, again = false): void => {
    tip.setProps(change);
    if (again) replay();
  };

  if (stage.bar) {
    select(stage.bar, 'Side', ['top', 'right', 'bottom', 'left'] as const, (placement: Placement) => apply({ placement }));
    checkbox(stage.bar, 'Arrow', true, (arrow) => apply({ arrow }));
    select(stage.bar, 'Animation', ['fade', 'scale', 'shift-away'] as const, (animation) => apply({ animation }, true));
    select(stage.bar, 'Theme', ['default', 'light'] as const, (theme) => apply({ theme: theme === 'light' ? 'light' : '' }));
    select(stage.bar, 'Width', ['wide', 'narrow'] as const, (w) => apply({ maxWidth: w === 'wide' ? 200 : 110 }));
    barButton(stage.bar, 'Replay', replay);
  }

  if (stage.preview) {
    const steps: [Change, boolean][] = [
      [{ placement: 'bottom' }, false],
      [{ arrow: false }, false],
      [{ theme: 'light' }, false],
      [{ animation: 'scale' }, true],
      [{ maxWidth: 110 }, false],
      [{ placement: 'top', arrow: true, theme: '', animation: 'fade', maxWidth: 200 }, true],
    ];
    stage.play(async (wait) => {
      for (const [change, again] of steps) {
        await wait(1300);
        apply(change, again);
      }
      await wait(1000);
    });
  }

  return stage.dispose;
};

export default mount;
