// Transformations: sendObjectToPlane converts an object's transform so it can join a group without jumping
import { Canvas, Circle, Group, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'The dot joins and leaves the tilted group. Add it naively and it jumps: its numbers are read in the group\'s plane. sendObjectToPlane fixes the numbers first.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const plate = new Rect({ left: 0, top: 0, width: 160, height: 100, fill: '#3b7dd833', stroke: '#3b7dd8', strokeWidth: 1.5 });
  const group = new Group([plate]);
  group.set({ left: 210, top: 120, angle: 24, selectable: false, evented: false });
  const dot = new Circle({ left: 80, top: 190, radius: 14, fill: '#e94b3c', stroke: '#fff', strokeWidth: 2 });
  canvas.add(group, dot);

  const inside = (): boolean => dot.group === group;
  const enter = (safe: boolean): void => {
    if (inside()) return;
    if (safe) util.sendObjectToPlane(dot, undefined, group.calcTransformMatrix()); // canvas plane -> group plane
    canvas.remove(dot);
    group.add(dot);
    say(stage.preview ? (safe ? 'sendObjectToPlane, then add: stays' : 'plain add: it jumped') : `group.add(dot)${safe ? ' after sendObjectToPlane: same place' : ' as it was: it jumped'}`);
    canvas.requestRenderAll();
  };
  const leave = (safe: boolean): void => {
    if (!inside()) return;
    if (safe) util.sendObjectToPlane(dot, group.calcTransformMatrix(), undefined); // group plane -> canvas plane
    group.remove(dot);
    canvas.add(dot);
    say(stage.preview ? (safe ? 'sendObjectToPlane, then remove: stays' : 'plain remove: it jumped') : `group.remove(dot)${safe ? ' after sendObjectToPlane: same place' : ' as it was: it jumped'}`);
    canvas.requestRenderAll();
  };
  const reset = (): void => {
    leave(true);
    dot.set({ left: 80, top: 190, scaleX: 1, scaleY: 1, angle: 0, skewX: 0, skewY: 0 });
    dot.setCoords();
    say('dot on the canvas');
    canvas.requestRenderAll();
  };
  say('dot on the canvas');

  if (stage.bar) {
    let safe = true;
    checkbox(stage.bar, 'use sendObjectToPlane', true, (v) => { safe = v; });
    button(stage.bar, 'add to group', () => enter(safe));
    button(stage.bar, 'remove from group', () => leave(safe));
    button(stage.bar, 'reset', reset);
  } else {
    stage.repeat(async () => {
      for (const safe of [false, true]) {
        reset();
        dot.set({ left: 150, top: 175 });
        await stage.wait(700);
        enter(safe);
        await stage.wait(1100);
        leave(safe);
        await stage.wait(1100);
      }
    }, 100);
  }
  return stage.dispose;
};

export default mount;
