// Editor config: rectThrough lets clicks pass through the edit box
import { App, Rect } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, spot, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click the small rect inside the selected big one, with rectThrough on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { rectThrough: true } }));
  const bigSize = Math.round(g.size * 1.6);
  const bx = Math.round((stage.width - bigSize) / 2);
  const by = Math.round((stage.height - bigSize) / 2) - 4;
  const big = Rect.one({ editable: true, name: 'big', fill: '#FFE04B', cornerRadius: 10 }, bx, by, bigSize, bigSize);
  const small = Rect.one({ editable: true, name: 'small', fill: '#FEB027', cornerRadius: 8 }, bx + bigSize / 2 - g.size / 4, by + bigSize / 2 - g.size / 4, g.size / 2, g.size / 2);
  app.tree.addMany(big, small);
  watch(stage, () => 'selected: ' + (app.editor.list.map((r) => r.name).join(' ') || 'none'));
  const ghost = stage.preview ? stage.ghost(app) : null;
  variants(stage, 'rectThrough', [true, false], (v) => (app.editor.select(big), tune(app)({ rectThrough: v })), ghost ? async () => {
    await stage.wait(500);
    await ghost.tap(spot(small).x, spot(small).y);
    await stage.wait(1300);
  } : undefined);
  return stage.dispose;
};

export default mount;
