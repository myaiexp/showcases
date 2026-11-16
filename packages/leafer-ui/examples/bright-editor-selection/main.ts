// Appearance: editor bright and dimOthers as a number
import { App, Rect } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/bright'; // dim, dimskip and bright
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click a rect: it rises on top and the rest fade to 0.2." });
  const app = stage.own(new App({ view: stage.view, editor: { bright: true, dimOthers: 0.2 } }));
  const k = stage.preview ? 0.55 : 1;
  const ox = (stage.width - 320 * k) / 2;
  const oy = (stage.height - 150 * k) / 2 - 8;
  const at = (x: number, y: number) => ({ x: ox + (x - 100) * k, y: oy + (y - 100) * k, width: 100 * k, height: 100 * k });
  const a = new Rect({ ...at(100, 100), editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] });
  const b = new Rect({ ...at(260, 150), editable: true, fill: '#32cd79' });
  const c = new Rect({ ...at(320, 100), editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] });
  app.tree.add([a, b, c]);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      await stage.wait(500);
      await ghost.tap(b.x! + 8 * k, b.y! + 80 * k); // the part of the green rect the yellow one covers
      await stage.wait(1500);
      await ghost.tap(10, stage.height - 10);
      await stage.wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
