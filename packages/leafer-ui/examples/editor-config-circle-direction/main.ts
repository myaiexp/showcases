// Editor config: circleDirection and circleMargin place the rotation handle
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { drive } from '../../shared/shapes.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a side for the circle; slide its margin." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { circle: {}, circleDirection: 'bottom' } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  variants(stage, 'circleDirection', ['bottom', 'top', 'right', 'left'], (v) => tune(app)({ circleDirection: v }));
  if (stage.bar) drive(stage, 'circleMargin', [4, 50, 1], 12, (v) => tune(app)({ circleMargin: v }));
  return stage.dispose;
};

export default mount;
