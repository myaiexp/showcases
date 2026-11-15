// KHR_materials_ior: the glTF's index of refraction lands on PBRMaterial.ior
import type { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { NOOP, materialsOf, rig } from '../../shared/model-kit.ts';
import { ballsGlb } from '../../shared/model-gltf.ts';

const make = () =>
  ballsGlb(
    [1.0, 1.5, 2.4].map((ior) => ({ name: `Ior${ior}`, color: [0.1, 0.4, 0.8] as [number, number, number], roughness: 0.15, ext: { KHR_materials_ior: { ior } } })),
    ['KHR_materials_ior'],
  );

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, make, { camera: [0, 1.6, 6], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, model } = r;
  const mats = materialsOf(model) as PBRMaterial[];
  const info = panel(stage);
  const show = (): void => info.text(mats.map((m) => `${m.name}: ior ${m.ior.toFixed(2)}`).join('\n'));
  show();
  if (!stage.preview) slider(stage.bar, 'middle ball ior', 1, 2.6, 0.05, mats[1]!.ior, (v) => ((mats[1]!.ior = v), show()));
  tick(model, (dt) => model.transform.rotate(0, 15 * dt, 0));
  return stage.dispose;
};

export default mount;
