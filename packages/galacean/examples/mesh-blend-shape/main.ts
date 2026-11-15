// ModelMesh blend shape: delta positions in a BlendShape, driven by blendShapeWeights
import { BlendShape, BlinnPhongMaterial, ModelMesh, PrimitiveMesh, SkinnedMeshRenderer, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 3.5, 5], target: [0, 0.4, 0] });
  const say = caption(stage);
  const mesh: ModelMesh = PrimitiveMesh.createPlane(engine, 4, 4, 24, 24);
  const base = mesh.getPositions()!;
  const deltaPositions = base.map((p) => new Vector3(0, 1.6 * Math.max(0, 1 - Math.hypot(p.x, p.z) / 1.8) ** 2, 0));
  const blendShape = new BlendShape('Dome');
  blendShape.addFrame(1.0, deltaPositions);
  mesh.addBlendShape(blendShape);
  mesh.uploadData(false);
  const entity = root.createChild('skinned');
  const skinned = entity.addComponent(SkinnedMeshRenderer);
  skinned.mesh = mesh;
  const material = new BlinnPhongMaterial(engine);
  material.baseColor.set(0.35, 0.65, 0.5, 1);
  material.shininess = 60;
  skinned.setMaterial(material);
  const set = (w: number): void => {
    skinned.blendShapeWeights = new Float32Array([w]);
    say(`blendShapeWeights = [${w.toFixed(2)}]`);
  };
  if (stage.preview) tick(entity, (_dt, t) => set(0.5 + 0.5 * Math.sin(t * 1.2)));
  else {
    set(0);
    slider(stage.bar, 'weight', 0, 1, 0.01, 0, set);
  }
  stage.own(() => mesh.destroy());
  return stage.dispose;
};

export default mount;
