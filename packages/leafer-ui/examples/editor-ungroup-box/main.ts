// Editor: ungroup() leaves Box and Frame alone
import { App, Box, Group } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, actions, pair, watch } from '../../shared/editor-kit.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select the Box and ungroup, then the Group and ungroup." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const make = (): [Box, Group] => {
    const [a, b] = pair(g);
    a.set({ x: 20, y: 20, width: g.size * 0.6, height: g.size * 0.6 });
    b.set({ x: 20, y: 20, width: g.size * 0.6, height: g.size * 0.6 });
    const box = new Box({ editable: true, name: 'Box', x: g.a.x, y: g.a.y, width: g.size * 1.1, height: g.size, fill: 'rgba(50,205,121,0.3)', hitChildren: false, children: [a] });
    const group = new Group({ editable: true, name: 'Group', x: g.b.x, y: g.b.y, hitChildren: false, children: [b] });
    return [box, group];
  };
  let [box, group] = make();
  app.tree.addMany(box, group);
  watch(stage, () => 'selected: ' + app.editor.list.map((r) => r.name || r.tag).join(', '));
  const reset = (): void => {
    app.editor.cancel();
    app.tree.clear();
    [box, group] = make();
    app.tree.addMany(box, group);
  };
  actions(stage, [
    { name: 'select(box); ungroup()', run: () => (app.editor.select(box), app.editor.ungroup()) },
    { name: 'select(group); ungroup()', run: () => (app.editor.select(group), app.editor.ungroup()) },
  ], { reset, gap: 1700 });
  return stage.dispose;
};

export default mount;
