// dragBoundsType: an element kept inside a box or kept covering it
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag each square. Small one: stays inside the box ("outer"); big one: keeps covering it ("inner"). "auto" picks by size.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const w = stage.width;
  const h = stage.height;
  const bounds = { x: w * 0.3, y: h * 0.25, width: w * 0.4, height: h * 0.4 };
  const outline = new Rect({ ...bounds, stroke: '#d33', strokeWidth: 2, dashPattern: [5, 4], hittable: false });
  const small = new Rect({ x: bounds.x + 4, y: bounds.y + 4, width: w * 0.12, height: w * 0.12, fill: '#32cd79', draggable: true, dragBounds: bounds });
  const big = new Rect({ x: bounds.x - 20, y: bounds.y - 20, width: bounds.width + 40, height: bounds.height + 40, fill: 'rgba(75,139,255,0.45)', draggable: true, dragBounds: bounds });
  leafer.add([big, small, outline]);
  const say = label(stage, '', true);

  pick(stage, 'dragBoundsType', ['auto', 'outer', 'inner'] as const, (t) => {
    small.dragBoundsType = t;
    big.dragBoundsType = t;
    say(`dragBoundsType: '${t}'`);
  }, 4200);

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      const c = (r: Rect): { x: number; y: number } => ({ x: r.worldBoxBounds.x + r.worldBoxBounds.width / 2, y: r.worldBoxBounds.y + r.worldBoxBounds.height / 2 });
      await ghost.drag(c(small), { x: 10, y: h - 10 }, 700);
      await ghost.drag({ x: big.worldBoxBounds.x + 8, y: big.worldBoxBounds.y + 8 }, { x: w - 20, y: h - 20 }, 700);
      await stage.wait(300);
    });
  }
  return stage.dispose;
};

export default mount;
