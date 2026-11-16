// Editor config: dragLimitAnimate eases a dragBounds element back
import { App, Frame, Rect } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, pull, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the rect out of the frame and let go, with dragLimitAnimate off and on." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { dragLimitAnimate: false } }));
  const w = stage.preview ? 170 : 360;
  const h = stage.preview ? 120 : 260;
  const rect = Rect.one({ editable: true, fill: '#FEB027', cornerRadius: 12, dragBounds: 'parent' }, 20, 20, g.size, g.size);
  const frame = Frame.one({ fill: '#ffffff', stroke: '#bbb', strokeWidth: 1, children: [rect] }, Math.round((stage.width - w) / 2), Math.round((stage.height - h) / 2) - 4, w, h);
  app.tree.add(frame);
  app.editor.select(rect);
  const ghost = stage.preview ? stage.ghost(app) : null;
  variants(stage, 'dragLimitAnimate', [false, true], (v) => (rect.set({ x: 20, y: 20 }), tune(app)({ dragLimitAnimate: v })), ghost ? async () => {
    await stage.wait(400);
    await pull(app, ghost, rect, [0.5, 0.5], [110, 50], undefined, 1000);
    await stage.wait(1200);
  } : undefined);
  return stage.dispose;
};

export default mount;
