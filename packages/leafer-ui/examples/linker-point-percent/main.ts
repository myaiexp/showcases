// Linker: point as a percent coordinate
import { App } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { linkBox } from '../../shared/plugin-kit.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the sliders: the connection point inside the orange box." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect1 = linkBox(stage, 'rect1', [100, 100], { fixed: false });
  const rect2 = linkBox(stage, 'rect2', [100, 300], { fixed: false });
  const rect3 = linkBox(stage, 'rect3', [400, 200], { fixed: false, orange: true });
  const linker = new Linker({ startPoint: { id: 'rect1', point: 'right' }, endPoint: { id: 'rect3', point: { x: 0.5, y: 0.5, type: 'percent' } }, endArrow: 'arrow', stroke: '#836DFF', strokeWidth: 2 });
  app.tree.add(linker);
  app.tree.add([rect1, rect2, rect3]);
  const at = { x: 0.2, y: 0.5 };
  const apply = (): void => {
    linker.endPoint = { id: 'rect3', point: { x: at.x, y: at.y, type: 'percent' } };
  };
  drive(stage, 'point.x', [0, 1, 0.05], 0.2, (v) => ((at.x = v), apply()), 5, (v) => v.toFixed(2));
  drive(stage, 'point.y', [0, 1, 0.05], 0.5, (v) => ((at.y = v), apply()), 3, (v) => v.toFixed(2));

  return stage.dispose;
};

export default mount;
