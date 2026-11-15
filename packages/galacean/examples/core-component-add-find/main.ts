// addComponent, getComponent, getComponents and getComponentsIncludeChildren
import { Color, DirectLight, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { addCamera, createStage } from '../../shared/stage.ts';
import { PALETTE, phong, solid } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';

class Spin extends Script {
  speed = 40;
  override onUpdate(dt: number): void {
    this.entity.transform.rotate(0, this.speed * dt, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The rig carries two Spin components and has two Spin children.' });
  const { engine, root } = stage;
  addCamera(root, [0, 2.5, 8]);
  stage.scene.ambientLight.diffuseSolidColor.set(0.3, 0.3, 0.36, 1);

  const lightEntity = root.createChild('light');
  lightEntity.transform.setRotation(-40, -30, 0);
  const directLight = lightEntity.addComponent(DirectLight);
  directLight.color = new Color(0.55, 0.65, 1);

  const mesh = PrimitiveMesh.createCuboid(engine, 0.9, 0.9, 0.9);
  const rig = solid(root, mesh, phong(engine, PALETTE.amber), [0, 0, 0], 'rig');
  rig.addComponent(Spin).speed = 30;
  rig.addComponent(Spin).speed = 30;
  for (const [i, x] of [-2.5, 2.5].entries()) {
    const child = solid(rig, mesh, phong(engine, PALETTE.cyan), [x, 0, 0], `child ${i + 1}`);
    child.addComponent(Spin).speed = 80;
  }
  const own: Spin[] = [];
  const deep: Spin[] = [];
  rig.getComponents(Spin, own);
  rig.getComponentsIncludeChildren(Spin, deep);
  panel(stage).text(
    `directLight.entity.name        ${directLight.entity.name}\n` +
      `rig.getComponent(Spin).entity   ${rig.getComponent(Spin)?.entity.name}\n` +
      `rig.getComponents(Spin)         ${own.length} found\n` +
      `rig.getComponentsIncludeChildren(Spin)  ${deep.length} found`,
  );
  return stage.dispose;
};

export default mount;
