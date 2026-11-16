// pick: how far from a thin line a point still hits it
import { Ellipse, Leafer, Line, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { probe } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer near the thin lines. The ring is hitRadius around the point.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const w = stage.width;
  const h = stage.height;
  const line = new Line({ x: 20, y: h * 0.35, width: w - 40, stroke: '#32cd79', strokeWidth: 2, name: 'line' });
  const tick = new Rect({ x: w * 0.7, y: h * 0.55, width: 3, height: h * 0.3, fill: '#4B8BFF', name: 'tick' });
  const ring = new Ellipse({ around: 'center', stroke: '#ff4b4b', strokeWidth: 1, hittable: false });
  leafer.add([line, tick, ring]);
  const say = label(stage, '', true);

  let radius = 0;
  let at = { x: w / 2, y: h / 2 };
  const check = (): void => {
    ring.set({ width: radius * 2 || 1, height: radius * 2 || 1, x: at.x, y: at.y });
    const hit = leafer.pick(at, { hitRadius: radius });
    say(`pick(point, { hitRadius: ${radius} }) -> ${hit.target?.name || 'nothing'}`);
    line.stroke = hit.target === line ? '#d33' : '#32cd79';
    tick.fill = hit.target === tick ? '#d33' : '#4B8BFF';
  };
  probe(stage, leafer, (p) => ((at = p), check()));
  drive(stage, 'hitRadius', [0, 30, 1], 10, (v) => ((radius = v), check()), 6, (v) => `${v} px`);
  return stage.dispose;
};

export default mount;
