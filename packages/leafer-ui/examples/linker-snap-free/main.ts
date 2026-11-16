// Linker: createEndPoint mode "free"
import { App, PointerEvent } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { centre, linkBox } from '../../shared/plugin-kit.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move the pointer around the orange box: the connector's end can land inside the box." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect1 = linkBox(stage, 'rect1', [100, 100], { dot: 'right', fixed: true });
  const rect3 = linkBox(stage, 'rect3', [400, 200], { orange: true, fixed: true, size: 140 });
  const linker = new Linker({ startPoint: { id: 'rect1', point: 'right' }, endArrow: 'arrow', stroke: '#836DFF', strokeWidth: 2 });
  app.tree.add(linker);
  app.tree.add([rect1, rect3]);
  label(stage, "linker.createEndPoint(pointer, rect3, { mode: 'free' })", true);

  const follow = (world: { x: number; y: number }): void => {
    linker.createEndPoint(world, rect3, { mode: 'free' }); // the Linker sets its own endPoint
  };
  const c = centre(rect3);
  follow({ x: c.x - rect3.width!, y: c.y }); // start with the point to the left
  if (stage.bar) app.tree.on(PointerEvent.MOVE, (e: PointerEvent) => follow(e));
  else {
    // A card sends the point round and through the box.
    const r = rect3.width! * 0.5;
    stage.loop((_dt, t) => follow({ x: c.x + Math.cos(t * 0.8) * r * (1.1 + 0.9 * Math.sin(t * 0.3)), y: c.y + Math.sin(t * 0.8) * r * (1.1 + 0.9 * Math.sin(t * 0.3)) }));
  }

  return stage.dispose;
};

export default mount;
