// A BlendShape with keyframes at weights 0.5 and 1.0
import { BlendShape, BlinnPhongMaterial, type ModelMesh, PrimitiveMesh, SkinnedMeshRenderer, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 3.5, 5], target: [0, 0.2, 0] });
  const say = caption(stage);
  const mesh: ModelMesh = PrimitiveMesh.createPlane(engine, 4, 4, 24, 24);
  const base = mesh.getPositions()!;
  const peak = (p: Vector3): number => Math.max(0, 1 - Math.hypot(p.x, p.z) / 1.6) ** 2;
  const shape = new BlendShape('Dent then spike');
  shape.addFrame(0.5, base.map((p) => new Vector3(0, -0.8 * peak(p), 0)));
  shape.addFrame(1.0, base.map((p) => new Vector3(0, 1.5 * peak(p), 0)));
  mesh.addBlendShape(shape);
  mesh.uploadData(false);
  const entity = root.createChild('skinned');
  const skinned = entity.addComponent(SkinnedMeshRenderer);
  skinned.mesh = mesh;
  const material = new BlinnPhongMaterial(engine);
  material.baseColor.set(0.5, 0.55, 0.9, 1);
  material.shininess = 60;
  skinned.setMaterial(material);
  const set = (w: number): void => {
    skinned.blendShapeWeights = new Float32Array([w]);
    say(`weight ${w.toFixed(2)}  (frames at 0.5 and 1.0)`);
  };
  if (stage.preview) tick(entity, (_dt, t) => set(0.5 + 0.5 * Math.sin(t * 0.9)));
  else {
    set(0);
    slider(stage.bar, 'weight', 0, 1, 0.01, 0, set);
  }
  stage.own(() => mesh.destroy());
  return stage.dispose;
};

export default mount;
