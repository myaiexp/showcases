// ParticleRenderer.renderMode: Billboard, StretchBillboard, Mesh, None
import { ParticleRenderMode, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { arrowTexture, emitter, fxStage } from '../../shared/particle-kit.ts';

// HorizontalBillboard and VerticalBillboard are in the enum, but setting either throws "Not implemented".
const MODES = ['Billboard', 'StretchBillboard', 'Mesh', 'None'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 10] });
  caption(stage, 'Billboard | StretchBillboard | Mesh (cone) | None draws nothing');
  const mesh = PrimitiveMesh.createCone(stage.engine, 0.5, 1, 12);
  const list = MODES.map((mode, i) => {
    const e = emitter(stage, root, { position: [-3.3 + i * 2.2, -1.8, 0], texture: arrowTexture(stage), tint: [[1, 0.6, 0.5], [1, 0.85, 0.4], [0.5, 1, 0.6], [0.5, 0.75, 1]][i] as [number, number, number] });
    e.renderer.mesh = mesh;
    e.renderer.renderMode = ParticleRenderMode[mode];
    e.gen.main.startSize.constant = 0.55;
    e.gen.main.startSpeed.constant = 1.8;
    e.gen.emission.rateOverTime.constant = 6;
    return e;
  });
  if (!stage.preview) select(stage.bar, 'first emitter renderMode', MODES, (v) => (list[0]!.renderer.renderMode = ParticleRenderMode[v]));
  return stage.dispose;
};

export default mount;
