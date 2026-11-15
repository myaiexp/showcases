// colorOverLifetime.color: a gradient of colour and alpha keys
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { emitter, fxStage, gradient } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 10] });
  caption(stage, 'yellow > red > blue; alpha fades in at the start and out at the end');
  const e = emitter(stage, root, { position: [0, -1.8, 0] });
  const color = e.gen.colorOverLifetime;
  color.enabled = true;
  color.color = gradient(
    [[0, [1, 0.9, 0.2]], [0.5, [1, 0.25, 0.1]], [1, [0.2, 0.3, 1]]],
    [[0, 0], [0.15, 1], [0.8, 1], [1, 0]],
  );
  e.gen.main.startSize.constant = 0.5;
  e.gen.main.startLifetime.constant = 2.4;
  e.gen.emission.rateOverTime.constant = 18;
  if (!stage.preview) checkbox(stage.bar, 'colorOverLifetime.enabled', true, (v) => (color.enabled = v));
  return stage.dispose;
};

export default mount;
