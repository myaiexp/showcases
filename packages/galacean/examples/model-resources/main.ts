// What a loaded GLTFResource holds: meshes, materials, skins, animations and entities
import { AssetType, type GLTFResource } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { blinn, demo, floor, tick } from '../../shared/gfx-kit.ts';
import { blobGlb, robotGlb, tentacleGlb } from '../../shared/gltf-models.ts';
import { panel } from '../../shared/core-ui.ts';
import { NOOP } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 2, 9], target: [0, 1.2, 0] });
  floor(root, engine, 0, 16, blinn(engine, [0.3, 0.34, 0.42], 10));
  stage.scene.ambientLight = await loadStudioEnv(engine);
  const builders = [robotGlb(), tentacleGlb(), blobGlb()];
  const urls = builders.map((b) => b.url());
  stage.own(() => urls.forEach((u) => URL.revokeObjectURL(u)));
  const gltfs = await Promise.all(urls.map((url) => engine.resourceManager.load<GLTFResource>({ url, type: AssetType.GLTF })));
  if (ctx.signal.aborted) {
    stage.dispose();
    return NOOP;
  }
  const corners = ['tl', 'tr', 'bl'] as const;
  gltfs.forEach((g, i) => {
    const m = g.instantiateSceneRoot();
    m.transform.setPosition((i - 1) * 3, i === 2 ? 1 : 0, 0);
    if (i === 1) m.transform.setScale(0.6, 0.6, 0.6);
    root.addChild(m);
    tick(m, (dt) => m.transform.rotate(0, 30 * dt, 0));
  });
  const text = gltfs.map((g) => {
    const meshes = g.meshes?.reduce((n, list) => n + list.length, 0) ?? 0;
    return `textures ${g.textures?.length ?? 0}\nmaterials ${g.materials?.length ?? 0}\nmeshes ${meshes}\nskins ${g.skins?.length ?? 0}\nclips ${g.animations?.length ?? 0}\nentities ${g.entities.length}`;
  });
  if (stage.preview) panel(stage, 'tl').text(text[0]!.replace(/\n/g, '  ').slice(0, 60));
  else gltfs.forEach((_, i) => panel(stage, corners[i]!).text(`${['robot', 'tentacle', 'blob'][i]}\n${text[i]}`));
  return stage.dispose;
};

export default mount;
