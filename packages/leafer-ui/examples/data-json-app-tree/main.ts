// Data: an App is copied through app.tree
import { App, Ellipse, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: ['app.tree.toJSON()', 'app.tree.set({ children })'], hint: 'An App has no import or export of its own: export app.tree, import with tree.set({ children: json.children }).' });
  const [pa, pb] = stage.panes;
  const one = stage.own(new App({ view: pa!.view, ground: { fill: '#333' }, tree: {} }), pa);
  const two = stage.own(new App({ view: pb!.view, ground: { fill: '#333' }, tree: {} }), pb);
  const S = size(stage) * 0.45;
  const rect = new Rect({ x: 10, y: 20, width: S, height: S, fill: '#32cd79', draggable: true });
  one.tree.add(rect);
  one.tree.add(new Ellipse({ x: S * 0.7, y: S * 0.9, width: S, height: S, fill: '#FEB027', draggable: true }));
  const copy = (): void => {
    const json = one.tree.toJSON() as { children: unknown[] };
    two.tree.set({ children: json.children } as never);
  };
  copy();
  if (stage.bar) button(stage.bar, 'copy to the right app', copy);
  else {
    const ghost = stage.ghost(one, pa);
    script(stage, async () => {
      await ghost.drag({ x: 10 + S / 2, y: 20 + S / 2 }, { x: 25 + S / 2, y: 50 + S / 2 }, 600);
      copy();
      await stage.wait(1200);
      await ghost.drag({ x: 25 + S / 2, y: 50 + S / 2 }, { x: 10 + S / 2, y: 20 + S / 2 }, 600);
      copy();
      await stage.wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;
