// KHR_materials_clearcoat: glTF clearcoat factors arrive as PBRMaterial.clearCoat
import type { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { NOOP, materialsOf, rig } from '../../shared/model-kit.ts';
import { ballsGlb } from '../../shared/model-gltf.ts';

const make = () =>
  ballsGlb(
    [0, 0.5, 1].map((c) => ({
      name: `Coat${c}`,
      color: [0.75, 0.1, 0.12] as [number, number, number],
      metallic: 0.6,
      roughness: 0.55,
      ext: { KHR_materials_clearcoat: { clearcoatFactor: c, clearcoatRoughnessFactor: 0.04 } },
    })),
    ['KHR_materials_clearcoat'],
  );

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, make, { camera: [0, 1.6, 6], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, model } = r;
  const mats = materialsOf(model) as PBRMaterial[];
  const info = panel(stage);
  const show = (): void => info.text(mats.map((m) => `${m.name}: clearCoat ${m.clearCoat.toFixed(2)}, roughness ${m.clearCoatRoughness.toFixed(2)}`).join('\n'));
  show();
  if (!stage.preview) slider(stage.bar, 'right ball clearCoat', 0, 1, 0.01, mats[2]!.clearCoat, (v) => ((mats[2]!.clearCoat = v), show()));
  tick(model, (dt) => model.transform.rotate(0, 15 * dt, 0));
  return stage.dispose;
};

export default mount;
