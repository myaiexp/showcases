// Linker: create a connector by dragging
import { App, Box, DragEvent, Ellipse, LeafList, type ILinkerPointData } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { centre, linkBox } from '../../shared/plugin-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag from a violet dot to another box; drop in empty space and it dangles." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect1 = linkBox(stage, 'rect1', [100, 100], { fixed: true });
  const rect2 = linkBox(stage, 'rect2', [100, 300], { fixed: true });
  const rect3 = linkBox(stage, 'rect3', [400, 200], { fixed: true, orange: true });
  app.tree.add([rect1, rect2, rect3]);
  const made: Linker[] = []; // connectors the reader (or the card) created

  const d = stage.preview ? 6 : 8;
  const dot = (box: Box, x: number, y: number, data: ILinkerPointData): Ellipse => {
    const point = new Ellipse({ x, y, width: d, height: d, around: 'center', fill: '#836DFF', stroke: '#000', strokeWidth: 1, cursor: 'cell', data });
    box.add(point);
    listenAdd(point);
    return point;
  };
  const pointA = dot(rect1, rect1.width! - d, rect1.height! / 2, { id: 'rect1', point: 'right' });
  const pointC = dot(rect3, d, rect3.height! / 5, { id: 'rect3', point: 'top-left', offset: { y: rect3.height! * 0.3 } });

  app.tree.add(
    new Linker({ startPoint: { id: 'rect2' }, endPoint: { id: 'rect3' }, stroke: '#ff4c4c', strokeWidth: 2, endArrow: 'angle' }), // an existing one
  );

  function listenAdd(point: Ellipse): void {
    let linker: Linker;
    point.on(DragEvent.START, (e: DragEvent) => {
      e.stop(); // do not drag the box
      linker = new Linker({ startPoint: { ...(point.data as ILinkerPointData) }, stroke: '#836DFF', strokeWidth: 2, endArrow: 'angle' });
      made.push(linker);
      app.tree.add(linker);
    });
    point.on(DragEvent.DRAG, (e: DragEvent) => {
      // pick by hand, skipping this connector and the box that owns the dot
      const picked = app.tree.pick(e, { exclude: new LeafList([linker, point.parent as Box]) });
      const target = picked.path?.list.find((item) => item.id);
      linker.endPoint = linker.createEndPoint(e, target); // snaps to the element's edge; mode: 'four' | 'auto' | 'free' change that
    });
  }

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      await stage.wait(500);
      await ghost.drag(centre(pointA), centre(rect2), 1000);
      await stage.wait(700);
      await ghost.drag(centre(pointC), centre(rect1), 1000);
      await stage.wait(1200);
      for (const l of made.splice(0)) l.remove(); // start over
    });
  }

  return stage.dispose;
};

export default mount;
