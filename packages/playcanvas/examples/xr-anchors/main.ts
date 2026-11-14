// Anchors: a cone follows each anchor as the system refines its pose
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { pointerRay, transparentInAr, trackPointer } from '../../shared/xr-ar.ts';
import { addXrEntry, createXrScene, xrMaterial, xrShape, type XrEntryHandle } from '../../shared/xr.ts';

/** The members of XrAnchor the visual uses; SimAnchor implements the same ones. */
interface AnchorLike {
  getPosition(): pc.Vec3;
  getRotation(): pc.Quat;
  on(event: string, fn: () => void): unknown;
  once(event: string, fn: () => void): unknown;
}

/** A stand-in anchor: its pose is refined now and then, as an AR system does, firing change. */
class SimAnchor extends pc.EventHandler implements AnchorLike {
  private position: pc.Vec3;
  private rotation = new pc.Quat();
  readonly placedAt: pc.Vec3;
  uuid: string | null = null;
  ghost: pc.Entity | null = null;
  constructor(position: pc.Vec3) {
    super();
    this.position = position.clone();
    this.placedAt = position.clone();
  }
  getPosition(): pc.Vec3 {
    return this.position;
  }
  getRotation(): pc.Quat {
    return this.rotation;
  }
  refine(): void {
    this.position.x += (Math.random() - 0.5) * 0.12;
    this.position.z += (Math.random() - 0.5) * 0.12;
    this.rotation.setFromEulerAngles(0, (Math.random() - 0.5) * 20, 0);
    this.fire('change');
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { target: new pc.Vec3(0, 0, -1.6), distance: 4.2, pitch: -38, yaw: 0, autoRotate: 0, interactive: false });
  const { app, camera } = scene;
  const cone = xrMaterial('#4ab3e8');
  const ghost = xrMaterial('#8a93a8', { opacity: 0.45, blendType: pc.BLEND_NORMAL });
  const sims: SimAnchor[] = [];
  let count = 0;

  // The docs' handler: a cone per anchor, moved on change, destroyed with the anchor.
  const onAdd = (anchor: AnchorLike): void => {
    count++;
    const entity = xrShape(app.root, 'cone', cone, [0, 0, 0], 0.1);
    const sync = (): void => {
      entity.setLocalPosition(anchor.getPosition());
      entity.setLocalRotation(anchor.getRotation());
      entity.translateLocal(0, 0.05, 0);
    };
    sync();
    anchor.on('change', sync);
    anchor.once('destroy', () => {
      entity.destroy();
    });
  };
  app.xr?.anchors.on('add', onAdd);

  const create = (position: pc.Vec3): void => {
    if (app.xr?.active && app.xr.anchors.supported) {
      app.xr.anchors.create(position, new pc.Quat(), () => {});
      return;
    }
    const a = new SimAnchor(position);
    sims.push(a);
    onAdd(a);
    // The unanchored placement stays where it was dropped, to compare with the refined anchor.
    a.ghost = xrShape(app.root, 'cone', ghost, [position.x, 0.05, position.z], 0.1);
    if (sims.length > 6) {
      const old = sims.shift()!;
      old.fire('destroy');
      old.ghost?.destroy();
    }
  };

  const ray = new pc.Ray();
  const hit = new pc.Vec3();
  const ac = new AbortController();
  const floorPoint = (x: number, y: number, out: pc.Vec3): boolean => {
    pointerRay(camera, scene.stage.canvas, x, y, ray);
    if (ray.direction.y > -0.001) return false;
    out.copy(ray.direction).mulScalar(-ray.origin.y / ray.direction.y).add(ray.origin);
    return true;
  };
  const mouse = trackPointer(scene.stage.canvas, ac.signal, () => {
    if (!ctx.preview && floorPoint(mouse.x, mouse.y, hit)) create(hit.clone());
  });
  let t = 0;
  let nextDrop = 0.4;
  let nextRefine = 1.2;
  app.on('update', (dt: number) => {
    t += dt;
    if (ctx.preview && t > nextDrop) {
      nextDrop += 1.1;
      create(new pc.Vec3((Math.random() - 0.5) * 3, 0, -0.8 - Math.random() * 1.6));
    }
    if (t > nextRefine) {
      nextRefine += 0.9;
      sims.forEach((s) => s.refine());
    }
    for (const s of sims) app.drawLine(s.placedAt, s.getPosition(), new pc.Color(1, 0.8, 0.3));
  });

  const undoClear = transparentInAr(app, camera);
  let entry: XrEntryHandle | null = null;
  if (!ctx.preview) {
    const panel = createPanel(el);
    const info = panel.readout('');
    app.on('update', () => {
      const a = app.xr?.anchors;
      info.textContent = `app.xr.anchors.supported: ${!!a?.supported}, persistence: ${!!a?.persistence}; anchors made: ${count}${sims.at(-1)?.uuid ? `; newest persisted as ${sims.at(-1)!.uuid}` : ''}; click the floor to create one`;
    });
    panel.button('Persist newest (simulated)', () => {
      const a = sims[sims.length - 1];
      if (a) a.uuid = `anchor-${count}`;
    });
    entry = addXrEntry(el, panel, scene, [{ type: pc.XRTYPE_AR, space: pc.XRSPACE_LOCALFLOOR, label: 'Enter AR', options: { anchors: true } }]);
  }
  return () => {
    ac.abort();
    undoClear();
    app.xr?.anchors.off('add', onAdd);
    entry?.dispose();
    scene.dispose();
  };
};

export default mount;
