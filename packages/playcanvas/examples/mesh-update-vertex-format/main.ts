// Changing a mesh's vertex format: clear(), set every stream, reassign the mesh
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 50, 30, { castShadows: true, shadowDistance: 15 });
  addGround(app, '#3a4152', 12).setLocalPosition(0, -1.2, 0);

  const mesh = pc.Mesh.fromGeometry(device, new pc.TorusGeometry({ tubeRadius: 0.45, ringRadius: 1, segments: 48, sides: 24 }));
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color(0.85, 0.85, 0.9);
  material.useMetalness = true;
  material.gloss = 0.6;
  material.update();
  const instance = new pc.MeshInstance(mesh, material);
  const entity = new pc.Entity('torus');
  entity.addComponent('render', { meshInstances: [instance] });
  app.root.addChild(entity);

  // Read the existing streams back so they can be set again after clear().
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  mesh.getPositions(positions);
  mesh.getNormals(normals);
  mesh.getUvs(0, uvs);
  mesh.getIndices(indices);

  const setColoured = (withColors: boolean): void => {
    // clear() discards the vertex format; the next update() builds new buffers from what is set.
    mesh.clear();
    mesh.setPositions(positions);
    mesh.setNormals(normals);
    mesh.setUvs(0, uvs);
    if (withColors) {
      const colors = new Uint8Array((positions.length / 3) * 4);
      for (let i = 0; i < positions.length / 3; i++) {
        const angle = Math.atan2(positions[i * 3 + 2]!, positions[i * 3]!);
        const hue = (angle / (Math.PI * 2) + 1) % 1;
        const c = new pc.Color().fromString('#ffffff');
        // A rainbow around the ring from a simple hue wheel.
        c.r = 0.5 + 0.5 * Math.cos((hue + 0) * 6.283);
        c.g = 0.5 + 0.5 * Math.cos((hue + 0.33) * 6.283);
        c.b = 0.5 + 0.5 * Math.cos((hue + 0.67) * 6.283);
        colors.set([c.r * 255, c.g * 255, c.b * 255, 255], i * 4);
      }
      mesh.setColors32(colors);
    }
    mesh.setIndices(indices);
    mesh.update();
    material.diffuseVertexColor = withColors;
    material.update();
    // Shaders are set up for a mesh's vertex streams when it is assigned, so assign it again.
    instance.mesh = mesh;
  };

  const camera = addCamera(app);
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0, 0), distance: 6.5, pitch: -25, autoRotate: 20, interactive: !ctx.preview });

  let has = false;
  let t = 0;
  let next = 0;
  app.on('update', (dt: number) => {
    t += dt;
    entity.setEulerAngles(60 + Math.sin(t * 0.5) * 10, 0, 0);
    // Cards flip the format every few seconds by themselves.
    if (ctx.preview && t > next) {
      next = t + 2.5;
      has = !has;
      setColoured(has);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const readout = panel.readout('streams: position, normal, uv');
    panel.check('add colour stream (setColors32)', false, (on) => {
      setColoured(on);
      readout.textContent = on ? 'streams: position, normal, uv, colour' : 'streams: position, normal, uv';
    });
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
