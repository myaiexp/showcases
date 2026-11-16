// An image takes a stroke once strokeWidth is set (images default to 0)
import { Canvas, FabricImage } from 'fabric';
import type { Mount } from '@/types.ts';
import { color, select, slider } from '../../shared/controls.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const DASHES = { solid: [], dashed: [12, 6], dotted: [2, 6] } as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 220], hint: 'FabricImage starts with strokeWidth 0 (shapes start at 1), so the border only shows once it is set.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const image = new FabricImage(picture('portrait', 160, 160), { left: 160, top: 110, stroke: '#e94b3c', strokeWidth: 8 });
  canvas.add(image);

  const apply = (p: { strokeWidth?: number; stroke?: string; strokeDashArray?: number[] }): void => {
    image.set(p);
    image.setCoords();
    say(`strokeWidth ${image.strokeWidth.toFixed(0)} · stroke ${String(image.stroke)}`);
    canvas.requestRenderAll();
  };
  apply({});
  if (stage.bar) {
    slider(stage.bar, 'strokeWidth', 0, 24, 1, 8, (strokeWidth) => apply({ strokeWidth }));
    color(stage.bar, 'stroke', '#e94b3c', (stroke) => apply({ stroke }));
    select(stage.bar, 'strokeDashArray', Object.keys(DASHES) as (keyof typeof DASHES)[], (k) => apply({ strokeDashArray: [...DASHES[k]] }));
  } else {
    stage.loop((_dt, t) => apply({ strokeWidth: 12 + 10 * Math.sin(t * 1.5), strokeDashArray: Math.sin(t * 0.7) > 0 ? [12, 6] : [] }));
  }

  return stage.dispose;
};

export default mount;
