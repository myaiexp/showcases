// Group: insert children at a chosen position
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press next to insert another square with the next method.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = stage.preview ? 70 : 110;
  const colors = ['#32cd79', '#FEB027', '#FF4B4B', '#4B8BFF'];
  const note = caption(stage, leafer);
  const box = (i: number): Rect => new Rect({ x: 0, y: 0, width: S, height: S, fill: colors[i], stroke: 'white', strokeWidth: 3, id: String(i + 1) });
  const group = new Group({ x: stage.width / 2 - S * 0.9, y: stage.height / 2 - S / 2 - 10 });
  leafer.add(group);
  const place = (): void => group.children.forEach((c, i) => (c.x = i * S * 0.4));
  const steps: [string, () => void][] = [
    ['add(1)', () => group.add(box(0))],
    ['add(2)', () => group.add(box(1))],
    ['addAt(3, 0): index 0', () => group.addAt(box(2), 0)],
    ['addBefore(4, 2)', () => group.addBefore(box(3), group.children[1]!)],
    ['addAfter(5, 1)', () => group.addAfter(Object.assign(box(0), { fill: '#b05cff', id: '5' }), group.children[0]!)],
    ['clear()', () => group.clear()],
  ];
  let i = 0;
  const step = (): void => {
    const [name, run] = steps[i]!;
    run();
    place();
    note.text = `${name}  ->  [${group.children.map((c) => c.id).join(', ')}]`;
    i = (i + 1) % steps.length;
  };
  step();
  if (stage.bar) button(stage.bar, 'next', step);
  else stage.every(1100, step);

  return stage.dispose;
};

export default mount;
