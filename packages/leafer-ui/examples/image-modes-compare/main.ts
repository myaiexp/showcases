// Appearance: image paint modes cover, fit, stretch, clip, repeat, normal
import { Leafer, Rect, type IImagePaintMode } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { cells, note } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Change the height of the boxes." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const modes: IImagePaintMode[] = ['cover', 'fit', 'stretch', 'clip', 'repeat', 'normal'];
  const grid = cells(stage, modes.length, 3, 8, 0);
  const boxes = grid.map((c, i) => {
    const mode = modes[i]!;
    const box = new Rect({
      x: c.x,
      y: c.y,
      width: c.w,
      height: c.h - 16,
      fill: { type: 'image', url: photo(), mode, ...(mode === 'repeat' ? { scale: 0.2 } : {}) },
    });
    leafer.add(box);
    note(leafer, mode, c.x, c.y + c.h - 13, stage.preview ? 9 : 11, c.w);
    return box;
  });
  drive(stage, 'height', [0.4, 1, 0.02], 1, (k) => boxes.forEach((b, i) => (b.height = (grid[i]!.h - 16) * k)), 5);

  return stage.dispose;
};

export default mount;
