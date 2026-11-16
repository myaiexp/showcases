// Linker: point offset
import { App } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { linkBox } from '../../shared/plugin-kit.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the sliders: offset.x and offset.y." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect1 = linkBox(stage, 'rect1', [100, 100], { fixed: false });
  const rect2 = linkBox(stage, 'rect2', [100, 300], { fixed: false });
  const rect3 = linkBox(stage, 'rect3', [400, 200], { fixed: false, orange: true });
  const linker = new Linker({ startPoint: { id: 'rect1', point: 'right' }, endPoint: { id: 'rect3', direction: 'left', point: 'top-left' }, endArrow: 'arrow', stroke: '#836DFF', strokeWidth: 2 });
  app.tree.add(linker);
  app.tree.add([rect1, rect2, rect3]);
  const off = { x: 0, y: 20 };
  const apply = (): void => {
    linker.endPoint = { id: 'rect3', direction: 'left', point: 'top-left', offset: { ...off } };
  };
  drive(stage, 'offset.y', [-20, 80, 2], 20, (v) => ((off.y = v), apply()), 4);
  drive(stage, 'offset.x', [-30, 30, 2], 0, (v) => ((off.x = v), apply()), 6);

  return stage.dispose;
};

export default mount;
