// sizeOverLifetime.size as a curve: grow, shrink, steady growth
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { curve, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  caption(stage, 'size curve: 0 > 1 > 0 | 1 > 0 | 0.2 > 2.5');
  const curves = [curve([0, 0], [0.5, 1], [1, 0]), curve([0, 1], [1, 0]), curve([0, 0.2], [1, 2.5])];
  curves.forEach((c, i) => {
    const e = emitter(stage, root, { position: [-2.6 + i * 2.6, -1.8, 0], tint: [[1, 0.6, 0.45], [0.55, 1, 0.55], [0.55, 0.75, 1]][i] as [number, number, number] });
    e.gen.sizeOverLifetime.enabled = true;
    e.gen.sizeOverLifetime.size = c;
    e.gen.main.startSize.constant = 0.4;
    e.gen.main.startLifetime.constant = 2.2;
    e.gen.main.startSpeed.constant = 1.8;
  });
  return stage.dispose;
};

export default mount;
