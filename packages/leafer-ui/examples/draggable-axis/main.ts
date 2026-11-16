// Interaction: draggable on both axes, only x, or only y
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label, GREEN } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';
import { tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the square diagonally with each setting." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const home = { x: Math.round((stage.width - S) / 2), y: Math.round((stage.height - S) / 2 - 8) };
  const rect = new Rect({ ...home, width: S, height: S, fill: GREEN, cornerRadius: 8, draggable: true });
  leafer.add(rect);
  const say = label(stage, '', true);
  const apply = (v: string): void => {
    rect.draggable = v === 'true' ? true : (v as 'x' | 'y');
    say('draggable = ' + (v === 'true' ? 'true' : "'" + v + "'"));
  };
  apply('true');
  if (stage.bar) select(stage.bar, 'draggable', ['true', 'x', 'y'], apply, 'true');
  else {
    const ghost = stage.ghost(leafer);
    const c = { x: home.x + S / 2, y: home.y + S / 2 };
    tour(stage, ['true', 'x', 'y'], async (v) => {
      apply(v);
      rect.set(home);
      await stage.wait(300);
      await ghost.drag(c, { x: c.x + 50, y: c.y + 40 }, 700);
      await stage.wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
