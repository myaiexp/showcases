// Updating a mesh every frame: new positions and normals, one update() call, streams kept
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { checkerTexture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 50, 20);

  const state = { cells: ctx.preview ? 28 : 44, amplitude: 0.8, speed: 1.4, bounds: true };
  const size = 10;

  // Texture coordinates and indices never change, so they are set once.
  const build = (cells: number): { mesh: pc.Mesh; positions: Float32Array; indices: number[] } => {
    const side = cells + 1;
    const positions = new Float32Array(side * side * 3);
    const uvs = new Float32Array(side * side * 2);
    const indices: number[] = [];
    for (let z = 0; z < side; z++) {
      for (let x = 0; x < side; x++) {
        const v = z * side + x;
        positions[v * 3] = (x / cells - 0.5) * size;
        positions[v * 3 + 2] = (z / cells - 0.5) * size;
        uvs[v * 2] = x / cells;
        uvs[v * 2 + 1] = 1 - z / cells;
        if (x < cells && z < cells) indices.push(v, v + side, v + 1, v + 1, v + side, v + side + 1);
      }
    }
    const mesh = new pc.Mesh(device);
    mesh.setPositions(positions);
    mesh.setNormals(pc.calculateNormals(positions, indices));
    mesh.setUvs(0, uvs);
    mesh.setIndices(indices);
    mesh.update();
    return { mesh, positions, indices };
  };

  let grid = build(state.cells);
  const checker = checkerTexture(device, '#e8f0ff', '#4a7bb5', 22);
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color(1, 1, 1);
  material.diffuseMap = checker;
  material.cull = pc.CULLFACE_NONE;
  material.useMetalness = true;
  material.gloss = 0.8;
  material.update();
  const instance = new pc.MeshInstance(grid.mesh, material);
  const entity = new pc.Entity('grid');
  entity.addComponent('render', { meshInstances: [instance] });
  app.root.addChild(entity);

  const camera = addCamera(app, { clearColor: new pc.Color(0.05, 0.07, 0.12) });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0, 0), distance: 13, pitch: -35, autoRotate: 12, interactive: !ctx.preview });

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt * state.speed;
    const { positions, indices, mesh } = grid;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]!;
      const z = positions[i + 2]!;
      const d = Math.hypot(x, z);
      positions[i + 1] = (Math.sin(d * 1.6 - t * 2.2) / (1 + d * 0.35) + Math.sin(x * 0.9 + t) * 0.25) * state.amplitude;
    }
    // Only positions and normals change; the other streams keep their data.
    mesh.setPositions(positions);
    mesh.setNormals(pc.calculateNormals(positions, indices));
    // update(type, false) keeps the current bounding box instead of recomputing it.
    mesh.update(pc.PRIMITIVE_TRIANGLES, state.bounds);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('amplitude', 0, 2, 0.05, state.amplitude, (v) => (state.amplitude = v));
    panel.slider('speed', 0, 4, 0.1, state.speed, (v) => (state.speed = v));
    panel.slider('cells', 4, 100, 1, state.cells, (v) => {
      // A different vertex count needs a fresh mesh.
      state.cells = v;
      grid = build(v);
      const old = instance.mesh;
      instance.mesh = grid.mesh;
      old?.destroy();
    });
    panel.check('recompute bounding box', true, (on) => (state.bounds = on));
  }

  return () => {
    orbit.dispose();
    checker.destroy();
    stage.dispose();
  };
};

export default mount;
