// Appearance: Group blendMode pass-through or normal isolates children
import { Leafer, Rect, Group } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { stripes, note } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The same multiply rect, with and without an isolating Group." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  stripes(leafer, stage, 20);
  const s = Math.min(stage.width * 0.32, stage.height * 0.55);
  const y = (stage.height - s) / 2 - 10;
  const make = (x: number, blendMode: 'pass-through' | 'normal'): Rect => {
    const group = new Group({ x, y, blendMode });
    group.add(new Rect({ width: s, height: s, fill: '#FEB027', cornerRadius: s * 0.15 }));
    const top = new Rect({ x: s * 0.4, width: s, height: s, fill: '#2b8cff', blendMode: 'multiply', cornerRadius: s * 0.15 });
    group.add(top);
    leafer.add(group);
    note(leafer, "Group: '" + blendMode + "'", x - s * 0.1, stage.height - 24, stage.preview ? 9 : 12, s * 1.7);
    return top;
  };
  const a = make(stage.width * 0.08, 'pass-through');
  const b = make(stage.width * 0.55, 'normal');
  drive(stage, 'blue x', [0.3, 1, 0.02], 0.5, (v) => ((a.x = s * v), (b.x = s * v)), 6);

  return stage.dispose;
};

export default mount;
