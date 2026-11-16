// Interaction: widthRange and heightRange clamp editor resizing
import { App, Rect } from 'leafer-ui';
import '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select the rect and pull its corner handle as far as you like." });
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const f = stage.preview ? 0.5 : 1;
  const rect = new Rect({
    x: Math.round(stage.width * 0.25),
    y: Math.round(stage.height * 0.22),
    width: 90 * 2 * f,
    height: 80 * 2 * f,
    fill: '#32cd79',
    cornerRadius: 10,
    editable: true,
    widthRange: { min: 50 * 2 * f, max: 130 * 2 * f },
    heightRange: { min: 50 * 2 * f, max: 110 * 2 * f },
  });
  app.tree.add(rect);
  const say = label(stage, '', true);
  stage.loop(() => say('width ' + Math.round(rect.width! / (2 * f)) + ' (50 to 130)\nheight ' + Math.round(rect.height! / (2 * f)) + ' (50 to 110)'));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      rect.set({ width: 90 * 2 * f, height: 80 * 2 * f });
      await ghost.tap(rect.x! + 20, rect.y! + 20);
      await stage.wait(500);
      const corner = { x: rect.x! + rect.width!, y: rect.y! + rect.height! };
      await ghost.drag(corner, { x: corner.x + 70, y: corner.y + 60 }, 800); // too big
      await stage.wait(900);
      const c2 = { x: rect.x! + rect.width!, y: rect.y! + rect.height! };
      await ghost.drag(c2, { x: c2.x - 160, y: c2.y - 140 }, 800); // too small
      await stage.wait(900);
      await ghost.tap(8, stage.height - 8);
      await stage.wait(300);
    });
  }

  return stage.dispose;
};

export default mount;
