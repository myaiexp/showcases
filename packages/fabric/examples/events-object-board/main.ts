// Events: a board of every event an object fires
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = [
  'mouseover', 'mouseout', 'mousemove', 'mousedown:before', 'mousedown', 'mouseup:before', 'mouseup', 'mousedblclick', 'mousewheel',
  'selected', 'deselected', 'moving', 'scaling', 'rotating', 'skewing', 'modified', 'added', 'removed',
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    height: 380,
    hint: 'Hover, click, double-click, scroll over, drag and transform the rectangle; the board shows which of its own events fired and how often.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const rect = new Rect({ left: 180, top: 165, width: 120, height: 60, fill: RED });
  canvas.add(rect);

  const board = document.createElement('div');
  if (stage.preview) {
    board.style.cssText = 'position:absolute;left:3px;right:3px;top:3px;display:flex;flex-wrap:wrap;gap:2px;z-index:4;pointer-events:none';
    stage.frame.append(board);
  } else {
    board.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;gap:6px;max-width:700px';
    stage.box.insertBefore(board, stage.bar);
  }
  const small = stage.preview;
  const chips = new Map<string, { chip: HTMLElement; n: number }>();
  for (const name of NAMES) {
    const chip = document.createElement('span');
    chip.style.cssText = `padding:${small ? '1px 4px' : '3px 9px'};border-radius:10px;font:${small ? 9 : 12}px ui-monospace,monospace;background:rgba(127,127,127,0.18);color:${small ? '#333' : 'inherit'};transition:background .3s`;
    chip.textContent = name;
    board.append(chip);
    chips.set(name, { chip, n: 0 });
  }
  // Events fire on `rect` itself: names have no canvas prefix ("moving", not "object:moving").
  const flash = (name: (typeof NAMES)[number]): void => {
    const c = chips.get(name)!;
    c.n++;
    c.chip.textContent = `${name} ${c.n}`;
    c.chip.style.background = '#ffc53d';
    stage.after(260, () => (c.chip.style.background = 'rgba(127,127,127,0.18)'));
  };
  for (const name of NAMES) {
    if (name === 'added') continue;
    rect.on(name, () => flash(name));
  }
  // `added` only fires when the object enters a container, so listen before it is added again
  rect.on('added', () => flash('added'));

  if (stage.bar) {
    button(stage.bar, 'remove and add again', () => {
      canvas.remove(rect);
      canvas.add(rect);
    });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      const c = rect.getCenterPoint();
      await ghost.move(c, 500);
      await ghost.click(c);
      await ghost.drag(c, c.add({ x: 20, y: 6 }), 500);
      await ghost.dblclick(c.add({ x: 20, y: 6 }));
      ghost.wheel(c.add({ x: 20, y: 6 }), 80);
      await ghost.click({ x: 30, y: 40 });
      await stage.wait(300);
      rect.set({ left: 180, top: 165 });
      rect.setCoords();
      canvas.requestRenderAll();
    }, 200);
  }

  return stage.dispose;
};

export default mount;
