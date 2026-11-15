// Find parts of a loaded model by name or path: scene.findEntityByPath and entity.findByName
import { Animator } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { steps, tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const PARTS = [
  ['scene.findEntityByName("Head")', (s: import('@galacean/engine').Scene) => s.findEntityByName('Head')],
  ['scene.findEntityByPath("Robot/Hips/Body/ArmR")', (s: import('@galacean/engine').Scene) => s.findEntityByPath('Robot/Hips/Body/ArmR')],
  ['scene.findEntityByName("LegL")', (s: import('@galacean/engine').Scene) => s.findEntityByName('LegL')],
] as const;

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb, { bare: true });
  if (!r) return NOOP;
  const { stage, gltf, model: holder } = r;
  const { scene } = stage;
  holder.destroy();
  // As in use.mdx, the instance becomes a scene root so path lookups start from its name.
  const model = gltf.instantiateSceneRoot();
  scene.addRootEntity(model);
  model.getComponent(Animator)!.enabled = false;
  const info = panel(stage);
  let pick = 0;
  let pulse = 0;
  const choose = (i: number): void => {
    pick = i;
    const found = PARTS[i]![1](scene);
    info.text(`${PARTS[i]![0]}\n-> ${found?.name ?? 'null'}  (child of ${found?.parent?.name})\nmodel.findByName("Hips") -> ${model.findByName('Hips')?.name}`);
  };
  choose(0);
  if (stage.preview) steps(model, 1.8, PARTS.length, choose);
  else PARTS.forEach(([label], i) => button(stage.bar, label.replace('scene.', ''), () => choose(i)));
  tick(model, (dt) => {
    pulse += dt * 6;
    PARTS.forEach(([, find], i) => {
      const part = find(scene);
      const s = i === pick ? 1.25 + Math.sin(pulse) * 0.2 : 1;
      part?.transform.setScale(s, s, s);
    });
  });
  return stage.dispose;
};

export default mount;
