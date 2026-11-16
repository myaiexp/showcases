// Interaction: pixel-level hit testing on an SVG image with transparent corners
import { Leafer, Image, Platform, type IHitType } from 'leafer-ui';
import { LEAF_SVG } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';
import { tryDrag, tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag from the very corner of the badge with each setting." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.9;
  const home = { x: Math.round(stage.width * 0.18), y: Math.round((stage.height - S) / 2 - 8) };
  const say = label(stage, '', true);
  const image = new Image({ ...home, width: S, height: S, url: Platform.toURL(LEAF_SVG, 'svg'), draggable: true });
  leafer.add(image);
  const apply = (v: IHitType): void => {
    image.hitFill = v;
    say("hitFill = '" + v + "'");
  };
  apply('path');
  if (stage.bar) select(stage.bar, 'hitFill', ['path', 'pixel'] as IHitType[], apply, 'path');
  else {
    const ghost = stage.ghost(leafer);
    const corner = { x: home.x + S * 0.04, y: home.y + S * 0.04 }; // the transparent corner of the badge
    tour(stage, ['path', 'pixel'] as IHitType[], async (v) => {
      apply(v);
      const moved = await tryDrag(stage, ghost, image, home, corner, { x: corner.x + stage.width * 0.35, y: corner.y });
      say("hitFill = '" + v + "'" + (moved ? '\nthe empty corner dragged it' : '\nthe empty corner was ignored'));
      await stage.wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
