// Appearance: strokeScaleFixed true, zoom-in, a threshold, and false
import { Leafer, Group, Rect } from 'leafer-ui';
import '@leafer-in/scale-fixed';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive } from '../../shared/shapes.ts';
import { note } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Zoom the Group: only the last rect's stroke grows with it." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.42;
  const gap = S * 0.28;
  const total = S * 4 + gap * 3;
  const x0 = (stage.width - total) / 2;
  const y = stage.height / 2 - S / 2 - 12;
  const modes: (boolean | 'zoom-in' | number)[] = [true, 'zoom-in', 0.5, false];
  const world = new Group();
  leafer.add(world);
  modes.forEach((m, i) => {
    world.add(new Rect({ x: x0 + i * (S + gap), y, width: S, height: S, fill: '#FEB02755', stroke: '#1d2b53', strokeWidth: 5, strokeScaleFixed: m }));
    note(leafer, String(m), x0 + i * (S + gap) - gap / 2, stage.height - 22, stage.preview ? 9 : 11, S + gap);
  });
  const cx = stage.width / 2;
  const cy = stage.height / 2;
  drive(stage, 'zoom', [0.3, 3, 0.05], 1, (k) => world.set({ scale: k, x: (1 - k) * cx, y: (1 - k) * cy }), 8);

  return stage.dispose;
};

export default mount;
