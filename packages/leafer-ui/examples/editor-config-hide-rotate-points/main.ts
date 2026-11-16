// Editor config: hideRotatePoints removes the rotate hot spots
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, r1, solo, spot, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag from just outside a corner with hideRotatePoints on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { hideRotatePoints: false } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'rotation ' + r1(rect.rotation));
  variants(stage, 'hideRotatePoints', [false, true], (v) => (restore(), tune(app)({ hideRotatePoints: v })), ghost ? async () => {
    await stage.wait(500);
    const c = spot(rect, 1, 1);
    await ghost.drag({ x: c.x + 9, y: c.y + 9 }, { x: c.x - 10, y: c.y + 40 }, 1000);
    await stage.wait(900);
  } : undefined);
  return stage.dispose;
};

export default mount;
