// A model's ModelMesh sub-assets: vertex count, sub-meshes and bounds
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { steps, tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';
import { MeshRenderer } from '@galacean/engine';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, model, animator, gltf } = r;
  animator.play('Idle');
  const info = panel(stage);
  const renderers = model.getComponentsIncludeChildren(MeshRenderer, []);
  const show = (i: number): void => {
    const renderer = renderers[i]!;
    const mesh = renderer.mesh as import('@galacean/engine').ModelMesh;
    const { min, max } = mesh.bounds;
    info.text(
      `${renderer.entity.name}\nvertexCount ${mesh.vertexCount}\nsubMeshes ${mesh.subMeshes.length}\nbounds ${(max.x - min.x).toFixed(2)} x ${(max.y - min.y).toFixed(2)} x ${(max.z - min.z).toFixed(2)}\nmeshes in glTF: ${gltf.meshes!.length}`,
    );
  };
  show(0);
  steps(model, 1.4, renderers.length, show);
  tick(model, (dt) => model.transform.rotate(0, 25 * dt, 0));
  return stage.dispose;
};

export default mount;
