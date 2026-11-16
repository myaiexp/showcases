// Editor config: hideOnSmall hides the handles of small elements
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a hideOnSmall threshold: the 30 px rect shows its handles only while it is larger than the threshold." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { hideOnSmall: 10 } }));
  const rect = solo(stage, g, { fill: '#FEB027', cornerRadius: 6 });
  rect.set({ width: 30, height: 30, x: rect.x! + (g.size - 30) / 2, y: rect.y! + (g.size - 30) / 2 });
  app.tree.add(rect);
  app.editor.select(rect);
  variants(stage, 'hideOnSmall', [10, 40, 60], (v) => tune(app)({ hideOnSmall: v }), undefined, 10);
  return stage.dispose;
};

export default mount;
