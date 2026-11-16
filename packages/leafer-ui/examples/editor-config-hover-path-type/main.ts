// Editor config: hoverPathType picks the outline path
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, solo, spot, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover the rect and switch hoverPathType." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { hoverPathType: 'render-path' } }));
  const rect = solo(stage, g, { fill: '#FEB027', stroke: '#32cd79', strokeWidth: stage.preview ? 8 : 16, cornerRadius: stage.preview ? 24 : 40 });
  app.tree.add(rect);
  const ghost = stage.preview ? stage.ghost(app) : null;
  variants(stage, 'hoverPathType', ['render-path', 'path', 'box', 'stroke'], (v) => tune(app)({ hoverPathType: v, hoverStyle: { stroke: '#e4572e', strokeWidth: 3 } }), ghost ? async () => {
    await ghost.glide(spot(rect).x, spot(rect).y, 400);
    await stage.wait(1300);
  } : undefined);
  return stage.dispose;
};

export default mount;
