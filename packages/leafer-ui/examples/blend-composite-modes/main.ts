// Appearance: source-* and destination-* modes inside normal Groups
import { Leafer, Rect, Group, type IBlendMode } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { cells, note, stripes } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The red rect is the destination, the green circle the source." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  stripes(leafer, stage, 20);
  const modes: IBlendMode[] = [
    'source-over', 'source-in', 'source-out', 'source-atop', 'destination-over',
    'destination-in', 'destination-out', 'destination-atop', 'xor', 'copy',
  ];
  const grid = cells(stage, modes.length, stage.preview ? 5 : 5, 6, 0);
  const dots = grid.map((c, i) => {
    const s = Math.min(c.w, c.h - (stage.preview ? 10 : 16));
    const group = new Group({ x: c.x + (c.w - s) / 2, y: c.y, blendMode: 'normal' }); // isolates the pair from the stripes
    group.add(new Rect({ width: s * 0.7, height: s * 0.7, fill: '#FF4B4B', cornerRadius: s * 0.1 }));
    const dot = new Rect({ x: s * 0.3, y: s * 0.3, width: s * 0.7, height: s * 0.7, fill: '#32cd79', cornerRadius: s * 0.35, blendMode: modes[i]! });
    group.add(dot);
    leafer.add(group);
    note(leafer, modes[i]!.replace('destination', 'dest'), c.x, c.y + s + 1, stage.preview ? 7 : 10, c.w);
    return { dot, s };
  });
  drive(stage, 'offset', [0, 1, 0.02], 0.4, (v) => dots.forEach(({ dot, s }) => dot.set({ x: s * 0.7 * v, y: s * 0.7 * v })), 6);

  return stage.dispose;
};

export default mount;
