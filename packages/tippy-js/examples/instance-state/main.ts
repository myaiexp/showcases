// instance.state and instance.id drawn live as a tip changes
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { button as barButton } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const FLAGS = ['isEnabled', 'isVisible', 'isShown', 'isMounted', 'isDestroyed'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover the button, or use the buttons below.' });

  const target = document.createElement('button');
  target.className = 'btn btn-primary';
  target.textContent = 'Hover me';
  const table = document.createElement('div');
  table.className = 'state';
  const idRow = document.createElement('div');
  const lamps = FLAGS.map((flag) => {
    const row = document.createElement('div');
    const lamp = document.createElement('i');
    row.append(lamp, flag);
    table.append(row);
    return lamp;
  });
  table.append(idRow);
  stage.root.append(target, table);

  let tip!: Instance;
  const create = (): void => {
    tip = tippy(target, { content: 'I know my own state', placement: 'top', appendTo: stage.root });
  };
  create();
  // Destroy whichever instance is current when the stage goes away.
  stage.own({ destroy: () => tip.destroy() });

  // The state is a plain object on the instance, so a quick poll is enough to draw it.
  const draw = (): void => {
    FLAGS.forEach((flag, i) => {
      const on = tip.state[flag];
      lamps[i]!.className = flag === 'isDestroyed' ? (on ? 'bad' : '') : on ? 'on' : '';
    });
    idRow.textContent = `id: ${tip.id}`;
  };
  stage.every(80, draw);
  draw();

  const toggleEnabled = (): void => (tip.state.isEnabled ? tip.disable() : tip.enable());
  if (stage.bar) {
    barButton(stage.bar, 'Show / hide', () => (tip.state.isVisible ? tip.hide() : tip.show()));
    barButton(stage.bar, 'Disable / enable', toggleEnabled);
    barButton(stage.bar, 'Destroy', () => tip.destroy());
    barButton(stage.bar, 'Make a new one', () => {
      tip.destroy();
      create();
    });
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(target, 600);
      await wait(1300);
      stage.ghost.leave();
      await wait(500);
      tip.disable();
      await stage.ghost.hover(target, 400);
      await wait(1000);
      stage.ghost.leave();
      tip.enable();
      await wait(400);
      tip.destroy();
      await wait(1000);
      create();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
