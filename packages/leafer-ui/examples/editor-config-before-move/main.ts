// Editor config: beforeMove changes or cancels a move
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the rect diagonally with the hook on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { beforeMove({ x }) { return { x, y: 0 }; } } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'x ' + r1(rect.x) + '  y ' + r1(rect.y));
  variants(stage, 'beforeMove', ['horizontal only', 'free'], (v) => (restore(), tune(app)({ beforeMove: v === 'free' ? undefined : ({ x }: { x: number }) => ({ x, y: 0 }) })), ghost ? async () => {
    await stage.wait(500);
    await pull(app, ghost, rect, [0.5, 0.5], [44, 30]);
    await stage.wait(900);
  } : undefined);
  return stage.dispose;
};

export default mount;
