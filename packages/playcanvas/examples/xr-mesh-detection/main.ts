// Mesh detection: a pc.Mesh per XrMesh from vertices and indices
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { transparentInAr } from '../../shared/xr-ar.ts';
import { addXrEntry, createXrScene, type XrEntryHandle } from '../../shared/xr.ts';
import { boxData, floorPatch, type MeshData } from './shapes.ts';

/** The members of XrMesh the visual reads; SimMesh provides the same. */
interface MeshLike {
  readonly vertices: Float32Array;
  readonly indices: Uint32Array;
  readonly label: string;
  getPosition(): pc.Vec3;
  getRotation(): pc.Quat;
  on(event: string, fn: () => void): unknown;
  once(event: string, fn: () => void): unknown;
}

const LABELS: Record<string, string> = { 'global mesh': '#4cc38a', table: '#f2c14e', screen: '#4ab3e8', wall: '#a78bfa' };

class SimMesh extends pc.EventHandler implements MeshLike {
  vertices: Float32Array;
  indices: Uint32Array;
  readonly label: string;
  private position: pc.Vec3;
  private rotation = new pc.Quat();
  constructor(label: string, data: MeshData, position: pc.Vec3, yaw = 0) {
    super();
    this.label = label;
    this.vertices = data.vertices;
    this.indices = data.indices;
    this.position = position;
    this.rotation.setFromEulerAngles(0, yaw, 0);
  }
  getPosition(): pc.Vec3 {
    return this.position;
  }
  getRotation(): pc.Quat {
    return this.rotation;
  }
  update(data: MeshData): void {
    this.vertices = data.vertices;
    this.indices = data.indices;
    this.fire('change');
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { target: new pc.Vec3(0, 0.5, -2), distance: 5.5, pitch: -28, yaw: 20, autoRotate: 8, floor: false });
  const { app, camera } = scene;
  let count = 0;

  // The docs' handler: setPositions, calculateNormals, setIndices, update; redone on change.
  const onAdd = (xrMesh: MeshLike): void => {
    count++;
    const mesh = new pc.Mesh(app.graphicsDevice);
    const rebuild = (): void => {
      mesh.clear(true, true);
      mesh.setPositions(xrMesh.vertices);
      mesh.setNormals(pc.calculateNormals(xrMesh.vertices as unknown as number[], xrMesh.indices as unknown as number[]));
      mesh.setIndices(xrMesh.indices);
      mesh.update(pc.PRIMITIVE_TRIANGLES);
    };
    rebuild();
    const colour = new pc.Color().fromString(LABELS[xrMesh.label] ?? '#cccccc');
    const material = new pc.StandardMaterial();
    material.diffuse = new pc.Color(0, 0, 0);
    material.emissive = colour;
    material.update();
    const instance = new pc.MeshInstance(mesh, material);
    instance.renderStyle = pc.RENDERSTYLE_WIREFRAME;
    const entity = new pc.Entity(xrMesh.label);
    entity.addComponent('render', { meshInstances: [instance], castShadows: false });
    app.root.addChild(entity);
    const place = (): void => {
      entity.setPosition(xrMesh.getPosition());
      entity.setRotation(xrMesh.getRotation());
    };
    place();
    xrMesh.on('change', () => {
      rebuild();
      place();
    });
    xrMesh.once('remove', () => {
      material.destroy();
      mesh.destroy();
      entity.destroy();
    });
  };
  app.xr?.meshDetection.on('add', onAdd);

  // The simulated scan: the floor reconstructs row by row, then a table and a screen appear.
  const floor = new SimMesh('global mesh', floorPatch(4, 14, 0.2), new pc.Vec3(0, 0.01, -2));
  let t = 0;
  let reveal = 0.2;
  let added = false;
  app.on('update', (dt: number) => {
    t += dt;
    if (!added && t > 0.4) {
      added = true;
      onAdd(floor);
    }
    if (added && reveal < 1) {
      reveal = Math.min(1, reveal + dt * 0.2);
      floor.update(floorPatch(4, 14, reveal));
    }
    if (t > 5.5 && count === 1) {
      onAdd(new SimMesh('table', boxData(1.1, 0.7, 0.7), new pc.Vec3(0.7, 0.36, -2.3), 20));
      onAdd(new SimMesh('screen', boxData(1.2, 0.7, 0.04), new pc.Vec3(-0.5, 1.3, -3.9)));
    }
    if (ctx.preview && t > 11) {
      t = 0;
      reveal = 0.2;
    }
  });

  const undoClear = transparentInAr(app, camera);
  let entry: XrEntryHandle | null = null;
  if (!ctx.preview) {
    const panel = createPanel(el);
    const info = panel.readout('');
    app.on('update', () => {
      info.textContent = `meshDetection.supported: ${!!app.xr?.meshDetection.supported}; meshes seen: ${count}; simulated scan: reconstructed floor, table, screen`;
    });
    entry = addXrEntry(el, panel, scene, [{ type: pc.XRTYPE_AR, space: pc.XRSPACE_LOCALFLOOR, label: 'Enter AR', options: { meshDetection: true } }]);
  }
  return () => {
    undoClear();
    app.xr?.meshDetection.off('add', onAdd);
    entry?.dispose();
    scene.dispose();
  };
};

export default mount;
