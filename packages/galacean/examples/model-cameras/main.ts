// glTF cameras become Camera components, disabled until you switch one on
import type { Camera } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { steps } from '../../shared/gfx-kit.ts';
import { NOOP, buttons, rig } from '../../shared/model-kit.ts';
import { camerasGlb } from '../../shared/model-gltf.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, camerasGlb, { camera: [3, 3, 7], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, root, camera, gltf } = r;
  const info = panel(stage);
  const cameras = gltf.cameras as Camera[];
  const views: [string, Camera][] = [['stage camera', camera], ...cameras.map((c, i): [string, Camera] => [i === 0 ? 'glTF perspective' : 'glTF orthographic', c])];
  const pick = (i: number): void => {
    views.forEach(([, c], k) => (c.enabled = k === i));
    info.text(`${views[i]![0]} (on "${views[i]![1].entity.name}")\nglTF.cameras: ${cameras.length}, isOrthographic ${views[i]![1].isOrthographic}`);
  };
  pick(0);
  if (stage.preview) steps(root, 1.8, views.length, pick);
  else buttons(stage, views.map(([n]) => n), (n) => pick(views.findIndex(([name]) => name === n)));
  return stage.dispose;
};

export default mount;
