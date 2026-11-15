// A single .glb and a .gltf with a split buffer load the same way
import { Animator, AssetType, type GLTFResource } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { blinn, demo, floor } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP } from '../../shared/model-kit.ts';
import { gltfJsonText } from '../../shared/model-gltf.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.7, 7], target: [0, 1, 0] });
  floor(root, engine, 0, 14, blinn(engine, [0.3, 0.34, 0.42], 10));
  stage.scene.ambientLight = await loadStudioEnv(engine);
  const builder = robotGlb();
  const glbUrl = builder.url();
  const glb = builder.glb();
  const gltfUrl = URL.createObjectURL(new Blob([gltfJsonText(glb)], { type: 'model/gltf+json' }));
  stage.own(() => [glbUrl, gltfUrl].forEach((u) => URL.revokeObjectURL(u)));
  const [a, b] = await Promise.all([glbUrl, gltfUrl].map((url) => engine.resourceManager.load<GLTFResource>({ url, type: AssetType.GLTF })));
  if (ctx.signal.aborted) {
    stage.dispose();
    return NOOP;
  }
  [a!, b!].forEach((g, i) => {
    const m = g.instantiateSceneRoot();
    m.transform.setPosition(i ? 1.6 : -1.6, 0, 0);
    root.addChild(m);
    m.getComponent(Animator)!.play(i ? 'Run' : 'Walk');
  });
  panel(stage).text(`.glb   ${(glb.byteLength / 1024).toFixed(0)} KB: JSON and binary in one file\n.gltf  ${(gltfJsonText(glb).length / 1024).toFixed(0)} KB: JSON with the buffer as a data URI`);
  return stage.dispose;
};

export default mount;
