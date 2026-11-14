// Triangle-mesh collider for a static bowl, convex hulls for dynamic bodies
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, respawn } from '../../shared/physics.ts';

const BOWL_RADIUS = 5.5;
const BOWL_DEPTH = 3;

/** A paraboloid bowl as an indexed grid: one centre vertex, then rings of vertices. */
function bowlMesh(device: pc.GraphicsDevice, rings = 14, sides = 40): pc.Mesh {
  const positions: number[] = [0, 0, 0];
  for (let r = 1; r <= rings; r++) {
    const radius = (r / rings) * BOWL_RADIUS;
    const y = BOWL_DEPTH * (radius / BOWL_RADIUS) ** 2;
    for (let s = 0; s < sides; s++) {
      const a = (s / sides) * Math.PI * 2;
      positions.push(Math.cos(a) * radius, y, Math.sin(a) * radius);
    }
  }
  const at = (ring: number, side: number): number => 1 + (ring - 1) * sides + (side % sides);
  const indices: number[] = [];
  for (let s = 0; s < sides; s++) indices.push(0, at(1, s + 1), at(1, s));
  for (let r = 1; r < rings; r++) {
    for (let s = 0; s < sides; s++) {
      indices.push(at(r, s), at(r, s + 1), at(r + 1, s));
      indices.push(at(r, s + 1), at(r + 1, s + 1), at(r + 1, s));
    }
  }
  const mesh = new pc.Mesh(device);
  mesh.setPositions(positions);
  mesh.setNormals(pc.calculateNormals(positions, indices));
  mesh.setIndices(indices);
  mesh.update();
  return mesh;
}

/** What the collision component reads its triangles from: anything with a `meshes` array, as a Render has. */
function renderOf(mesh: pc.Mesh): { meshes: pc.Mesh[] } {
  return { meshes: [mesh] };
}

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 17, pitch: -30, target: [0, 1.5, 0], floor: 16 });
  const { app } = scene;
  const device = scene.stage.device;

  const bowlMat = material('#59627a');
  bowlMat.cull = pc.CULLFACE_NONE;
  bowlMat.twoSidedLighting = true;
  bowlMat.update();
  const bowlMeshData = bowlMesh(device);
  const bowlRender = renderOf(bowlMeshData);
  const bowl = new pc.Entity('bowl');
  bowl.addComponent('render', { meshInstances: [new pc.MeshInstance(bowlMeshData, bowlMat)], castShadows: false });
  // The default is a triangle mesh: exact and concave, allowed on static bodies.
  bowl.addComponent('collision', { type: 'mesh', render: bowlRender });
  bowl.addComponent('rigidbody', { type: 'static', friction: 0.4, restitution: 0.3 });
  app.root.addChild(bowl);

  // Dynamic bodies need convexHull: the smallest convex shape around the geometry.
  const hullBody = (name: string, geometry: pc.Geometry, colour: string): pc.Entity => {
    const mesh = pc.Mesh.fromGeometry(device, geometry);
    const render = renderOf(mesh);
    const e = new pc.Entity(name);
    e.addComponent('render', { meshInstances: [new pc.MeshInstance(mesh, material(colour))], castShadows: true });
    e.addComponent('collision', { type: 'mesh', render, convexHull: true });
    e.addComponent('rigidbody', { type: 'dynamic', mass: 1, friction: 0.5, restitution: 0.3 });
    app.root.addChild(e);
    return e;
  };
  const torus = (): pc.Geometry => new pc.TorusGeometry({ tubeRadius: 0.2, ringRadius: 0.55 });
  const cone = (): pc.Geometry => new pc.ConeGeometry({ baseRadius: 0.5, height: 1.1 });
  const pieces = [
    hullBody('torus a', torus(), '#e8794a'),
    hullBody('cone a', cone(), '#7bc67b'),
    hullBody('torus b', torus(), '#f2c14e'),
    hullBody('cone b', cone(), '#4ab3e8'),
    addBody(app, { shape: 'sphere', name: 'ball a', size: 0.9, colour: '#a78bfa' }),
    addBody(app, { shape: 'sphere', name: 'ball b', size: 0.9, colour: '#ec6fa9' }),
  ];

  const drop = (): void =>
    pieces.forEach((p, i) => {
      const a = (i / pieces.length) * Math.PI * 2;
      respawn(p, [Math.cos(a) * 2.2, 5 + i * 1.3, Math.sin(a) * 2.2], [Math.random() * 90, 0, Math.random() * 90]);
    });
  drop();
  every(app, 8, drop);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout('bowl: triangle mesh (static only)   torus and cone: convexHull   balls: sphere shape');
    panel.row();
    panel.button('Drop again', drop);
  }

  return () => scene.dispose();
};

export default mount;
