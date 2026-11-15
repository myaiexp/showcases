// Camera.screenPointToRay + raycast: pick the box under the pointer
import { HitResult, PointerButton, PrimitiveMesh, Ray, StaticCollider, Vector2, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { boxShape } from '../../shared/core-kit.ts';
import { ghost, panel } from '../../shared/core-ui.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { fmt, PALETTE, world } from '../../shared/phys-kit.ts';
import { tint } from '../../shared/phys-tag.ts';

const COLORS = [PALETTE.red, PALETTE.amber, PALETTE.green, PALETTE.cyan, PALETTE.violet];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4.5, 9], target: [0, 0.8, 0], hint: 'Press (or hold) the pointer on a box.' });
  const boxes = COLORS.map((c, i) => {
    const h = 1 + (i % 3) * 0.5;
    const b = add(w.root, PrimitiveMesh.createCuboid(w.engine, 1.4, h, 1.4), blinn(w.engine, [...c]), [(i - 2) * 2, h / 2, (i % 2) * -1.2], `box ${i + 1}`);
    b.entity.addComponent(StaticCollider).addShape(boxShape(1.4, h, 1.4));
    return b.entity;
  });
  const info = panel(w.stage, 'bl');
  info.text('press a box');
  const cursor = w.stage.preview ? ghost(w.stage) : undefined;
  const ray = new Ray();
  const hit = new HitResult();
  const at = new Vector2();
  const probe = new Vector3();
  let picked = -1;
  tick(w.root, (_dt, t) => {
    let from: Vector2 | undefined;
    const input = w.engine.inputManager;
    if (w.stage.preview) {
      const target = boxes[Math.floor(t / 1.4) % boxes.length]!;
      w.camera.worldToScreenPoint(target.transform.worldPosition, probe);
      from = at.set(probe.x, probe.y);
      const ratio = w.stage.canvas.width / Math.max(1, w.stage.canvas.clientWidth);
      cursor!.move(probe.x / ratio / w.stage.canvas.clientWidth, probe.y / ratio / w.stage.canvas.clientHeight);
    } else if (input.isPointerHeldDown(PointerButton.Primary) && input.pointers[0]) {
      from = input.pointers[0].position;
    }
    if (!from) return;
    w.camera.screenPointToRay(from, ray);
    const found = w.physics.raycast(ray, 100, hit);
    if (picked >= 0) tint(boxes[picked]!, COLORS[picked]!);
    picked = found ? boxes.indexOf(hit.entity) : -1;
    if (picked >= 0) tint(boxes[picked]!, PALETTE.white);
    info.text(found ? `picked ${hit.entity.name}\ndistance ${hit.distance.toFixed(2)}\npoint ${fmt(hit.point, 2)}\nnormal ${fmt(hit.normal, 2)}` : 'raycast -> false');
  });
  return w.stage.dispose;
};

export default mount;
