// Layout: getBounds relative to a coordinate system or an element
import { Frame, Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, pick } from '../../shared/shapes.ts';
import { box } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "getBounds('box', relative): the same rect measured in the canvas ('world'), the page, its parent ('local'), itself ('inner') or the Frame (an element)." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const frame = new Frame({ x: stage.width * 0.2, y: 10, width: stage.width * 0.6, height: stage.height - 70, fill: '#fff', overflow: 'show' });
  const group = new Group({ x: 20, y: 20, rotation: 15, scale: 1.1 });
  const rect = new Rect({ x: 15, y: 10, width: S, height: S * 0.6, fill: '#32cd79', cornerRadius: 6 });
  group.add(rect);
  frame.add(group);
  leafer.add(frame);
  leafer.set({ scale: 1.2, x: 10, y: 6 }); // so that page and world differ
  const show = label(stage, '', true);
  pick(stage, 'relative', ['world', 'page', 'local', 'inner', 'frame'] as const, (name) => {
    const b = rect.getBounds('box', name === 'frame' ? frame : name);
    show(`rect.getBounds('box', ${name === 'frame' ? 'frame' : `'${name}'`})\n${box(b)}`);
  }, 1800);

  return stage.dispose;
};

export default mount;
