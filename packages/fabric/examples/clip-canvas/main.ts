// canvas.clipPath clips everything the canvas draws, and follows zoom and pan
import { Canvas, Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { CLIP_SHAPES, clipShape, type ClipShape } from '../../shared/clip.ts';
import { quad } from '../../shared/clip.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 240], hint: 'The clip path belongs to the canvas, not to the object: drag the group and it slides under the clip. Zoom moves the clip too.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const group = quad(150, 120);
  canvas.add(group);

  // canvas.clipPath sits in the scene plane (zoom and pan apply), measured from its own centre in v7
  const setShape = (kind: ClipShape): void => {
    canvas.clipPath = clipShape(kind, 200, { left: 150, top: 120 });
    say(`canvas.clipPath = ${canvas.clipPath.type}`);
    canvas.requestRenderAll();
  };
  setShape('circle');

  const base = canvas.getZoom();
  const zoom = (k: number): void => {
    canvas.zoomToPoint(new Point(stage.width / 2, stage.height / 2), base * k);
    canvas.requestRenderAll();
  };
  if (stage.bar) {
    select(stage.bar, 'shape', CLIP_SHAPES, setShape);
    slider(stage.bar, 'zoom', 0.5, 2, 0.05, 1, zoom, (v) => `${v.toFixed(2)}x`);
  } else {
    stage.loop((_dt, t) => {
      zoom(1 + Math.sin(t * 1.2) * 0.35);
      group.set({ left: 150 + Math.sin(t * 0.8) * 60, top: 120 + Math.cos(t * 1.1) * 30 });
      group.setCoords();
    });
  }
  return stage.dispose;
};

export default mount;
