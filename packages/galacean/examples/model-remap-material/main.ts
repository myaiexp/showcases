// Copy a model's material, recolour it and put the copy on the renderers
import { type PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { color } from '../../shared/controls.ts';
import { lin, steps, tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, renderersOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, model, gltf, animator, say } = r;
  animator.play('Walk');
  // The glTF's materials are shared by every instance; clone the "Paint" material and use the copy.
  const original = gltf.materials!.find((m) => m.name === 'Paint') as PBRMaterial;
  const copy = original.clone() as PBRMaterial;
  for (const renderer of renderersOf(model)) {
    renderer.getMaterials().forEach((m, i) => m === original && renderer.setMaterial(i, copy));
  }
  const paint = (rgb: [number, number, number]): void => {
    copy.baseColor.set(...lin(rgb), 1);
    say(`material.clone(): baseColor ${rgb.map((v) => v.toFixed(2)).join(', ')}`);
  };
  paint([0.95, 0.45, 0.12]);
  if (stage.preview) steps(model, 1.5, 4, (i) => paint([[0.95, 0.45, 0.12], [0.2, 0.7, 0.95], [0.5, 0.9, 0.3], [0.9, 0.3, 0.7]][i] as [number, number, number]));
  else color(stage.bar, 'paint colour', [0.95, 0.45, 0.12], paint);
  tick(model, (dt) => model.transform.rotate(0, 20 * dt, 0));
  return stage.dispose;
};

export default mount;
