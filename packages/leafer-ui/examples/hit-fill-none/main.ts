// Interaction: hitFill none so only the stroke is draggable
import { Leafer, Rect, type IHitType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';
import { tryDrag, tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag from the middle and from the edge with hitFill path and none." });
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
    fill: '#FEB02730',
    stroke: { type: 'radial', stops: [{ offset: 0, color: '#FF4A2C' }, { offset: 1, color: '#FEB027' }] },
    strokeWidth: 14,
    draggable: true,
  });
  leafer.add(rect);
  const apply = (v: IHitType): void => {
    rect.hitFill = v;
    say("hitFill = '" + v + "'");
  };
  apply('none');
  if (stage.bar) select(stage.bar, 'hitFill', ['path', 'none'] as IHitType[], apply, 'none');
  else {
    const ghost = stage.ghost(leafer);
    const edge = { x: c.x, y: home.y + 6 };
    tour(stage, ['path', 'none'] as IHitType[], async (v) => {
      apply(v);
      const middle = await tryDrag(stage, ghost, rect, home, c, to);
      const stroke = await tryDrag(stage, ghost, rect, home, edge, { x: edge.x + stage.width * 0.35, y: edge.y });
      say("hitFill = '" + v + "'\nmiddle: " + (middle ? 'drags' : 'ignored') + ', stroke: ' + (stroke ? 'drags' : 'ignored'));
      await stage.wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
