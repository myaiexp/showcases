// Interaction: hittable false disables dragging an element
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label, GREEN } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';
import { tryDrag, tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the rect, then untick hittable and try again." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.7;
  const home = { x: Math.round(stage.width * 0.18), y: Math.round((stage.height - S) / 2 - 6) };
  const c = { x: home.x + S / 2, y: home.y + S / 2 };
  const to = { x: c.x + stage.width * 0.35, y: c.y };
  const say = label(stage, '', true);
  const rect = new Rect({ ...home, width: S, height: S, fill: GREEN, cornerRadius: 12, draggable: true });
  leafer.add(rect);
  const apply = (on: boolean): void => {
    rect.hittable = on;
    say('hittable = ' + on);
  };
  apply(true);
  if (stage.bar) checkbox(stage.bar, 'hittable', true, apply);
  else {
    const ghost = stage.ghost(leafer);
    tour(stage, [true, false], async (on) => {
      apply(on);
      const moved = await tryDrag(stage, ghost, rect, home, c, to);
      say('hittable = ' + on + (moved ? '\nthe drag moved it' : '\nthe drag did nothing'));
      await stage.wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
