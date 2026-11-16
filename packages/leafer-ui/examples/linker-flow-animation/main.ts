// Linker: dashes flowing along a connector
import { App } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import '@leafer-in/animate'; // the flowing dashes
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
    startPoint: { id: 'rect1', point: 'right' },
    endPoint: { id: 'rect3', direction: 'left', point: 'top-left', offset: { y: stage.preview ? 8 : 18 } },
    stroke: '#836DFF',
    strokeWidth: 2,
    dashPattern: [10, 10],
    dashOffset: 0,
    animation: { style: { dashOffset: -20 }, easing: 'linear', duration: 0.5, loop: true }, // reverse: true flows backwards
  });
  app.tree.add(linker1);
  app.tree.add([rect1, rect2, rect3]);
  const linker2 = new Linker({
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
