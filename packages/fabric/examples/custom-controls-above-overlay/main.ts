// Customization: controlsAboveOverlay draws handles over an overlay or clipPath that would hide them
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

type Cover = 'overlayColor' | 'clipPath';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The rectangle is selected. An overlay is drawn over its handles, and a canvas clipPath cuts them off; controlsAboveOverlay brings them back on top.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 180, top: 120, width: 170, height: 110, fill: '#f2b134', borderColor: '#8e44ad', cornerColor: '#8e44ad', cornerSize: 12, transparentCorners: false });
  canvas.add(rect, new Circle({ left: 180, top: 120, radius: 28, fill: '#e94b3c', selectable: false }));
  canvas.setActiveObject(rect);

  let cover: Cover = 'overlayColor';
  const apply = (): void => {
    // Both are canvas properties; only the chosen one is set at a time.
    canvas.overlayColor = cover === 'overlayColor' ? 'rgba(60,40,140,0.55)' : '';
    canvas.clipPath = cover === 'clipPath' ? new Circle({ left: 180, top: 120, radius: 88, absolutePositioned: true }) : undefined;
    say(stage.preview ? `${cover} · above ${canvas.controlsAboveOverlay}` : `${cover} · controlsAboveOverlay ${canvas.controlsAboveOverlay}`);
    canvas.requestRenderAll();
  };
  apply();

  if (stage.bar) {
    select(stage.bar, 'cover', ['overlayColor', 'clipPath'] as const, (v: Cover) => ((cover = v), apply()));
    checkbox(stage.bar, 'controlsAboveOverlay', false, (v) => ((canvas.controlsAboveOverlay = v), apply()));
  } else {
    let n = 0;
    stage.every(1300, () => {
      n++;
      cover = n % 4 < 2 ? 'overlayColor' : 'clipPath';
      canvas.controlsAboveOverlay = n % 2 === 1;
      apply();
    });
  }

  return stage.dispose;
};

export default mount;
