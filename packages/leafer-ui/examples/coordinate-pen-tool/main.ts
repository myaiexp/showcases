// Advanced: drawing lines at page coordinates
import { Leafer, DragEvent, Pen } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { fakeWheel, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to draw. Zoom (ctrl + wheel) or pan, then draw again: the line still follows the pointer.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'design',
      fill: '#333',
    }),
  );
  leafer.add({ tag: 'Text', x: u(20), y: u(20), text: 'Drag to draw a line', fill: '#999', fontSize: stage.preview ? 12 : 16 });

  const pen = new Pen();
  leafer.add(pen);

  // Press and drag to draw; after zooming or panning the new line is still accurate.
  leafer.on(DragEvent.START, (e: DragEvent) => {
    const point = e.getPagePoint(); // event -> page coordinates (same as pen.getPagePoint(e))
    pen.setStyle({ stroke: '#32cd79', strokeWidth: stage.preview ? 5 : 10, strokeCap: 'round', strokeJoin: 'round' });
    pen.moveTo(point.x, point.y);
  });
  leafer.on(DragEvent.DRAG, (e: DragEvent) => {
    const point = e.getPagePoint();
    pen.lineTo(point.x, point.y);
  });

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const at = { x: stage.width / 2, y: stage.height / 2 };
    script(stage, async () => {
      pen.clear();
      await ghost.drag({ x: u(40), y: u(90) }, { x: u(110), y: u(150) }, 600);
      for (let i = 0; i < 3; i++) (fakeWheel(leafer, { ...at, deltaY: -15, ctrlKey: true }), await stage.wait(70));
      await stage.wait(500);
      await ghost.drag({ x: u(130), y: u(60) }, { x: u(220), y: u(130) }, 800); // drawn on the zoomed view
      await stage.wait(1200);
      for (let i = 0; i < 3; i++) (fakeWheel(leafer, { ...at, deltaY: 15, ctrlKey: true }), await stage.wait(70));
      await stage.wait(1000);
    });
  }

  return stage.dispose;
};

export default mount;
