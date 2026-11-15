// SkinnedMeshRenderer with a two-bone Skin built in code
import { BlinnPhongMaterial, BoundingBox, Matrix, type ModelMesh, PrimitiveMesh, Skin, SkinnedMeshRenderer, Vector3, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0.5, 7], target: [0, 0, 0] });
  const say = caption(stage);
  const mesh: ModelMesh = PrimitiveMesh.createCylinder(engine, 0.5, 0.5, 4, 24, 20);
  const positions = mesh.getPositions()!;
  mesh.setBoneIndices(positions.map(() => new Vector4(0, 1, 0, 0)));
  mesh.setBoneWeights(
    positions.map((p) => {
      const w = Math.min(1, Math.max(0, (p.y + 0.8) / 1.6));
      return new Vector4(1 - w, w, 0, 0);
    }),
  );
  mesh.uploadData(false);
  const bone0 = root.createChild('bone0');
  const bone1 = bone0.createChild('bone1');
  const skin = new Skin('two-bone');
  skin.joints = ['bone0', 'bone1'];
  skin.inverseBindMatrices = [new Matrix(), new Matrix()];
  skin.skeleton = 'bone0';
  const holder = root.createChild('skinned');
  const renderer = holder.addComponent(SkinnedMeshRenderer);
  renderer.mesh = mesh;
  renderer.skin = skin;
  renderer.rootBone = bone0;
  renderer.bones = [bone0, bone1];
  renderer.localBounds = new BoundingBox(new Vector3(-3, -3, -3), new Vector3(3, 3, 3));
  const material = new BlinnPhongMaterial(engine);
  material.baseColor.set(0.9, 0.55, 0.35, 1);
  material.shininess = 50;
  renderer.setMaterial(material);
  const fold = (deg: number): void => {
    bone1.transform.setRotation(0, 0, deg);
    say(`bone1 rotation z = ${deg.toFixed(0)}°  (rootBone bone0, ${renderer.bones.length} bones)`);
  };
  if (stage.preview) tick(root, (_dt, t) => fold(75 * Math.sin(t * 1.1)));
  else {
    fold(0);
    slider(stage.bar, 'fold bone1', -120, 120, 1, 0, fold, (v) => `${v}°`);
  }
  stage.own(() => mesh.destroy());
  return stage.dispose;
};

export default mount;
