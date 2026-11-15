// setUVs and setIndices on a ModelMesh, rewritten each frame
import { RenderFace, BlinnPhongMaterial, MeshRenderer, ModelMesh, Texture2D, Vector2, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { canvasTexture, uvGrid } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 5], light: false });
  const say = caption(stage);
  const mesh = new ModelMesh(engine);
  mesh.setPositions([new Vector3(-1.5, 1.5, 0), new Vector3(1.5, 1.5, 0), new Vector3(1.5, -1.5, 0), new Vector3(-1.5, -1.5, 0)]);
  mesh.setIndices(new Uint16Array([0, 1, 2, 0, 2, 3]));
  const uvs = [new Vector2(), new Vector2(), new Vector2(), new Vector2()];
  const corners = [[0, 0], [1, 0], [1, 1], [0, 1]];
  const apply = (zoom: number, angle: number): void => {
    corners.forEach(([u, v], i) => {
      const x = (u! - 0.5) * zoom;
      const y = (v! - 0.5) * zoom;
      uvs[i]!.set(0.5 + x * Math.cos(angle) - y * Math.sin(angle), 0.5 + x * Math.sin(angle) + y * Math.cos(angle));
    });
    mesh.setUVs(uvs);
    mesh.uploadData(false);
    say(`UV span ${zoom.toFixed(2)}, turned ${((angle * 180) / Math.PI).toFixed(0)}°`);
  };
  mesh.addSubMesh(0, 6);
  apply(1, 0);
  const texture: Texture2D = canvasTexture(engine, uvGrid, { size: 256 });
  const material = new BlinnPhongMaterial(engine);
  material.baseTexture = texture;
  material.emissiveColor.set(0.7, 0.7, 0.7, 1);
  material.renderFace = RenderFace.Double;
  const entity = root.createChild('quad');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(material);
  stage.own(() => {
    mesh.destroy();
    texture.destroy();
  });
  if (stage.preview) tick(root, (_dt, t) => apply(0.8 + 1.4 * (0.5 + 0.5 * Math.sin(t * 0.7)), t * 0.4));
  else {
    let z = 1;
    let a = 0;
    slider(stage.bar, 'UV span', 0.2, 3, 0.05, z, (v) => apply((z = v), a));
    slider(stage.bar, 'turn', 0, 360, 1, 0, (v) => apply(z, (a = (v * Math.PI) / 180)), (v) => `${v}°`);
  }
  return stage.dispose;
};

export default mount;
