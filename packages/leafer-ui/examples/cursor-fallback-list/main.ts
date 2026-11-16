// Interaction: cursor as an array with an image and a named fallback
import { Leafer, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { cursorUrl } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover the circle, then drop the image cursor." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.8;
  const dot = new Ellipse({ ...mid(stage, S), width: S, height: S, fill: '#FEB027' });
  leafer.add(dot);
  const say = label(stage, '', true);
  const canvas = leafer.canvas.view as HTMLCanvasElement;
  stage.loop(() => say('canvas cursor: ' + (canvas.style.cursor || '(none)').replace(/url\([^)]*\)/, 'url(…)')));
  const ghost = stage.preview ? stage.ghost(leafer) : null;
  toggle(stage, 'image first', true, (on) => {
    dot.cursor = on ? [{ url: cursorUrl(), x: 2, y: 2 }, 'pointer'] : ['pointer'];
    ghost?.move(ghost.at.x + 1, ghost.at.y);
  }, 1600);
  if (ghost) void ghost.glide(stage.width / 2, stage.height / 2 - 8, 500);

  return stage.dispose;
};

export default mount;
