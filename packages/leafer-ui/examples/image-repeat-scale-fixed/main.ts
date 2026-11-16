// Appearance: repeating image paint with scaleFixed in a zooming Group
import { Leafer, Group, Rect } from 'leafer-ui';
import '@leafer-in/scale-fixed';
import { arrows } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Zoom, then switch scaleFixed: the tiles keep their size when it is on." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const world = new Group();
  leafer.add(world);
  const rect = new Rect({ x: (stage.width - S * 1.4) / 2, y: (stage.height - S) / 2 - 6, width: S * 1.4, height: S, stroke: '#333', strokeWidth: 2 });
  world.add(rect);
  const forms = { false: false, true: true, 'zoom-in': 'zoom-in' } as const;
  pick(stage, 'scaleFixed', Object.keys(forms) as (keyof typeof forms)[], (k) => {
    rect.fill = { type: 'image', url: arrows(), mode: 'repeat', size: 30, scaleFixed: forms[k] };
  }, 3200, 'true');
  const cx = stage.width / 2;
  const cy = stage.height / 2;
  drive(stage, 'zoom', [0.5, 2.5, 0.05], 1, (k) => world.set({ scale: k, x: (1 - k) * cx, y: (1 - k) * cy }), 8);

  return stage.dispose;
};

export default mount;
