// Appearance: mask path, pixel, grayscale, clipping and clipping-path
import { Leafer, Group, Ellipse, Image, type IMaskType } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cells, note, stripes } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The same mask and picture in every IMaskType." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  stripes(leafer, stage, 14);
  const types: IMaskType[] = ['path', 'pixel', 'grayscale', 'clipping', 'clipping-path'];
  const grid = cells(stage, types.length, stage.preview ? 3 : 5, 8, 0);
  grid.forEach((c, i) => {
    const s = Math.min(c.w, c.h - 18);
    const group = new Group({ x: c.x + (c.w - s) / 2, y: c.y });
    const mask = new Ellipse({
      width: s,
      height: s,
      fill: { type: 'radial', stops: ['#ffffff', '#000000'] }, // white centre to black edge
      mask: types[i]!,
    });
    const image = new Image({ width: s, height: s, url: photo(), opacity: 0.8 });
    leafer.add(group);
    group.add([mask, image]);
    note(leafer, types[i]!, c.x, c.y + s + 3, stage.preview ? 8 : 11, c.w);
  });

  return stage.dispose;
};

export default mount;
