// Group: remove(child, destroy), clear()
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the buttons in order and watch the count.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = stage.preview ? 40 : 70;
  const note = caption(stage, leafer);
  const group = new Group({ x: 20, y: stage.height / 2 - S });
  leafer.add(group);
  const fill = (): void => {
    group.clear();
    ['#32cd79', '#FEB027', '#FF4B4B', '#4B8BFF'].forEach((c, i) => group.add(new Rect({ x: i * (S + 10), width: S, height: S, fill: c })));
  };
  const report = (what: string): void => {
    note.text = `${what}: children ${group.children.length}`;
  };
  const ops: [string, () => void][] = [
    ['reset', fill],
    ['remove(child, true)', () => group.remove(group.children[0]!, true)],
    ['child.remove()', () => group.children[0]!.remove()],
    ['clear()', () => group.clear()],
  ];
  fill();
  report('reset');
  let i = 0;
  const run = (k: number): void => {
    ops[k]![1]();
    report(ops[k]![0]);
  };
  if (stage.bar) ops.forEach(([name], k) => button(stage.bar!, name, () => run(k)));
  else stage.every(1100, () => run(++i % ops.length));

  return stage.dispose;
};

export default mount;
