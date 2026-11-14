// A singleton whose child tips override its placement and theme
import tippy, { createSingleton, type Placement } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

interface Item {
  label: string;
  tip: string;
  placement: Placement;
  theme: string;
}

const ITEMS: Item[] = [
  { label: 'Save', tip: 'Save the file', placement: 'bottom', theme: '' },
  { label: 'Share', tip: 'Anyone with the link', placement: 'bottom', theme: 'light' },
  { label: 'Delete', tip: 'Cannot be undone', placement: 'top', theme: 'danger' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover the three buttons: each tip has its own side and colour.' });

  const row = document.createElement('div');
  row.className = 'row';
  const buttons = ITEMS.map((item) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = item.label;
    row.append(b);
    return b;
  });
  stage.root.append(row);

  // Each button's tippy states its own placement and theme.
  const instances = buttons.map((b, i) =>
    stage.own(tippy(b, { content: ITEMS[i]!.tip, placement: ITEMS[i]!.placement, theme: ITEMS[i]!.theme })),
  );
  const build = (overrides: ('placement' | 'theme')[]) =>
    createSingleton(instances, {
      delay: [150, 150],
      moveTransition: 'transform 0.2s ease-out',
      appendTo: stage.root,
      // Shared values, used where a button doesn't say otherwise...
      placement: 'bottom',
      theme: '',
      // ...but these are taken from whichever button's tip is showing.
      overrides,
    });
  let singleton = build(['placement', 'theme']);
  // The list of overrides is read once, when the singleton is made: switching it means making a new one.
  stage.onDispose(() => singleton.destroy());

  if (stage.bar) {
    checkbox(stage.bar, 'Let each button choose its own side and colour', true, (on) => {
      singleton.destroy();
      singleton = build(on ? ['placement', 'theme'] : []);
    });
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(buttons[0]!, 600);
      await wait(900);
      for (const b of buttons.slice(1)) {
        await stage.ghost.hover(b, 200);
        await wait(1000);
      }
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 220, y: 170 }, 600);
      await wait(700);
    });
  }

  return stage.dispose;
};

export default mount;
