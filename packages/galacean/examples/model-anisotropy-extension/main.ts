// KHR_materials_anisotropy: stretched highlights from strength and rotation
import type { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { NOOP, materialsOf, rig } from '../../shared/model-kit.ts';
import { ballsGlb } from '../../shared/model-gltf.ts';

const make = () =>
  ballsGlb(
    [0, 0.6, 1].map((s) => ({ name: `Aniso${s}`, color: [0.8, 0.8, 0.85] as [number, number, number], metallic: 1, roughness: 0.35, ext: { KHR_materials_anisotropy: { anisotropyStrength: s, anisotropyRotation: 0.8 } } })),
    ['KHR_materials_anisotropy'],
  );

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, make, { camera: [0, 1.6, 6], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, model } = r;
  const mats = materialsOf(model) as PBRMaterial[];
  const info = panel(stage);
  const show = (): void => info.text(mats.map((m) => `${m.name}: anisotropy ${m.anisotropy.toFixed(2)}, rotation ${m.anisotropyRotation.toFixed(2)}`).join('\n'));
  show();
  if (!stage.preview) slider(stage.bar, 'rotation', 0, 6.28, 0.05, 0.8, (v) => (mats.forEach((m) => (m.anisotropyRotation = v)), show()));
  tick(model, (dt) => model.transform.rotate(0, 15 * dt, 0));
  return stage.dispose;
};

export default mount;
