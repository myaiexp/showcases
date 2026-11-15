// ParticleRenderMode.Mesh: particles drawn as a mesh, tumbling in 3D
import { ParticleRenderMode, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { between, emitter, fxStage } from '../../shared/particle-kit.ts';
import { checker } from '../../shared/textures.ts';
import { canvasTexture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 10] });
  caption(stage, 'renderMode = Mesh, mesh = a cuboid, startRotation3D with random x, y, z');
  const tex = canvasTexture(stage.engine, checker('#ffd27a', '#c0392b', 4), { size: 64 });
  const e = emitter(stage, root, { texture: tex, additive: false, position: [0, -1.8, 0] });
  e.renderer.renderMode = ParticleRenderMode.Mesh;
  e.renderer.mesh = PrimitiveMesh.createCuboid(stage.engine, 1, 1, 1);
  e.gen.main.startSize.constant = 0.45;
  e.gen.main.startRotation3D = true;
  e.gen.main.startRotationX = between(0, 360);
  e.gen.main.startRotationY = between(0, 360);
  e.gen.main.startRotationZ = between(0, 360);
  e.gen.main.gravityModifier.constant = 0.2;
  e.gen.main.startSpeed.constant = 3;
  e.gen.rotationOverLifetime.enabled = true;
  e.gen.rotationOverLifetime.separateAxes = true;
  e.gen.rotationOverLifetime.rotationX.constant = 180;
  e.gen.rotationOverLifetime.rotationY.constant = 90;
  if (!stage.preview) checkbox(stage.bar, 'Mesh mode (off = Billboard)', true, (v) => (e.renderer.renderMode = v ? ParticleRenderMode.Mesh : ParticleRenderMode.Billboard));
  return stage.dispose;
};

export default mount;
