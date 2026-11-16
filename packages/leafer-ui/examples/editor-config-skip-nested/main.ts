// Editor config: skipNested drops elements nested in other selected ones
import { App, Group } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, pair, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Toggle skipNested and read the selection list." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { skipNested: true } }));
  const [rect1, rect2] = pair(g);
  const group = new Group({ editable: true, name: 'Group', hitChildren: false, children: [rect1] });
  app.tree.addMany(group, rect2);
  watch(stage, () => 'list: ' + app.editor.list.map((r) => r.name).join(', '));
  variants(stage, 'skipNested', [true, false], (v) => (app.editor.cancel(), tune(app)({ skipNested: v }), app.editor.select([group, rect1, rect2])), undefined, true);
  return stage.dispose;
};

export default mount;
