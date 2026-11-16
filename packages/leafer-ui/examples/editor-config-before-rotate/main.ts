// Editor config: beforeRotate changes the rotation amount
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Ctrl-drag a corner handle with the hook on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { beforeRotate({ rotation }) { return rotation / 3; } } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'rotation ' + r1(rect.rotation));
  variants(stage, 'beforeRotate', ['one third', 'as dragged'], (v) => (restore(), tune(app)({ beforeRotate: v === 'as dragged' ? undefined : ({ rotation }: { rotation: number }) => rotation / 3 })), ghost ? async () => {
    await stage.wait(500);
    await pull(app, ghost, rect, [1, 1], [-30, 34], { ctrlKey: true }, 1100);
    await stage.wait(900);
  } : undefined);
  return stage.dispose;
};

export default mount;
