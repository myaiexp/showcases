// Linker: createLinkerPoint builds a point to edit
import { App } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { centre, linkBox } from '../../shared/plugin-kit.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the slider: the offset added to the made point." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect1 = linkBox(stage, 'rect1', [100, 100], { fixed: false });
  const rect2 = linkBox(stage, 'rect2', [100, 300], { fixed: false });
  const rect3 = linkBox(stage, 'rect3', [400, 200], { fixed: false, orange: true });
  const linker = new Linker({ startPoint: { id: 'rect1', point: 'right' }, endArrow: 'arrow', stroke: '#836DFF', strokeWidth: 2 });
  app.tree.add(linker);
  app.tree.add([rect1, rect2, rect3]);

  const c = centre(rect3);
  const made = linker.createLinkerPoint({ x: c.x - rect3.width! / 2, y: c.y }, rect3); // data only: nothing assigned yet
  drive(stage, 'offset.y', [-40, 40, 2], 0, (v) => {
    linker.endPoint = { ...made, offset: { ...made.offset, y: v } }; // edit, then assign
  });

  return stage.dispose;
};

export default mount;
