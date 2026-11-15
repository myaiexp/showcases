// main.startRotationZ (degrees) with flipRotation, on arrows
import { ParticleRenderMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { arrowTexture, between, constant, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  caption(stage, 'startRotation: 0 | 90 | random -60 to 60 (z, degrees)');
  const set = [constant(0), constant(90), between(-60, 60)];
  const list = set.map((rot, i) => {
    const e = emitter(stage, root, { position: [-2.5 + i * 2.5, -1.8, 0], texture: arrowTexture(stage), tint: [[1, 0.6, 0.5], [0.6, 1, 0.6], [0.6, 0.8, 1]][i] as [number, number, number] });
    e.renderer.renderMode = ParticleRenderMode.Billboard;
    e.gen.main.startRotationZ = rot;
    e.gen.main.startSize.constant = 0.6;
    e.gen.emission.rateOverTime.constant = 7;
    return e;
  });
  if (!stage.preview) {
    slider(stage.bar, 'middle startRotationZ', -180, 180, 1, 90, (v) => (list[1]!.gen.main.startRotationZ.constant = v));
    slider(stage.bar, 'right flipRotation', 0, 1, 0.05, 0, (v) => (list[2]!.gen.main.flipRotation = v));
  } else list[2]!.gen.main.flipRotation = 0.5;
  return stage.dispose;
};

export default mount;
