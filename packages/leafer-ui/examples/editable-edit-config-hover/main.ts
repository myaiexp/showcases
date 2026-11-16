// Interaction: editConfig with a per-element hoverStyle
import { App, Rect } from 'leafer-ui';
import '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover each rect: they outline in different colours." });
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const w = Math.round(stage.width * 0.28);
  const y = Math.round((stage.height - w) / 2 - 8);
  const left = new Rect({ x: Math.round(stage.width * 0.15), y, width: w, height: w, fill: '#FEB027', cornerRadius: [20, 0, 0, 20], editable: true, editConfig: { hoverStyle: { stroke: 'red' } } });
  const right = new Rect({ x: Math.round(stage.width * 0.57), y, width: w, height: w, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0], editable: true });
  app.tree.add([left, right]);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      ghost.leave();
      await stage.wait(500);
      await ghost.glide(left.x! + w / 2, y + w / 2, 500);
      await stage.wait(1200);
      await ghost.glide(right.x! + w / 2, y + w / 2, 700);
      await stage.wait(1200);
      ghost.leave();
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
