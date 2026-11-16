// Appearance: shadow scaleFixed zoom-in beside a normal shadow
import { Leafer, Group, Rect } from 'leafer-ui';
import '@leafer-in/scale-fixed';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive } from '../../shared/shapes.ts';
import { note } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Zoom in: the right shadow keeps its size." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.55;
  const y = stage.height / 2 - S / 2 - 8;
  const world = new Group();
  leafer.add(world);
  const shadow = { x: 0, y: 5, blur: 12, color: '#000a' };
  world.add(new Rect({ x: stage.width / 2 - S * 1.3, y, width: S, height: S, fill: '#FEB027', shadow }));
  world.add(new Rect({ x: stage.width / 2 + S * 0.3, y, width: S, height: S, fill: '#FFE04B', shadow: { ...shadow, scaleFixed: 'zoom-in' } }));
  note(leafer, 'scaleFixed: false', stage.width / 2 - S * 1.3, stage.height - 22, stage.preview ? 9 : 11, S);
  note(leafer, "scaleFixed: 'zoom-in'", stage.width / 2 + S * 0.3, stage.height - 22, stage.preview ? 9 : 11, S);
  const cx = stage.width / 2;
  const cy = stage.height / 2;
  drive(stage, 'zoom', [0.6, 2.5, 0.05], 1, (k) => world.set({ scale: k, x: (1 - k) * cx, y: (1 - k) * cy }), 8);

  return stage.dispose;
};

export default mount;
