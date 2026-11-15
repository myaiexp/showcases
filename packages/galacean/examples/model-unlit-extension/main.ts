// KHR_materials_unlit: a glTF material flagged unlit loads as an UnlitMaterial and ignores lights
import { UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { NOOP, renderersOf, rig } from '../../shared/model-kit.ts';
import { ballsGlb } from '../../shared/model-gltf.ts';

const make = () =>
  ballsGlb(
    [
      { name: 'Lit', color: [0.9, 0.45, 0.2] },
      { name: 'Unlit', color: [0.9, 0.45, 0.2], unlit: true },
    ],
    ['KHR_materials_unlit'],
  );

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, make, { env: false, camera: [0, 1.6, 5], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, model, light } = r;
  const kinds = renderersOf(model).map((rend) => `${rend.entity.name}: ${rend.getMaterial() instanceof UnlitMaterial ? 'UnlitMaterial' : 'PBRMaterial'}`);
  panel(stage).text(`${kinds.join('\n')}\nthe light turns; Unlit stays flat`);
  tick(light.entity, (_dt, t) => light.entity.transform.setRotation(-35, t * 60, 0));
  return stage.dispose;
};

export default mount;
