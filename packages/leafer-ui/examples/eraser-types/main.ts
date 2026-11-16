// Appearance: eraser pixel versus path with a see-through eraser
import { Leafer, Group, Ellipse, Image, type IEraserType } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { cells, note, stripes } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Lower the eraser opacity: only the pixel eraser follows it." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  stripes(leafer, stage, 16);
  const types: IEraserType[] = ['pixel', 'path'];
  const grid = cells(stage, 2, 2, 10, 0);
  const erasers = grid.map((c, i) => {
    const s = Math.min(c.w, c.h - 20);
    const group = new Group({ x: c.x + (c.w - s) / 2, y: c.y });
    const image = new Image({ width: s, height: s, cornerRadius: s * 0.3, url: photo() });
    const eraser = new Ellipse({ x: s * 0.15, y: s * 0.15, width: s * 0.7, height: s * 0.7, innerRadius: 0.5, fill: 'black', opacity: 0.5, eraser: types[i]! });
    leafer.add(group);
    group.add([image, eraser]);
    note(leafer, "eraser: '" + types[i] + "'", c.x, c.y + s + 4, stage.preview ? 9 : 11, c.w);
    return eraser;
  });
  drive(stage, 'eraser.opacity', [0.1, 1, 0.05], 0.5, (v) => erasers.forEach((e) => (e.opacity = v)), 5);

  return stage.dispose;
};

export default mount;
