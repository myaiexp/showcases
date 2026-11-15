// Several blend shapes: blendShapeWeights has one entry per added BlendShape
import { BlendShape, BlinnPhongMaterial, type ModelMesh, PrimitiveMesh, SkinnedMeshRenderer, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1, 6], target: [0, 0, 0] });
  const say = caption(stage);
  const mesh: ModelMesh = PrimitiveMesh.createCylinder(engine, 0.6, 0.6, 3, 24, 16);
  const base = mesh.getPositions()!;
  const bulge = new BlendShape('Bulge');
  bulge.addFrame(1, base.map((p) => new Vector3(p.x * 0.9 * Math.cos((p.y / 1.5) * 1.4) ** 2, 0, p.z * 0.9 * Math.cos((p.y / 1.5) * 1.4) ** 2)));
  const bend = new BlendShape('Bend');
  bend.addFrame(1, base.map((p) => new Vector3(1.2 * ((p.y + 1.5) / 3) ** 2 * 1.6, 0, 0)));
  mesh.addBlendShape(bulge);
  mesh.addBlendShape(bend);
  mesh.uploadData(false);
  const entity = root.createChild('tube');
  const skinned = entity.addComponent(SkinnedMeshRenderer);
  skinned.mesh = mesh;
  const material = new BlinnPhongMaterial(engine);
  material.baseColor.set(0.9, 0.55, 0.35, 1);
  material.shininess = 50;
  skinned.setMaterial(material);
  const weights = new Float32Array(2);
  const apply = (): void => {
    skinned.blendShapeWeights = weights;
    say(`${mesh.getBlendShapeName(0)} ${weights[0]!.toFixed(2)}   ${mesh.getBlendShapeName(1)} ${weights[1]!.toFixed(2)}`);
  };
  if (stage.preview) {
    tick(entity, (_dt, t) => {
      weights[0] = 0.5 + 0.5 * Math.sin(t * 1.1);
      weights[1] = 0.5 + 0.5 * Math.sin(t * 0.7 + 2);
      apply();
    });
  } else {
    apply();
    slider(stage.bar, 'Bulge', 0, 1, 0.01, 0, (v) => ((weights[0] = v), apply()));
    slider(stage.bar, 'Bend', 0, 1, 0.01, 0, (v) => ((weights[1] = v), apply()));
  }
  stage.own(() => mesh.destroy());
  return stage.dispose;
};

export default mount;
