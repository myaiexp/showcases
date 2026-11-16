// Linker: startNode, endNode, startData and endData
import { App } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { linkBox } from '../../shared/plugin-kit.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the orange box round the yellow one: the resolved direction changes." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect1 = linkBox(stage, 'rect1', [100, 100], { fixed: false });
  const rect2 = linkBox(stage, 'rect2', [100, 300], { fixed: false });
  const rect3 = linkBox(stage, 'rect3', [400, 200], { fixed: false, orange: true });
  const linker = new Linker({ startPoint: { id: 'rect2' }, endPoint: { id: 'rect3' }, endArrow: 'angle', stroke: '#ff4c4c', strokeWidth: 2 });
  app.tree.add(linker);
  app.tree.add([rect1, rect2, rect3]);
  const say = label(stage, '');
  const r = (n: number): number => Math.round(n);
  stage.loop(() => {
    const { startNode, endNode, startData, endData } = linker; // read-only, set once the connector has laid out
    if (!startNode || !endNode) return;
    say(
      `startNode ${startNode.id}  startData: auto ${startData.auto}, direction ${startData.direction}, point ${r(startData.point.x)},${r(startData.point.y)}\n` +
        `endNode   ${endNode.id}  endData:   auto ${endData.auto}, direction ${endData.direction}, point ${r(endData.point.x)},${r(endData.point.y)}`,
    );
  });

  return stage.dispose;
};

export default mount;
