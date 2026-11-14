// Multi-draw: 64 terrain patches in one mesh instance, culled per frame
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { createPanel } from '../../shared/panel.ts';

const PATCHES = 8; // patches per side
const QUADS = 8; // quads per patch side
const SIZE = 3; // world size of a patch
const VERTS = QUADS + 1;

const height = (x: number, z: number): number => Math.sin(x * 0.45) * Math.cos(z * 0.38) * 1.6 + Math.sin((x + z) * 0.2) * 1.2;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, distance: 24, pitch: -38, autoRotate: 8, sun: { angles: [55, 35, 0], shadows: false } });
  const { app } = scene;
  const device = app.graphicsDevice;

  // Combine every patch into one mesh, and remember each patch's slice of the index buffer.
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const subDraws: { firstIndex: number; indexCount: number; x: number; z: number }[] = [];
  const half = (PATCHES * SIZE) / 2;
  for (let pz = 0; pz < PATCHES; pz++) {
    for (let px = 0; px < PATCHES; px++) {
      const base = positions.length / 3;
      const firstIndex = indices.length;
      for (let j = 0; j < VERTS; j++) {
        for (let i = 0; i < VERTS; i++) {
          const x = -half + px * SIZE + (i / QUADS) * SIZE;
          const z = -half + pz * SIZE + (j / QUADS) * SIZE;
          const y = height(x, z);
          positions.push(x, y, z);
          const k = pc.math.clamp((y + 2.8) / 5.6, 0, 1);
          colors.push(Math.round(60 + k * 170), Math.round(120 + k * 90 - (1 - k) * 20), Math.round(70 + k * 120), 255);
        }
      }
      for (let j = 0; j < QUADS; j++) {
        for (let i = 0; i < QUADS; i++) {
          const a = base + j * VERTS + i;
          indices.push(a, a + VERTS, a + 1, a + 1, a + VERTS, a + VERTS + 1);
        }
      }
      subDraws.push({ firstIndex, indexCount: indices.length - firstIndex, x: -half + (px + 0.5) * SIZE, z: -half + (pz + 0.5) * SIZE });
    }
  }
  const mesh = new pc.Mesh(device);
  mesh.setPositions(positions);
  mesh.setNormals(pc.calculateNormals(positions, indices));
  mesh.setColors32(colors);
  mesh.setIndices(indices);
  mesh.update();

  const material = new pc.StandardMaterial();
  material.diffuseVertexColor = true;
  material.gloss = 0.2;
  material.useMetalness = true;
  material.update();
  const node = new pc.GraphNode('Terrain');
  const meshInstance = new pc.MeshInstance(mesh, material, node);
  const layer = app.scene.layers.getLayerById(pc.LAYERID_WORLD)!;
  layer.addMeshInstances([meshInstance]);

  // One call renders every active sub-draw: allocate the most we may draw, add them, update(count).
  const cmd = meshInstance.setMultiDraw(null, subDraws.length)!;
  let radius = 9;
  let culling = true;
  let t = 0;
  let readout: HTMLElement | null = null;
  const marker = new pc.Entity('focus');
  const markerMaterial = new pc.StandardMaterial();
  markerMaterial.emissive = new pc.Color(1, 0.8, 0.3);
  markerMaterial.update();
  marker.addComponent('render', { type: 'sphere', material: markerMaterial, castShadows: false });
  marker.setLocalScale(0.5, 0.5, 0.5);
  app.root.addChild(marker);

  app.on('update', (dt: number) => {
    t += dt;
    const fx = Math.cos(t * 0.45) * 8;
    const fz = Math.sin(t * 0.6) * 8;
    marker.setLocalPosition(fx, height(fx, fz) + 1, fz);
    let active = 0;
    for (const s of subDraws) {
      if (culling && Math.hypot(s.x - fx, s.z - fz) > radius) continue;
      cmd.add(active++, s.indexCount, 1, s.firstIndex, 0, 0);
    }
    cmd.update(active);
    if (readout) readout.textContent = `${active} of ${subDraws.length} patches, multi-draw ${device.supportsMultiDraw ? 'supported' : 'unsupported: engine loops single draws'}`;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('radius around the marker', 2, 20, 0.5, radius, (v) => (radius = v));
    panel.check('cull patches', true, (on) => (culling = on));
    panel.row();
    readout = panel.readout();
  }

  return () => {
    layer.removeMeshInstances([meshInstance]);
    meshInstance.destroy();
    markerMaterial.destroy();
    material.destroy();
    scene.dispose();
  };
};

export default mount;
