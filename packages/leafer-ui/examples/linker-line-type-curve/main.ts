// Linker: lineType "curve" (the default)
import { App } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragAbout, linkBox } from '../../shared/plugin-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag a box: the connectors follow it." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect1 = linkBox(stage, 'rect1', [100, 100], { dot: 'right' });
  const rect2 = linkBox(stage, 'rect2', [100, 300]);
  const rect3 = linkBox(stage, 'rect3', [400, 200], { orange: true, dot: 'left' });
  const linker1 = new Linker({
    lineType: 'curve',
    startPoint: { id: 'rect1', point: 'right' },
    endPoint: { id: 'rect3', direction: 'left', point: 'top-left', offset: { y: stage.preview ? 8 : 18 } },
    stroke: [{ type: 'solid', color: '#000', style: { strokeWidth: 4 } }, { type: 'solid', color: '#836DFF' }],
    strokeWidth: 2,
  });
  app.tree.add(linker1); // below the boxes: like an AI workflow connector
  app.tree.add([rect1, rect2, rect3]);
  const linker2 = new Linker({
    lineType: 'curve',
    startPoint: { id: 'rect2' }, // the direction is automatic
    endPoint: { id: 'rect3' },
    endArrow: 'angle',
    stroke: '#ff4c4c',
    strokeWidth: 2,
  });
  app.tree.add(linker2); // above the boxes, with an arrow

  dragAbout(stage, app, rect3, stage.preview ? 40 : 120); // a card drags a box: the connectors follow
  return stage.dispose;
};

export default mount;
