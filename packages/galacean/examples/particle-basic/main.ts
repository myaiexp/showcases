// A ParticleRenderer with a ParticleMaterial: baseTexture and baseColor
import { ParticleMaterial, ParticleRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { dotTexture, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 10, 30], target: [0, 10, 0] });
  caption(stage, 'engine defaults: rate 10, cone, lifetime 5, speed 5 (only size set to 2)');
  const entity = root.createChild('particleEntity');
  entity.transform.setRotation(-90, 0, 0); // the cone points along local +Z by default; aim it up
  const particleRenderer = entity.addComponent(ParticleRenderer);
  const material = new ParticleMaterial(stage.engine);
  material.baseTexture = dotTexture(stage);
  particleRenderer.setMaterial(material);
  particleRenderer.generator.main.startSize.constant = 2;
  if (!stage.preview) color(stage.bar, 'baseColor', [1, 1, 1], ([r, g, b]) => material.baseColor.set(r ** 2.2, g ** 2.2, b ** 2.2, 1));
  return stage.dispose;
};

export default mount;
