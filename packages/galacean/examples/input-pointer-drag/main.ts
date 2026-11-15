// onPointerDrag moves a cube along a plane under the pointer's ray
import { type Camera, PrimitiveMesh, Plane, PointerEventData, Ray, Script, StaticCollider, Vector2, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { boxShape, lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { ghost, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

class Drag extends Script {
  camera?: Camera;
  readonly plane = new Plane(new Vector3(0, 1, 0), -0.8);
  private readonly ray = new Ray();
  private readonly hit = new Vector3();
  drags = 0;
  /** Puts the cube under a screen position (canvas pixels). */
  moveTo(screen: Vector2): void {
    this.drags++;
    this.camera!.screenPointToRay(screen, this.ray);
    const d = this.ray.intersectPlane(this.plane);
    if (d < 0) return;
    this.ray.getPoint(d, this.hit);
    this.entity.transform.setPosition(Math.max(-4.5, Math.min(4.5, this.hit.x)), 0.8, Math.max(-2.5, Math.min(2.5, this.hit.z)));
  }
  override onPointerDrag(eventData: PointerEventData): void {
    this.moveTo(eventData.pointer.position);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { physics: true, hint: 'Press on the cube and drag; it follows the pointer across the floor plane.' });
  const { engine, root, canvas } = stage;
  const camera = lit(stage, [0, 7, 7], [0, 0, 0]);
  solid(root, PrimitiveMesh.createPlane(engine, 12, 7), phong(engine, [0.2, 0.23, 0.3]), [0, 0, 0], 'floor');
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6), phong(engine, PALETTE.amber), [0, 0.8, 0], 'cube');
  cube.addComponent(StaticCollider).addShape(boxShape(1.6, 1.6, 1.6));
  const drag = cube.addComponent(Drag);
  drag.camera = camera;
  const cursor = stage.preview ? ghost(stage) : undefined;
  const info = panel(stage, 'bl');
  const screen = new Vector3();
  const point = new Vector2();
  const ratio = (): number => canvas.width / Math.max(1, canvas.clientWidth);
  tick(root, (_dt, t) => {
    if (cursor) {
      // A scripted pointer: pick a spot on the floor, project it to the screen, drag there.
      const wx = Math.sin(t * 0.8) * 3.5;
      const wz = Math.cos(t * 1.1) * 1.8;
      camera.worldToScreenPoint(new Vector3(wx, 0.8, wz), screen);
      point.set(screen.x, screen.y);
      drag.moveTo(point);
      cursor.move(screen.x / ratio() / canvas.clientWidth, screen.y / ratio() / canvas.clientHeight);
      cursor.press(true);
    }
    const p = cube.transform.position;
    info.text(`drag frames ${drag.drags}\ncube ${p.x.toFixed(2)}, ${p.z.toFixed(2)}`);
  });
  return stage.dispose;
};

export default mount;
