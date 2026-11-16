// Linker: createStartPoint with snapRadius
import { App, PointerEvent } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { centre, linkBox } from '../../shared/plugin-kit.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move the pointer around the lower yellow box: the line shows the point the Linker made." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect2 = linkBox(stage, 'rect2', [100, 300], { fixed: true });
  const rect3 = linkBox(stage, 'rect3', [400, 200], { orange: true, fixed: true });
  const linker = new Linker({ startPoint: { id: 'rect2' }, endPoint: { id: 'rect3' }, endArrow: 'arrow', stroke: '#836DFF', strokeWidth: 2 });
  app.tree.add(linker);
  app.tree.add([rect2, rect3]);
  const say = label(stage, '', true);

  const follow = (world: { x: number; y: number }): void => {
    // snap to a direction point of rect2; farther than snapRadius (in the box's own coordinates) adds an offset
    const point = linker.createStartPoint(world, rect2, { snapRadius: 10 });
    say(JSON.stringify(point, (_k, v: unknown) => (typeof v === 'number' ? Math.round(v) : v)));
  };
  const c = centre(rect2);
  follow({ x: c.x + rect2.width!, y: c.y });
  if (stage.bar) app.tree.on(PointerEvent.MOVE, (e: PointerEvent) => follow(e));
  else {
    const r = rect2.width! * 0.8;
    stage.loop((_dt, t) => follow({ x: c.x + Math.cos(t) * r, y: c.y + Math.sin(t) * r }));
  }

  return stage.dispose;
};

export default mount;
