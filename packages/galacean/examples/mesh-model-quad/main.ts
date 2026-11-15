// A ModelMesh from setPositions, addSubMesh and uploadData
import { RenderFace, MeshRenderer, ModelMesh, UnlitMaterial, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { demo, spin } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 5], light: false, hint: 'Six positions, one sub-mesh, no indices.' });
  const entity = root.createChild('mesh-example');
  const meshRenderer = entity.addComponent(MeshRenderer);
  const modelMesh = new ModelMesh(engine);
  const positions = [
    new Vector3(-1.0, -1.0, 1.0),
    new Vector3(1.0, -1.0, 1.0),
    new Vector3(1.0, 1.0, 1.0),
    new Vector3(1.0, 1.0, 1.0),
    new Vector3(-1.0, 1.0, 1.0),
    new Vector3(-1.0, -1.0, 1.0),
  ];
  modelMesh.setPositions(positions);
  modelMesh.addSubMesh(0, 6);
  modelMesh.uploadData(false);
  meshRenderer.mesh = modelMesh;
  const material = new UnlitMaterial(engine);
  material.baseColor.set(0.35, 0.65, 0.95, 1);
  material.renderFace = RenderFace.Double;
  meshRenderer.setMaterial(material);
  spin(entity, [0, 40, 0]);
  stage.own(() => modelMesh.destroy());
  return stage.dispose;
};

export default mount;
