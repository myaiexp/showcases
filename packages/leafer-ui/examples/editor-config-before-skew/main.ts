// Editor config: beforeSkew changes the skew amount
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Ctrl-drag the right edge, then the top edge, with the hook on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { beforeSkew({ skewX }) { return { skewX, skewY: 0 }; } } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'skewX ' + r1(rect.skewX) + '  skewY ' + r1(rect.skewY));
  variants(stage, 'beforeSkew', ['skewX only', 'free'], (v) => (restore(), tune(app)({ beforeSkew: v === 'free' ? undefined : ({ skewX }: { skewX: number }) => ({ skewX, skewY: 0 }) })), ghost ? async () => {
    await stage.wait(500);
    await pull(app, ghost, rect, [1, 0.3], [0, 26], { ctrlKey: true }, 900);
    await stage.wait(900);
  } : undefined);
  return stage.dispose;
};

export default mount;
