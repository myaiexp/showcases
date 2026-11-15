// PBRMaterial.roughnessMetallicTexture times roughness and metallic
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';
import { roughMetalBands } from '../../shared/mat-maps.ts';

const FACTORS: [number, number][] = [[1, 1], [1, 0.5], [0.5, 1], [0.3, 0.3]];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'Each sphere: [metallic, roughness] multipliers on the same texture.' });
  caption(stage, 'texture G = roughness, B = metallic');
  const texture = roughMetalBands(engine, 4);
  const balls = ballRow(root, engine, 4, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(0.8, 0.5, 0.2, 1);
    m.roughnessMetallicTexture = texture;
    [m.metallic, m.roughness] = FACTORS[i]!;
    return m;
  });
  tick(root, (dt) => balls.forEach((b) => b.entity.transform.rotate(0, 25 * dt, 0)));
  if (!stage.preview) {
    slider(stage.bar, 'roughness (sphere 1)', 0, 1, 0.01, 1, (v) => (balls[0]!.material.roughness = v));
    slider(stage.bar, 'metallic (sphere 1)', 0, 1, 0.01, 1, (v) => (balls[0]!.material.metallic = v));
  }
  return stage.dispose;
};

export default mount;
