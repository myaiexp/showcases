// Layout: dropTo with an index picks the stacking position
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption, size, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'dropTo(group, index) inserts the green rect at that place among the group\'s children.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const group = new Group();
  const note = caption(stage, leafer);
  leafer.add(group);
  const green = new Rect({ width: S, height: S, fill: '#32cd79', stroke: '#fff', strokeWidth: 3 });
  const make = (): Rect[] => ['#FEB027', '#FF4B4B', '#4B8BFF'].map((fill) => new Rect({ width: S, height: S, fill, stroke: '#fff', strokeWidth: 3 }));
  pick(stage, 'index', ['0', '1', '2', '3'] as const, (v) => {
    group.clear();
    green.remove();
    group.add(make());
    group.children.forEach((c, i) => c.set({ x: stage.width / 2 - S * 1.3 + i * S * 0.7, y: 28 + i * 6 }));
    leafer.add(green);
    green.set({ x: stage.width / 2 - S * 0.5, y: stage.height - S - 54 });
    green.dropTo(group, Number(v));
    note.text = `green.dropTo(group, ${v})  ->  child ${group.children.indexOf(green)} of ${group.children.length}`;
  }, 1800);

  return stage.dispose;
};

export default mount;
