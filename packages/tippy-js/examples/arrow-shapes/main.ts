// Six arrow shapes, each a small theme that reshapes the arrow with CSS
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// `offset` pushes the tip away from the button to make room for a bigger arrow.
const SHAPES: { label: string; theme: string; offset: [number, number] }[] = [
  { label: 'Default', theme: 'plain-arrow', offset: [0, 10] },
  { label: 'Large', theme: 'large-arrow', offset: [0, 16] },
  { label: 'Small', theme: 'small-arrow', offset: [0, 8] },
  { label: 'Wide', theme: 'wide-arrow', offset: [0, 10] },
  { label: 'Narrow', theme: 'narrow-arrow', offset: [0, 10] },
  { label: 'Huge', theme: 'scaled-arrow', offset: [0, 22] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Hover each button and compare the arrows.' });

  const grid = document.createElement('div');
  grid.className = 'grid';
  const buttons = SHAPES.map((s) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = s.label;
    grid.append(b);
    return b;
  });
  stage.root.append(grid);

  buttons.forEach((button, i) => {
    const s = SHAPES[i]!;
    stage.own(
      tippy(button, {
        content: `${s.label} arrow`,
        theme: s.theme,
        offset: s.offset,
        appendTo: stage.root,
      }),
    );
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const button of buttons) {
        await stage.ghost.hover(button, 500);
        await wait(1000);
      }
      stage.ghost.leave();
      await wait(300);
    });
  }

  return stage.dispose;
};

export default mount;
