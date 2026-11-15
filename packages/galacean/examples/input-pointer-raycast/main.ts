// Manual picking: pointer position, then camera.screenPointToRay, then scene.physics.raycast
import { HitResult, PrimitiveMesh, Ray, StaticCollider, Vector2, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { boxShape, lit, marker, PALETTE, phong, solid, tick, unlit } from '../../shared/core-kit.ts';
import { ghost, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { physics: true, hint: 'Press anywhere on the canvas: the ray from that pixel picks the nearest collider.' });
  const { engine, root, scene, canvas } = stage;
  const camera = lit(stage, [0, 3, 9]);
  const boxes = [-3.6, -1.2, 1.2, 3.6].map((x, i) => {
    const material = phong(engine, [PALETTE.red, PALETTE.green, PALETTE.blue, PALETTE.violet][i]!);
    const e = solid(root, PrimitiveMesh.createCuboid(engine, 1.6, 1.6 + (i % 2) * 0.8, 1.6), material, [x, (i % 2) * 0.4, -i % 2], `box ${i + 1}`);
    e.addComponent(StaticCollider).addShape(boxShape(1.6, 1.6 + (i % 2) * 0.8, 1.6));
    return e;
  });
  const dot = marker(root, unlit(engine, PALETTE.white), 0.3);
  dot.entity.isActive = false;
  const info = panel(stage, 'bl');
  const cursor = stage.preview ? ghost(stage) : undefined;
  const ray = new Ray();
  const hit = new HitResult();
  const screen = new Vector2();
  const probe = new Vector3();
  const ratio = (): number => canvas.width / Math.max(1, canvas.clientWidth);
  tick(root, (_dt, t) => {
    const { inputManager } = engine;
    let from: Vector2 | undefined;
    if (stage.preview) {
      // A scripted pointer that sweeps from box to box (and over the gaps).
      const target = boxes[Math.floor(t / 1.1) % 4]!;
      camera.worldToScreenPoint(target.transform.worldPosition.clone().add(new Vector3(Math.sin(t * 4) * 0.5, 0, 0)), probe);
      from = screen.set(probe.x, probe.y);
      cursor!.move(probe.x / ratio() / canvas.clientWidth, probe.y / ratio() / canvas.clientHeight);
    } else if (inputManager.isPointerHeldDown() && inputManager.pointers[0]) {
      from = inputManager.pointers[0].position;
    }
    if (!from) return;
    camera.screenPointToRay(from, ray);
    if (scene.physics.raycast(ray, 100, hit)) {
      dot.entity.isActive = true;
      dot.set(hit.point);
      info.text(`raycast hit ${hit.entity.name}\ndistance ${hit.distance.toFixed(2)}\npoint ${hit.point.x.toFixed(2)}, ${hit.point.y.toFixed(2)}, ${hit.point.z.toFixed(2)}`);
    } else {
      dot.entity.isActive = false;
      info.text('raycast: nothing hit');
    }
  });
  return stage.dispose;
};

export default mount;
