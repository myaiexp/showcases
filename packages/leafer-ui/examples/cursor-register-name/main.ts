// Interaction: Cursor.set registers a custom cursor name
import { Leafer, Rect, Ellipse, Cursor } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { cursorUrl } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover both shapes: they share one registered cursor name." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  // page-wide registry: a unique name, set again harmlessly by a second mount
  Cursor.set('showcase-badge', { url: cursorUrl(), x: 2, y: 2 });
  const S = size(stage) * 0.6;
  const y = (stage.height - S) / 2 - 8;
  const rect = new Rect({ x: stage.width / 2 - S * 1.2, y, width: S, height: S, fill: '#32cd79', cursor: 'showcase-badge' });
  const dot = new Ellipse({ x: stage.width / 2 + S * 0.2, y, width: S, height: S, fill: '#FEB027', cursor: 'showcase-badge' });
  leafer.add([rect, dot]);
  const say = label(stage, '', true);
  const canvas = leafer.canvas.view as HTMLCanvasElement;
  stage.loop(() => say("cursor: 'showcase-badge'\ncanvas cursor: " + (canvas.style.cursor || '(none)').replace(/url\([^)]*\)/, 'url(…)')));
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    stage.every(2400, () => void ghost.glide(Math.random() < 0.5 ? rect.x! + S / 2 : dot.x! + S / 2, y + S / 2, 600));
    void ghost.glide(rect.x! + S / 2, y + S / 2, 600);
  }

  return stage.dispose;
};

export default mount;
