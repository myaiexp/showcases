// Groups: subTargetCheck reports the member under the pointer in subTargets
import { Canvas, Circle, Group, Rect, Triangle, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { BLUE, GREEN, nameIt, RED, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Move over the group. The target is always the group; with subTargetCheck on, subTargets also names the member under the pointer, so the member can be highlighted.' });
  const canvas = stage.own(new Canvas(stage.el));
  const red = nameIt(new Rect({ left: 100, top: 120, width: 80, height: 80, fill: RED }), 'red');
  const blue = nameIt(new Circle({ left: 190, top: 120, radius: 40, fill: BLUE }), 'blue');
  const green = nameIt(new Triangle({ left: 275, top: 120, width: 80, height: 80, fill: GREEN }), 'green');
  const group = nameIt(new Group([red, blue, green], { subTargetCheck: true, backgroundColor: 'rgba(0,0,0,0.05)' }), 'group');
  canvas.add(group);
  const say = status(stage, 'target none');

  let lit: FabricObject | undefined;
  canvas.on('mouse:move', ({ target, subTargets }) => {
    const sub = subTargets?.[0];
    say(`target ${who(target)} · subTargets [${(subTargets ?? []).map(who).join(', ')}]`);
    if (sub === lit) return;
    lit?.set('opacity', 1);
    lit = sub;
    lit?.set('opacity', 0.55);
    canvas.requestRenderAll();
  });
  canvas.on('mouse:out', () => {
    lit?.set('opacity', 1);
    lit = undefined;
    canvas.requestRenderAll();
  });

  if (stage.bar) checkbox(stage.bar, 'subTargetCheck', true, (v) => ((group.subTargetCheck = v), canvas.discardActiveObject()));
  else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      for (const o of [red, blue, green]) await ghost.move(o.getCenterPoint(), 700);
      await ghost.move({ x: 180, y: 215 }, 500);
    }, 200);
  }

  return stage.dispose;
};

export default mount;
