// The six TextureCube faces in the documented order: px, nx, py, ny, pz, nz
import { BackgroundMode, PrimitiveMesh, SkyBoxMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';
import { paintedCube } from '../../shared/gfx-cube.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, camera } = await demo(el, ctx, { camera: [0, 0, 0], target: [0, 0, -1], light: false, hint: 'Faces are set with cube.setImageSource(TextureCubeFace.PositiveX, canvas). The skybox shader inverts x (left-handed cube textures).' });
  const say = caption(stage);
  const cube = paintedCube(engine, 256);
  stage.own(() => cube.destroy());
  const skyMaterial = new SkyBoxMaterial(engine);
  skyMaterial.texture = cube;
  const { background } = stage.scene;
  background.mode = BackgroundMode.Sky;
  background.sky.material = skyMaterial;
  background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
  tick(camera.entity, (_dt, t) => {
    const yaw = t * 30;
    const pitch = Math.sin(t * 0.3) * 50;
    camera.entity.transform.setRotation(pitch, yaw, 0);
    const f = camera.entity.transform.worldForward;
    say(`looking along (${f.x.toFixed(1)}, ${f.y.toFixed(1)}, ${f.z.toFixed(1)})`);
  });
  return stage.dispose;
};

export default mount;
