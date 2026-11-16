// Linker: intermediate points as a number array
import { App } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragAbout, linkBox } from '../../shared/plugin-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag a box: the waypoints stay where they are." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect1 = linkBox(stage, 'rect1', [100, 100], { fixed: false });
  const rect2 = linkBox(stage, 'rect2', [100, 300], { fixed: false });
  const rect3 = linkBox(stage, 'rect3', [400, 200], { fixed: false, orange: true });
  // the connector leaves rect1, runs down to rect2's height, across, and up into rect3
  const a = rect1.x! + rect1.width! + 40;
  const b = rect3.x! - 40;
  const y = rect2.y! + rect2.height! / 2;
  const linker = new Linker({
    startPoint: { id: 'rect1', point: 'right' },
    endPoint: { id: 'rect3', point: 'left' },
    points: [a, y, b, y], // number[] is the fast form
    endArrow: 'angle',
    stroke: '#836DFF',
    strokeWidth: 2,
  });
  app.tree.add(linker);
  app.tree.add([rect1, rect2, rect3]);

  if (stage.preview) dragAbout(stage, app, rect3, 30);

  return stage.dispose;
};

export default mount;
