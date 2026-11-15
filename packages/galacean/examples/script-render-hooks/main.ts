// onBeginRender and onEndRender run per camera, on camera entities only
import { Camera, CameraClearFlags, DirectLight, PrimitiveMesh, Script, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

let sink: (m: string) => void = () => {};
let frame = 0;

class Hooks extends Script {
  override onBeginRender(camera: Camera): void {
    if (frame % 90 < 2) sink(`${this.entity.name}.onBeginRender  (camera ${camera.entity.name})`);
  }
  override onEndRender(camera: Camera): void {
    if (frame % 90 < 2) sink(`${this.entity.name}.onEndRender`);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Every 90th frame the log records the hooks of both cameras (main on the left, top view inset on the right).' });
  const { engine, root } = stage;
  stage.scene.ambientLight.diffuseSolidColor.set(0.4, 0.42, 0.48, 1);
  root.createChild('light').addComponent(DirectLight).entity.transform.setRotation(-45, -30, 0);
  const log = eventLog(stage, 9, 'bl');
  sink = (m) => log.log(m);
  stage.own(() => (sink = () => {}));
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), phong(engine, PALETTE.green));
  const mainEntity = root.createChild('main camera');
  mainEntity.transform.setPosition(0, 2, 6);
  mainEntity.transform.lookAt(cube.transform.position);
  const main = mainEntity.addComponent(Camera);
  main.viewport = new Vector4(0, 0, 0.66, 1);
  mainEntity.addComponent(Hooks);
  const topEntity = root.createChild('top camera');
  topEntity.transform.setPosition(0, 7, 0.01);
  topEntity.transform.lookAt(cube.transform.position);
  const top = topEntity.addComponent(Camera);
  top.viewport = new Vector4(0.68, 0.5, 0.31, 0.5);
  top.clearFlags = CameraClearFlags.All;
  top.priority = 1;
  topEntity.addComponent(Hooks);
  tick(root, (dt) => {
    frame++;
    cube.transform.rotate(0, 60 * dt, 0);
  });
  return stage.dispose;
};

export default mount;
