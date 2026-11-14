// Plane detection: a polygon mesh per XrPlane with its label
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { transparentInAr } from '../../shared/xr-ar.ts';
import { addXrEntry, createXrScene, type XrEntryHandle } from '../../shared/xr.ts';

/** The members of XrPlane the visual reads; SimPlane provides the same. */
interface PlaneLike {
  readonly points: readonly { x: number; y: number; z: number }[];
  readonly label: string;
  readonly orientation: unknown;
  getPosition(): pc.Vec3;
  getRotation(): pc.Quat;
  on(event: string, fn: () => void): unknown;
  once(event: string, fn: () => void): unknown;
}

const LABELS: Record<string, string> = { floor: '#4cc38a', wall: '#4ab3e8', table: '#f2c14e', ceiling: '#a78bfa' };

class SimPlane extends pc.EventHandler implements PlaneLike {
  points: { x: number; y: number; z: number }[];
  orientation: string;
  readonly label: string;
  private position: pc.Vec3;
  private rotation = new pc.Quat();
  constructor(label: string, w: number, d: number, position: pc.Vec3, euler: pc.Vec3) {
    super();
    this.label = label;
    this.points = rect(w, d);
    this.orientation = euler.x === 0 ? 'horizontal' : 'vertical';
    this.position = position;
    this.rotation.setFromEulerAngles(euler.x, euler.y, euler.z);
  }
  getPosition(): pc.Vec3 {
    return this.position;
  }
  getRotation(): pc.Quat {
    return this.rotation;
  }
  resize(w: number, d: number): void {
    this.points = rect(w, d);
    this.fire('change');
  }
}
const rect = (w: number, d: number): { x: number; y: number; z: number }[] => [
  { x: -w / 2, y: 0, z: -d / 2 },
  { x: w / 2, y: 0, z: -d / 2 },
  { x: w / 2, y: 0, z: d / 2 },
  { x: -w / 2, y: 0, z: d / 2 },
];

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { target: new pc.Vec3(0, 1, -2), distance: 5.5, pitch: -20, yaw: 25, autoRotate: 8 });
  const { app, camera } = scene;
  let count = 0;

  // The docs' handler: a fan of triangles from the plane's origin, rebuilt on change.
  const onAdd = (xrPlane: PlaneLike): void => {
    count++;
    const mesh = new pc.Mesh(app.graphicsDevice);
    const rebuild = (): void => {
      const n = xrPlane.points.length;
      const vertices = new Float32Array((n + 1) * 3);
      const indices = new Uint32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const p = xrPlane.points[i]!;
        vertices.set([p.x, p.y, p.z], i * 3 + 3);
        indices.set([0, i + 1, ((i + 1) % n) + 1], i * 3);
      }
      mesh.clear(true, true);
      mesh.setPositions(vertices);
      mesh.setNormals(pc.calculateNormals(vertices as unknown as number[], indices as unknown as number[]));
      mesh.setIndices(indices);
      mesh.update(pc.PRIMITIVE_TRIANGLES);
    };
    rebuild();
    const material = new pc.StandardMaterial();
    material.diffuse = new pc.Color().fromString(LABELS[xrPlane.label] ?? '#cccccc');
    material.emissive = material.diffuse.clone().mulScalar(0.4);
    material.opacity = 0.55;
    material.blendType = pc.BLEND_NORMAL;
    material.cull = pc.CULLFACE_NONE;
    material.update();
    const entity = new pc.Entity(xrPlane.label);
    entity.addComponent('render', { meshInstances: [new pc.MeshInstance(mesh, material)], castShadows: false });
    app.root.addChild(entity);
    const place = (): void => {
      entity.setPosition(xrPlane.getPosition());
      entity.setRotation(xrPlane.getRotation());
    };
    place();
    xrPlane.on('change', () => {
      rebuild();
      place();
    });
    xrPlane.once('remove', () => {
      material.destroy();
      mesh.destroy();
      entity.destroy();
    });
  };
  app.xr?.planeDetection.on('add', onAdd);

  // The simulated scan: planes appear one by one, and the wall grows as more of it is seen.
  const sims = [
    new SimPlane('floor', 4, 4, new pc.Vec3(0, 0.01, -2), new pc.Vec3(0, 0, 0)),
    new SimPlane('wall', 4, 1.2, new pc.Vec3(0, 0.6, -4), new pc.Vec3(90, 0, 0)),
    new SimPlane('table', 1.1, 0.7, new pc.Vec3(0.8, 0.72, -2.4), new pc.Vec3(0, 20, 0)),
  ];
  const steps: (() => void)[] = [() => onAdd(sims[0]!), () => onAdd(sims[1]!), () => onAdd(sims[2]!), () => sims[1]!.resize(4, 2.4), () => sims[1]!.resize(4, 2.8)];
  let t = 0;
  let step = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (t > 0.5 + step * 1.3 && step < steps.length) steps[step++]!();
  });
  // Loop the scan in the preview so the card keeps changing: reset by recreating nothing, just replay growth.
  if (ctx.preview) {
    app.on('update', () => {
      if (t > 9) {
        t = 0.5 + 3 * 1.3 + 0.01;
        step = 3;
        sims[1]!.resize(4, 1.2);
      }
    });
  }

  const undoClear = transparentInAr(app, camera);
  let entry: XrEntryHandle | null = null;
  if (!ctx.preview) {
    const panel = createPanel(el);
    const info = panel.readout('');
    app.on('update', () => {
      const pd = app.xr?.planeDetection;
      info.textContent = `planeDetection.supported: ${!!pd?.supported}; planes seen: ${count}; simulated scan: floor, wall (grows), table`;
    });
    entry = addXrEntry(el, panel, scene, [{ type: pc.XRTYPE_AR, space: pc.XRSPACE_LOCALFLOOR, label: 'Enter AR', options: { planeDetection: true } }]);
  }
  return () => {
    undoClear();
    app.xr?.planeDetection.off('add', onAdd);
    entry?.dispose();
    scene.dispose();
  };
};

export default mount;
