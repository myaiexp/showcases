// Nine geometry classes, each turned into a Mesh by Mesh.fromGeometry
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addSun, colorMaterial } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const COLOURS = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa', '#f472b6', '#9ae6ff', '#c8a165', '#ff8fab'];

/** One geometry per class; n is the subdivision level the panel changes. */
function geometries(n: number): [string, pc.Geometry][] {
  return [
    ['BoxGeometry', new pc.BoxGeometry({ halfExtents: new pc.Vec3(0.5, 0.5, 0.5), widthSegments: n, lengthSegments: n, heightSegments: n })],
    ['PlaneGeometry', new pc.PlaneGeometry({ halfExtents: new pc.Vec2(0.7, 0.7), widthSegments: n, lengthSegments: n })],
    ['SphereGeometry', new pc.SphereGeometry({ radius: 0.6, latitudeBands: n * 2, longitudeBands: n * 2 })],
    ['CapsuleGeometry', new pc.CapsuleGeometry({ radius: 0.35, height: 1.3, heightSegments: n, sides: n * 2 })],
    ['CylinderGeometry', new pc.CylinderGeometry({ radius: 0.5, height: 1.1, heightSegments: n, capSegments: n * 2 })],
    ['ConeGeometry', new pc.ConeGeometry({ baseRadius: 0.6, peakRadius: 0.15, height: 1.2, heightSegments: n, capSegments: n * 2 })],
    ['TorusGeometry', new pc.TorusGeometry({ tubeRadius: 0.2, ringRadius: 0.5, segments: n * 3, sides: n * 2 })],
    ['CircleGeometry', new pc.CircleGeometry({ radius: 0.7, sectors: n * 3, rings: Math.max(1, Math.floor(n / 2)) })],
    ['DomeGeometry', new pc.DomeGeometry({ latitudeBands: n, longitudeBands: n * 2 })],
  ];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 50, 25);

  let level = ctx.preview ? 6 : 8;
  // Each shape is an entity whose render component holds a MeshInstance(mesh, material).
  const instances: pc.MeshInstance[] = [];
  const entities = geometries(level).map(([name, geometry], i) => {
    const mesh = pc.Mesh.fromGeometry(device, geometry);
    const instance = new pc.MeshInstance(mesh, colorMaterial(COLOURS[i]!, { cull: pc.CULLFACE_NONE }));
    instances.push(instance);
    const entity = new pc.Entity(name);
    entity.addComponent('render', { meshInstances: [instance] });
    entity.setLocalPosition(((i % 3) - 1) * 2, 1.6 - Math.floor(i / 3) * 1.8, 0);
    app.root.addChild(entity);
    return entity;
  });

  // Rebuild every mesh at a new subdivision level and swap it into its mesh instance.
  const rebuild = (n: number): void => {
    geometries(n).forEach(([, geometry], i) => {
      const old = instances[i]!.mesh;
      instances[i]!.mesh = pc.Mesh.fromGeometry(device, geometry);
      old?.destroy();
    });
  };

  const camera = addCamera(app);
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0.1, 0), distance: 9.5, pitch: -12, yaw: 0, autoRotate: 0, interactive: !ctx.preview });

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    entities.forEach((e, i) => e.setLocalEulerAngles(25 + Math.sin(t * 0.5) * 10, t * (20 + i * 4), 0));
    if (ctx.preview) {
      // Cards pulse the subdivision level and show the edges.
      const wire = Math.floor(t / 4) % 2 === 1;
      for (const mi of instances) mi.renderStyle = wire ? pc.RENDERSTYLE_WIREFRAME : pc.RENDERSTYLE_SOLID;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('subdivisions', 1, 16, 1, level, (v) => {
      level = v;
      rebuild(v);
    });
    panel.check('wireframe', false, (on) => {
      for (const mi of instances) mi.renderStyle = on ? pc.RENDERSTYLE_WIREFRAME : pc.RENDERSTYLE_SOLID;
    });
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
