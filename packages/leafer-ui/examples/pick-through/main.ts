// pick: the target and the whole stack of elements below the point
import { Ellipse, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { probe } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three shapes overlap. With through on, pick() lists all of them under the point, not just the top one.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const w = stage.width;
  const h = stage.height;
  const s = Math.min(h * 0.6, w * 0.4);
  const shapes = [
    new Rect({ name: 'back', x: w * 0.12, y: h * 0.12, width: s, height: s, fill: 'rgba(75,139,255,0.5)' }),
    new Ellipse({ name: 'middle', x: w * 0.3, y: h * 0.2, width: s, height: s, fill: 'rgba(50,205,121,0.55)' }),
    new Rect({ name: 'front', x: w * 0.45, y: h * 0.1, width: s, height: s * 0.8, cornerRadius: 12, fill: 'rgba(254,176,39,0.6)' }),
  ];
  leafer.add(shapes);
  const say = label(stage, '', true);

  let through = true;
  let at = { x: w / 2, y: h / 2 };
  const check = (): void => {
    const result = leafer.pick(at, { through });
    const list = result.throughPath ? (result.throughPath.list as { name?: string }[]).filter((l) => l.name) : [];
    for (const sh of shapes) sh.opacity = result.throughPath?.has(sh) || result.target === sh ? 1 : 0.35;
    say(`target: ${result.target?.name || 'none'}\nthroughPath: ${through ? list.map((l) => l.name).join(', ') || '(empty)' : '(not asked for)'}`);
  };
  probe(stage, leafer, (p) => ((at = p), check()));
  toggle(stage, 'through', true, (v) => ((through = v), check()), 3200);
  return stage.dispose;
};

export default mount;
