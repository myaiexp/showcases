// Tag chips each get a tip; onCreate and onDestroy maintain the live tip count
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const POOL = ['travel', 'food', 'music', 'art', 'tech', 'film', 'books', 'sport'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Add a tag, remove one, and watch the count.' });

  const chips = document.createElement('div');
  chips.className = 'chips';
  const adder = document.createElement('div');
  adder.className = 'adder';
  const input = document.createElement('input');
  input.placeholder = 'new tag';
  const add = document.createElement('button');
  add.className = 'btn btn-primary';
  add.textContent = 'Add';
  adder.append(input, add);
  const count = document.createElement('div');
  count.className = 'count';
  stage.root.append(chips, adder, count);

  // The hooks keep a set of live instance ids; the readout is drawn from it.
  const live = new Set<number>();
  const draw = (): void => {
    const ids = [...live].join(', ');
    count.replaceChildren('Live tips: ');
    const n = document.createElement('b');
    n.textContent = String(live.size);
    count.append(n, ` (ids ${ids || 'none'})`);
  };
  draw();

  let next = 3;
  const addChip = (name: string): HTMLElement => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    const label = document.createElement('span');
    label.textContent = name;
    const x = document.createElement('button');
    x.type = 'button';
    x.textContent = '×';
    x.setAttribute('aria-label', `Remove ${name}`);
    chip.append(label, x);
    chips.append(chip);

    const tip: Instance = stage.own(
      tippy(label, {
        content: `Posts tagged ${name}`,
        placement: 'bottom',
        appendTo: stage.root,
        onCreate: (instance) => {
          live.add(instance.id);
          draw();
        },
        onDestroy: (instance) => {
          live.delete(instance.id);
          draw();
        },
      }),
    );
    x.addEventListener('click', () => {
      tip.destroy();
      chip.remove();
    });
    return label;
  };

  for (const name of POOL.slice(0, 3)) addChip(name);
  const addTyped = (): void => {
    const name = input.value.trim() || POOL[next++ % POOL.length]!;
    input.value = '';
    addChip(name);
  };
  add.addEventListener('click', addTyped);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTyped();
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      await wait(500);
      await stage.ghost.moveTo(input, 600);
      await stage.ghost.type(input, POOL[next++ % POOL.length]!, 80);
      await stage.ghost.click(add, 500);
      await wait(500);
      const fresh = chips.lastElementChild!.firstElementChild!;
      await stage.ghost.hover(fresh, 600);
      await wait(1100);
      stage.ghost.leave();
      const first = chips.firstElementChild!.lastElementChild!;
      await stage.ghost.click(first, 600);
      await wait(1300);
    });
  }

  return stage.dispose;
};

export default mount;
