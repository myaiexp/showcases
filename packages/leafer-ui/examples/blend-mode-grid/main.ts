// Appearance: fifteen blend modes over one picture
import { Leafer, Rect, Group, type IBlendMode } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { cells, note } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Each cell: a green circle blended over the picture." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const modes: IBlendMode[] = [
    'multiply', 'darken', 'color-burn', 'lighten', 'color-dodge', 'screen', 'overlay', 'hard-light',
    'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity',
  ];
  const grid = cells(stage, modes.length, 4, 6, 0);
  const dots = grid.map((c, i) => {
    const h = c.h - (stage.preview ? 10 : 16);
    leafer.add(new Rect({ x: c.x, y: c.y, width: c.w, height: h, fill: { type: 'image', url: photo(), mode: 'cover' } }));
    const dot = new Rect({ x: c.x + c.w * 0.3, y: c.y + h * 0.2, width: h * 0.6, height: h * 0.6, cornerRadius: h * 0.3, fill: '#32cd79', blendMode: modes[i]! });
    leafer.add(dot);
    note(leafer, modes[i]!, c.x, c.y + h + 1, stage.preview ? 7 : 11, c.w);
    return dot;
  });
  drive(stage, 'circle x', [0, 1, 0.02], 0.5, (v) => dots.forEach((d, i) => (d.x = grid[i]!.x + grid[i]!.w * (0.05 + 0.5 * v))), 6);

  return stage.dispose;
};

export default mount;
