// Interaction: hitFill all on a Rect that has only a stroke
import { Leafer, Rect, type IHitType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';
import { tryDrag, tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag from the middle with hitFill path, then with all." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.7;
  const home = { x: Math.round(stage.width * 0.18), y: Math.round((stage.height - S) / 2 - 6) };
  const c = { x: home.x + S / 2, y: home.y + S / 2 };
  const to = { x: c.x + stage.width * 0.35, y: c.y };
  const say = label(stage, '', true);
  const rect = new Rect({
    ...home,
    width: S,
    height: S,
    stroke: { type: 'linear', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] },
    strokeWidth: 10,
    draggable: true,
  });
  leafer.add(rect);
  const apply = (v: IHitType): void => {
    rect.hitFill = v;
    say("hitFill = '" + v + "'");
  };
  apply('path');
  if (stage.bar) select(stage.bar, 'hitFill', ['path', 'all'] as IHitType[], apply, 'path');
  else {
    const ghost = stage.ghost(leafer);
    tour(stage, ['path', 'all'] as IHitType[], async (v) => {
      apply(v);
      const moved = await tryDrag(stage, ghost, rect, home, c, to);
      say("hitFill = '" + v + "'" + (moved ? '\nthe middle dragged it' : '\nthe middle ignored the drag'));
      await stage.wait(1000);
    });
  }

  return stage.dispose;
};

export default mount;
