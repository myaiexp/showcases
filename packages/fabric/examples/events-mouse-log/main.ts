// Events: canvas.on logs the mouse events and the fields they carry
import { Canvas, type TPointerEventInfo } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { eventLog, trio, who, xy } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    height: 300,
    hint: 'Move, click, double-click and scroll over the shapes. Each line is one canvas event with the fields it carries.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const { all, red, blue } = trio();
  canvas.add(...all);
  const log = eventLog(stage, 8);
  let showMove = true;

  // Pointer events carry the browser event `e`, the `target` under the pointer (if any),
  // `scenePoint` (after the viewportTransform is undone) and `viewportPoint` (canvas pixels).
  const pointer = (name: string) => (opt: TPointerEventInfo) => {
    if (name === 'mouse:move' && !showMove) return;
    log.add(name, `target ${who(opt.target)} · scene ${xy(opt.scenePoint)} · viewport ${xy(opt.viewportPoint)}`);
  };
  for (const name of ['mouse:down', 'mouse:up', 'mouse:move', 'mouse:dblclick'] as const) canvas.on(name, pointer(name));

  // over and out add the object the pointer came from or went to
  canvas.on('mouse:over', (opt) => log.add('mouse:over', `target ${who(opt.target)} · from ${who(opt.previousTarget)}`));
  canvas.on('mouse:out', (opt) => log.add('mouse:out', `target ${who(opt.target)} · to ${who(opt.nextTarget)}`));
  canvas.on('mouse:wheel', (opt) => {
    opt.e.preventDefault();
    log.add('mouse:wheel', `deltaY ${Math.round(opt.e.deltaY)} · target ${who(opt.target)} · scene ${xy(opt.scenePoint)}`);
  });

  if (stage.bar) checkbox(stage.bar, 'log mouse:move', true, (v) => (showMove = v));
  else {
    const ghost = stage.ghost(canvas);
    showMove = false;
    stage.repeat(async () => {
      await ghost.move(red.getCenterPoint(), 700);
      await ghost.click(red.getCenterPoint());
      await ghost.move(blue.getCenterPoint(), 600);
      await ghost.dblclick(blue.getCenterPoint());
      ghost.wheel(blue.getCenterPoint(), 100);
      await stage.wait(500);
      ghost.leave();
      await stage.wait(500);
    }, 400);
  }

  return stage.dispose;
};

export default mount;
