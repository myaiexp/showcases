// One mesh, many mesh instances: change its vertices and every placement changes with it
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addSun, colorMaterial } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 50, 30, { castShadows: true, shadowDistance: 20 });
  addGround(app, '#3a4152', 16);

  const shared = pc.Mesh.fromGeometry(device, new pc.SphereGeometry({ radius: 0.8, latitudeBands: 32, longitudeBands: 32 }));
  const base: number[] = [];
  shared.getPositions(base);
  const indices: number[] = [];
  shared.getIndices(indices);

  // Four placements share one mesh, each with its own material: a mesh has no material of its own.
  const colours = ['#e8794a', '#f2c14e', '#4ab3e8', '#a78bfa'];
  const entities = colours.map((hex, i) => {
    const entity = new pc.Entity(`shared-${i}`);
    entity.addComponent('render', { meshInstances: [new pc.MeshInstance(shared, colorMaterial(hex))] });
    entity.setLocalPosition(-3.6 + i * 2.4, 1, i % 2 ? 1 : -1);
    app.root.addChild(entity);
    return entity;
  });

  // The fifth entity gets a mesh of its own, so it is not touched.
  const own = pc.Mesh.fromGeometry(device, new pc.SphereGeometry({ radius: 0.8, latitudeBands: 32, longitudeBands: 32 }));
  const loner = new pc.Entity('own-mesh');
  loner.addComponent('render', { meshInstances: [new pc.MeshInstance(own, colorMaterial('#7bc67b'))] });
  loner.setLocalPosition(0, 1, 3.4);
  app.root.addChild(loner);

  // The primitive types share one mesh per device too: this entity's mesh is the same object as the next one's.
  const boxA = new pc.Entity('box-a');
  boxA.addComponent('render', { type: 'box' });
  boxA.setLocalPosition(-2, 0.5, -3.6);
  const boxB = new pc.Entity('box-b');
  boxB.addComponent('render', { type: 'box' });
  boxB.setLocalPosition(2, 0.5, -3.6);
  app.root.addChild(boxA);
  app.root.addChild(boxB);
  const boxMesh = boxA.render!.meshInstances[0]!.mesh!;
  const boxBase: number[] = [];
  boxMesh.getPositions(boxBase);

  const state = { wobble: ctx.preview ? 0.35 : 0.3, mutateBoxes: false };
  const positions = new Float32Array(base.length);
  const boxPositions = new Float32Array(boxBase.length);
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    for (let i = 0; i < base.length; i += 3) {
      const x = base[i]!;
      const y = base[i + 1]!;
      const z = base[i + 2]!;
      const k = 1 + Math.sin(y * 4 + t * 3) * state.wobble * 0.5 + Math.sin(x * 3 - t * 2) * state.wobble * 0.3;
      positions[i] = x * k;
      positions[i + 1] = y;
      positions[i + 2] = z * k;
    }
    shared.setPositions(positions);
    shared.setNormals(pc.calculateNormals(positions, indices));
    shared.update();
    if (state.mutateBoxes) {
      for (let i = 0; i < boxBase.length; i += 3) {
        boxPositions[i] = boxBase[i]! * (1 + Math.sin(t * 2) * 0.25);
        boxPositions[i + 1] = boxBase[i + 1]! * (1 + Math.cos(t * 2) * 0.4);
        boxPositions[i + 2] = boxBase[i + 2]!;
      }
      boxMesh.setPositions(boxPositions);
      boxMesh.update();
    }
    entities.forEach((e, i) => e.setLocalEulerAngles(0, t * (20 + i * 5), 0));
  });

  const camera = addCamera(app);
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 1, 0), distance: 12, pitch: -28, autoRotate: 8, interactive: !ctx.preview });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('wobble of the shared mesh', 0, 1, 0.05, state.wobble, (v) => (state.wobble = v));
    panel.check('also edit the shared box mesh (changes every box primitive)', false, (on) => {
      state.mutateBoxes = on;
      if (!on) {
        boxMesh.setPositions(boxBase);
        boxMesh.update();
      }
    });
    panel.readout(`same mesh: ${boxA.render!.meshInstances[0]!.mesh === boxB.render!.meshInstances[0]!.mesh}`);
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
