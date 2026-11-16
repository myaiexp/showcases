// Customization: hasControls and hasBorders switch an object's handles and frame off
import { Canvas, Circle, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Select a shape, then tick the boxes. A shape with no controls can still be moved; with no borders either it just shows nothing.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 80, top: 120, width: 80, height: 80, fill: '#e94b3c' });
  const circle = new Circle({ left: 180, top: 120, radius: 40, fill: '#3b7dd8' });
  const tri = new Triangle({ left: 280, top: 120, width: 80, height: 80, fill: '#2e9e5b' });
  canvas.add(rect, circle, tri);

  const shapes = [rect, circle, tri];
  const show = (): void => {
    say(
      shapes
        .map((s) => (stage.preview ? `${s.type}: borders ${s.hasBorders ? 'on' : 'off'}, controls ${s.hasControls ? 'on' : 'off'}` : `${s.type}: hasBorders ${s.hasBorders}, hasControls ${s.hasControls}`))
        .join('\n'),
    );
    canvas.requestRenderAll();
  };
  // The guide's two snippets, one per shape: no borders, no controls, neither.
  rect.hasBorders = false;
  circle.hasControls = false;
  tri.set({ hasBorders: false, hasControls: false });
  show();

  if (stage.bar) {
    const row = (name: string, s: (typeof shapes)[number]): void => {
      checkbox(stage.bar!, `${name} hasBorders`, s.hasBorders, (v) => ((s.hasBorders = v), show()));
      checkbox(stage.bar!, `${name} hasControls`, s.hasControls, (v) => ((s.hasControls = v), show()));
    };
    row('rect', rect);
    row('circle', circle);
    row('triangle', tri);
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      for (const s of shapes) {
        await ghost.click(s.getCenterPoint());
        await stage.wait(900);
      }
      canvas.discardActiveObject();
    }, 200);
  }

  return stage.dispose;
};

export default mount;
