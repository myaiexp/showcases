// Layout: getTransform relative to local, world, page or an element
import { Frame, Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'getTransform(relative) gives the rect\'s matrix as seen from its parent (local), the canvas (world), the page, or any ancestor element.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.3;
  const frame = new Frame({ x: stage.width * 0.1, y: 10, width: stage.width * 0.8, height: stage.height - 76, fill: '#fff', overflow: 'show' });
  const group = new Group({ x: 30, y: 20, rotation: 20, scale: 1.3 });
  const rect = new Rect({ x: 10, y: 10, width: S, height: S * 0.6, fill: '#32cd79', rotation: 10 });
  group.add(rect);
  frame.add(group);
  leafer.add(frame);
  leafer.set({ scale: 1.2, x: 10, y: 6 });
  const show = label(stage, '', true);
  const f = (m: { a: number; b: number; c: number; d: number; e: number; f: number }): string => [m.a, m.b, m.c, m.d, m.e, m.f].map((n) => n.toFixed(2)).join(', ');
  pick(stage, 'relative', ['local', 'world', 'page', 'group', 'frame'] as const, (n) => {
    const m = rect.getTransform(n === 'group' ? group : n === 'frame' ? frame : n);
    show(`rect.getTransform(${n === 'group' || n === 'frame' ? n : `'${n}'`})\na, b, c, d, e, f = ${f(m)}`);
  }, 1800);

  return stage.dispose;
};

export default mount;
