// Minions keep their matrix relative to a boss (invert and multiply)
import { Canvas, Point, Rect, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 260], hint: 'Press "bind", then move, rotate or scale the boss: the blue minions keep their place relative to it. BOSS x UNKNOWN = MINION, so UNKNOWN = inverse(BOSS) x MINION.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'not bound');

  const boss = new Rect({ left: 150, top: 135, width: 120, height: 160, fill: '#e94b3c', stroke: '#7a1f17', strokeWidth: 2 });
  const minions = [new Rect({ left: 260, top: 80, width: 40, height: 40, fill: '#3b7dd8' }), new Rect({ left: 270, top: 190, width: 36, height: 36, fill: '#2e9e5b' })];
  canvas.add(boss, ...minions);

  const relation = new Map<FabricObject, ReturnType<typeof util.invertTransform>>();
  const bind = (): void => {
    const inverse = util.invertTransform(boss.calcTransformMatrix());
    for (const m of minions) relation.set(m, util.multiplyTransformMatrices(inverse, m.calcTransformMatrix()));
    say('bound: minions follow the boss');
  };
  const follow = (): void => {
    for (const [m, rel] of relation) {
      util.applyTransformToObject(m, util.multiplyTransformMatrices(boss.calcTransformMatrix(), rel));
      m.setCoords();
    }
  };
  boss.on('moving', follow);
  boss.on('rotating', follow);
  boss.on('scaling', follow);

  if (stage.bar) button(stage.bar, 'bind minions to boss', bind);
  else {
    bind();
    const ghost = stage.ghost(canvas);
    const home = (): void => {
      boss.set({ left: 150, top: 135, angle: 0, scaleX: 1, scaleY: 1 });
      boss.setCoords();
      follow();
      canvas.discardActiveObject();
    };
    stage.repeat(async () => {
      home();
      await ghost.drag(boss.getCenterPoint(), new Point(120, 120), 800);
      const h = controlPoint(boss, 'mtr');
      await ghost.drag(h, h.add(new Point(70, 30)), 800);
      const br = controlPoint(boss, 'br');
      await ghost.drag(br, br.add(new Point(15, 15)), 600);
      await stage.wait(600);
    }, 300);
  }
  return stage.dispose;
};

export default mount;
