// Appearance: repeating image tiles with offset and size
import { Leafer, Rect } from 'leafer-ui';
import { arrows } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { knobs } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Shift the pattern and resize the tile." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const w = S * 1.5;
  const h = S * 0.9;
  const rect = new Rect({ x: (stage.width - w) / 2, y: (stage.height - h) / 2 - 6, width: w, height: h, cornerRadius: 8 });
  leafer.add(rect);
  const p = { x: 0, y: 0, width: 40 };
  const paint = (): void => {
    rect.fill = { type: 'image', url: arrows(), mode: 'repeat', offset: { x: p.x, y: p.y }, size: { width: p.width } };
  };
  const set = (key: keyof typeof p) => (v: number): void => ((p[key] = v), paint());
  knobs(stage, [
    { label: 'offset.x', range: [0, 60, 1], value: 20, set: set('x'), swing: 20 },
    { label: 'offset.y', range: [0, 60, 1], value: 20, set: set('y'), swing: 20 },
    { label: 'size.width', range: [20, 90, 1], value: 44, set: set('width'), swing: 16 },
  ]);

  return stage.dispose;
};

export default mount;
