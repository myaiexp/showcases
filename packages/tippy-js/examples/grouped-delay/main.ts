// Two toolbars with the same 500 ms delay: separate tips versus one grouped singleton
import tippy, { createSingleton, type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const LABELS = ['Cut', 'Copy', 'Paste', 'Undo'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Sweep along each row, resting a moment on every button.' });

  // Builds a labelled row and returns its buttons and the "last wait" label.
  const makeRow = (title: string): { buttons: HTMLButtonElement[]; wait: HTMLElement } => {
    const block = document.createElement('div');
    block.className = 'block';
    const head = document.createElement('div');
    head.className = 'head';
    const name = document.createElement('span');
    name.textContent = title;
    const wait = document.createElement('span');
    wait.className = 'took';
    wait.textContent = 'last wait: -';
    head.append(name, wait);
    const row = document.createElement('div');
    row.className = 'row';
    const buttons = LABELS.map((label) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      row.append(b);
      return b;
    });
    block.append(head, row);
    stage.root.append(block);
    return { buttons, wait };
  };

  // How long from the pointer arriving to the tip showing.
  const timer = (label: HTMLElement) => {
    let t0 = 0;
    return {
      onTrigger: (instance: Instance): void => {
        t0 = performance.now();
        // Already showing (the group's tip is up): nothing to wait for.
        if (instance.state.isVisible) label.textContent = 'last wait: 0 ms';
      },
      onShow: (): void => {
        label.textContent = `last wait: ${Math.round(performance.now() - t0)} ms`;
      },
    };
  };

  const separate = makeRow('Separate tips');
  const grouped = makeRow('One singleton');

  for (const [i, b] of separate.buttons.entries()) {
    stage.own(
      tippy(b, { content: LABELS[i], delay: 500, placement: 'top', appendTo: stage.root, ...timer(separate.wait) }),
    );
  }
  const members = grouped.buttons.map((b, i) => stage.own(tippy(b, { content: LABELS[i] })));
  stage.own(
    createSingleton(members, {
      delay: 500,
      placement: 'bottom',
      appendTo: stage.root,
      ...timer(grouped.wait),
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const row of [separate.buttons, grouped.buttons]) {
        await stage.ghost.hover(row[0]!, 600);
        await wait(1000);
        // The hop is quicker than the 500 ms hide delay: for a singleton the tip stays up.
        await stage.ghost.hover(row[1]!, 200);
        await wait(1000);
        stage.ghost.leave();
        await wait(700);
      }
    });
  }

  return stage.dispose;
};

export default mount;
