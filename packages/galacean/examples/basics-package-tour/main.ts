// The overview's core packages in one scene: engine, PhysX and OrbitControl
import { DynamicCollider, PrimitiveMesh, StaticCollider } from '@galacean/engine';
import { OrbitControl } from '@galacean/engine-toolkit-controls';
import type { Mount } from '@/types.ts';
import { boxShape, lit, PALETTE, phong, solid, sphereShape, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { physics: true, hint: 'Drag to orbit, scroll to zoom (OrbitControl). Cards only auto-rotate.' });
  const { engine, root } = stage;
  const camera = lit(stage, [7, 5, 9], [0, 1, 0]);
  const floor = solid(root, PrimitiveMesh.createCuboid(engine, 9, 0.4, 9), phong(engine, PALETTE.grey), [0, -0.2, 0], 'floor');
  floor.addComponent(StaticCollider).addShape(boxShape(9, 0.4, 9));
  const control = camera.entity.addComponent(OrbitControl);
  control.target.set(0, 1, 0);
  control.autoRotate = true;
  control.autoRotateSpeed = stage.preview ? 2.5 : 1.2;
  control.enableDamping = true;
  const sphere = PrimitiveMesh.createSphere(engine, 0.5, 20);
  const cube = PrimitiveMesh.createCuboid(engine, 0.9, 0.9, 0.9);
  const palette = [PALETTE.amber, PALETTE.cyan, PALETTE.violet, PALETTE.green, PALETTE.red];
  let n = 0;
  const spawn = (): void => {
    const round = n % 2 === 0;
    const e = solid(root, round ? sphere : cube, phong(engine, palette[n % palette.length]!), [Math.sin(n * 2.4) * 2.2, 7, Math.cos(n * 1.7) * 2.2]);
    const body = e.addComponent(DynamicCollider);
    body.addShape(round ? sphereShape(0.5) : boxShape(0.9, 0.9, 0.9));
    n++;
    if (n > 22) root.children.find((c) => c.getComponent(DynamicCollider))?.destroy();
  };
  const rows = [
    '@galacean/engine                  scene, camera, lights, meshes',
    '@galacean/engine-physics-physx    the falling bodies',
    '@galacean/engine-toolkit-controls the orbiting camera',
  ];
  panel(stage, 'bl').text(rows.join('\n'));
  let last = 0;
  tick(root, (_dt, t) => {
    if (t - last > 0.5) {
      last = t;
      spawn();
    }
  });
  return stage.dispose;
};

export default mount;
