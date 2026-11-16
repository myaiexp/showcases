// Events: isClick on mouse:up, alreadySelected on mouse:down, :before events
import { Canvas, Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { eventLog, trio, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    height: 330,
    hint: 'Click a shape, click it again, then drag it. The :before events come first; mouse:down reports alreadySelected and mouse:up reports isClick.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const { all, red, blue } = trio();
  canvas.add(...all);
  const log = eventLog(stage, 9);

  // :before events run ahead of fabric's own handling, so the selection has not changed yet
  canvas.on('mouse:down:before', ({ target }) => log.add('mouse:down:before', `target ${who(target)} · active ${who(canvas.getActiveObject())}`));
  canvas.on('mouse:down', ({ target, alreadySelected }) => log.add('mouse:down', `target ${who(target)} · alreadySelected ${alreadySelected}`));
  canvas.on('mouse:up:before', ({ target }) => log.add('mouse:up:before', `target ${who(target)}`));
  canvas.on('mouse:up', ({ target, isClick }) => log.add('mouse:up', `target ${who(target)} · isClick ${isClick}`));

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      const c = red.getCenterPoint();
      canvas.discardActiveObject();
      await ghost.click(c);
      await stage.wait(500);
      await ghost.click(c);
      await stage.wait(500);
      await ghost.drag(c, new Point(120, 70), 500);
      await ghost.click(blue.getCenterPoint());
      await stage.wait(500);
      red.set({ left: 80, top: 110 });
      red.setCoords();
      canvas.requestRenderAll();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
