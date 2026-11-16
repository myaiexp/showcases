// Linker: point as an alignment name
import { App } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { linkBox } from '../../shared/plugin-kit.ts';
import { pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick an alignment name." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect1 = linkBox(stage, 'rect1', [100, 100], { fixed: false });
  const rect2 = linkBox(stage, 'rect2', [100, 300], { fixed: false });
  const rect3 = linkBox(stage, 'rect3', [400, 200], { fixed: false, orange: true });
  const linker = new Linker({ startPoint: { id: 'rect1', point: 'right' }, endPoint: { id: 'rect3' }, endArrow: 'arrow', stroke: '#836DFF', strokeWidth: 2 });
  app.tree.add(linker);
  app.tree.add([rect1, rect2, rect3]);
  pick(stage, 'endPoint.point', ['left', 'top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'center'], (v) => (linker.endPoint = { id: 'rect3', point: v }), 1500, 'left');

  return stage.dispose;
};

export default mount;
