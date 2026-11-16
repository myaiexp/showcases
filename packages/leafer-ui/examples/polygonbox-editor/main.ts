// PolygonBox: the docs' App form, hitChildren false so the box is selected as a unit
import { App, Ellipse } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { PolygonBox } from '@leafer-in/box';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the box (the child is not picked), then double-click it to select the circle inside.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const S = size(stage);
  const k = S / 100;
  const box = new PolygonBox({
    ...mid(stage, S * 1.3),
    width: S,
    height: S,
    sides: 5,
    fill: '#FF4B4B',
    hitChildren: false, // stops the child being picked directly; a double-click enters the group
    editable: true,
  });
  const circle = new Ellipse({ x: 60 * k, y: 60 * k, width: 50 * k, height: 50 * k, fill: '#FEB027', editable: true });
  app.tree.add(box);
  box.add(circle);

  if (stage.preview) {
    const ghost = stage.ghost(app);
    const p = { x: box.x! + 25 * k, y: box.y! + 25 * k };
    const c = { x: box.x! + 85 * k, y: box.y! + 85 * k };
    script(stage, async () => {
      await stage.wait(900);
      await ghost.tap(p.x, p.y); // selects the box, not the child
      await stage.wait(900);
      await ghost.doubleTap(c.x, c.y); // enters the box: the circle is selected
      await stage.wait(1100);
      await ghost.tap(8, 8);
      await stage.wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
