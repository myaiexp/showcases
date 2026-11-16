// Interaction: hitStroke on a wide outside stroke
import { Leafer, Rect, type IHitType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';
import { tryDrag, tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the rect by its stroke band with each setting." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.7;
  const home = { x: Math.round(stage.width * 0.18), y: Math.round((stage.height - S) / 2 - 6) };
  const c = { x: home.x + S / 2, y: home.y + S / 2 };
  const to = { x: c.x + stage.width * 0.35, y: c.y };
  const say = label(stage, '', true);
  const rect = new Rect({ ...home, width: S, height: S, fill: '#FEB027', stroke: '#1d2b53', strokeWidth: 20, strokeAlign: 'outside', draggable: true });
  leafer.add(rect);
  const apply = (v: IHitType): void => {
    rect.hitStroke = v;
    say("hitStroke = '" + v + "'");
  };
  apply('path');
  if (stage.bar) select(stage.bar, 'hitStroke', ['path', 'none', 'all'] as IHitType[], apply, 'path');
  else {
    const ghost = stage.ghost(leafer);
    const band = { x: c.x, y: home.y - 10 }; // inside the outside stroke
    tour(stage, ['path', 'none', 'all'] as IHitType[], async (v) => {
      apply(v);
      const moved = await tryDrag(stage, ghost, rect, home, band, { x: band.x + stage.width * 0.35, y: band.y });
      say("hitStroke = '" + v + "'" + (moved ? '\nthe stroke dragged it' : '\nthe stroke ignored the drag'));
      await stage.wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
