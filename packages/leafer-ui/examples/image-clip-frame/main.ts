// Appearance: image clip mode with a clipSize frame and offset
import { Leafer, Rect } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { knobs } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Shrink the frame to zoom in; move it with offset." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  const p = { frame: 200, x: 0, y: 0 };
  const paint = (): void => {
    rect.fill = {
      type: 'image',
      url: photo(),
      mode: 'clip',
      clipSize: { width: p.frame, height: p.frame },
      offset: { x: p.x, y: p.y },
    };
  };
  const set = (key: keyof typeof p) => (v: number): void => ((p[key] = v), paint());
  knobs(stage, [
    { label: 'clipSize', range: [60, 300, 2], value: 200, set: set('frame'), swing: 80 },
    { label: 'offset.x', range: [-100, 100, 1], value: 0, set: set('x'), swing: 40 },
    { label: 'offset.y', range: [-100, 100, 1], value: 0, set: set('y'), swing: 40 },
  ]);

  return stage.dispose;
};

export default mount;
