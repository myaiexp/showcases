// Editor: mergeConfig combines config with an element's editConfig
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select each rect: the right one carries editConfig { lockRatio: true, stroke }, so the merged config differs.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { lockRatio: false } }));
  const [rect1, rect2] = pair(g, {}, { editConfig: { lockRatio: true, stroke: '#e4572e' } });
  app.tree.add(rect1);
  app.tree.add(rect2);
  watch(stage, () => {
    if (!app.editor.editing) return 'select a rect';
    const { mergeConfig } = app.editor;
    return 'config.lockRatio: ' + app.editor.config.lockRatio + '\nmergeConfig.lockRatio: ' + mergeConfig.lockRatio + '\nmergeConfig.stroke: ' + mergeConfig.stroke;
  });

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      await ghost.tap(spot(rect1).x, spot(rect1).y);
      await stage.wait(1400);
      await ghost.tap(spot(rect2).x, spot(rect2).y);
      await stage.wait(1400);
    });
  }
  return stage.dispose;
};

export default mount;
