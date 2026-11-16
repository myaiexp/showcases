// DragEvent: a rubber-band rectangle made from getPageBounds
import { DragEvent, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag on the empty paper to draw a box. The view is zoomed 1.4x, so page and world coordinates differ.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  leafer.scale = 1.4;
  const band = new Rect({ stroke: '#4B8BFF', strokeWidth: 1.5, fill: 'rgba(75,139,255,0.15)', visible: false, hittable: false });
  leafer.add(band);
  const say = label(stage, 'drag to draw', true);

  leafer.on(DragEvent.START, () => (band.visible = true));
  leafer.on(DragEvent.DRAG, (e: DragEvent) => {
    const b = e.getPageBounds(); // the drag area in page coordinates
    band.set(b);
    say(`getPageBounds() x ${Math.round(b.x)} y ${Math.round(b.y)} w ${Math.round(b.width)} h ${Math.round(b.height)}`);
  });
  leafer.on(DragEvent.END, () => stage.after(500, () => (band.visible = false)));

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: 40, y: 40 }, { x: stage.width - 50, y: stage.height - 50 }, 900);
      await stage.wait(1000);
      await ghost.drag({ x: stage.width - 40, y: 30 }, { x: 70, y: stage.height - 60 }, 900);
      await stage.wait(1000);
    });
  }
  return stage.dispose;
};

export default mount;
