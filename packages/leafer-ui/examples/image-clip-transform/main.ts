// Appearance: image clip mode with offset, scale and rotation
import { Leafer, Rect } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { knobs } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move, scale and rotate the picture inside the box." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  const p = { x: -40, y: -90, scale: 1.1, rotation: 20 };
  const paint = (): void => {
    rect.fill = {
      type: 'image',
      url: photo(),
      mode: 'clip',
      offset: { x: p.x, y: p.y },
      scale: { x: p.scale, y: p.scale },
      rotation: p.rotation,
    };
  };
  const set = (key: keyof typeof p) => (v: number): void => ((p[key] = v), paint());
  knobs(stage, [
    { label: 'offset.x', range: [-200, 100, 1], value: -40, set: set('x'), swing: 40 },
    { label: 'offset.y', range: [-200, 100, 1], value: -90, set: set('y'), swing: 40 },
    { label: 'scale', range: [0.3, 2, 0.05], value: 1.1, set: set('scale'), swing: 0.3 },
    { label: 'rotation', range: [-90, 90, 1], value: 20, set: set('rotation'), swing: 20 },
  ]);

  return stage.dispose;
};

export default mount;
