// Interaction: forcing the canvas cursor with updateCursor
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label, cycle } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover the rect, force a cursor, then release it." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.8;
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, fill: '#32cd79', cursor: 'pointer' });
  leafer.add(rect);
  const say = label(stage, '', true);
  const canvas = leafer.canvas.view as HTMLCanvasElement;
  stage.loop(() => say('canvas cursor: ' + (canvas.style.cursor || '(none)')));
  if (stage.bar) {
    button(stage.bar, "updateCursor('wait')", () => leafer.updateCursor('wait'));
    button(stage.bar, "updateCursor('crosshair')", () => leafer.updateCursor('crosshair'));
    button(stage.bar, 'updateCursor()', () => leafer.updateCursor());
  } else {
    void stage.ghost(leafer).glide(stage.width / 2, stage.height / 2 - 8, 500);
    cycle(stage, ['wait', 'crosshair', undefined] as (string | undefined)[], (v) => leafer.updateCursor(v as never), 1500);
  }

  return stage.dispose;
};

export default mount;
