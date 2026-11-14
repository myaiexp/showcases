// MeshInstance.renderStyle draws one mesh as solid triangles, a wireframe or points; visible hides it
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addSun, colorMaterial } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const STYLES = ['RENDERSTYLE_SOLID', 'RENDERSTYLE_WIREFRAME', 'RENDERSTYLE_POINTS'] as const;
const VALUES = [pc.RENDERSTYLE_SOLID, pc.RENDERSTYLE_WIREFRAME, pc.RENDERSTYLE_POINTS];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 50, 30, { castShadows: true, shadowDistance: 20 });
  addGround(app, '#3a4152', 14);

  // One shared mesh, three mesh instances: the style belongs to the instance, not the mesh.
  const mesh = pc.Mesh.fromGeometry(device, new pc.TorusGeometry({ tubeRadius: 0.35, ringRadius: 0.8, segments: 28, sides: 14 }));
  const materials = ['#e8794a', '#4ab3e8', '#7bc67b'].map((hex) => colorMaterial(hex, { emissive: new pc.Color().fromString(hex).mulScalar(0.25) }));
  const instances = materials.map((m) => new pc.MeshInstance(mesh, m));
  const entities = instances.map((instance, i) => {
    const entity = new pc.Entity(STYLES[i]);
    entity.addComponent('render', { meshInstances: [instance], castShadows: true });
    entity.setLocalPosition((i - 1) * 2.6, 1.2, 0);
    app.root.addChild(entity);
    return entity;
  });
  instances[1]!.renderStyle = pc.RENDERSTYLE_WIREFRAME;
  instances[2]!.renderStyle = pc.RENDERSTYLE_POINTS;

  const camera = addCamera(app);
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 1, 0), distance: 9, pitch: -22, autoRotate: 8, interactive: !ctx.preview });

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    entities.forEach((e, i) => e.setLocalEulerAngles(70, t * (25 + i * 10), 0));
    // Cards rotate the three styles around the row.
    if (ctx.preview) {
      const shift = Math.floor(t / 2.5);
      instances.forEach((mi, i) => (mi.renderStyle = VALUES[(i + shift) % 3]!));
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    instances.forEach((mi, i) => {
      panel.select(`instance ${i + 1} renderStyle`, STYLES, STYLES[i]!, (v) => (mi.renderStyle = VALUES[STYLES.indexOf(v)]!));
    });
    panel.row();
    instances.forEach((mi, i) => panel.check(`instance ${i + 1} visible`, true, (on) => (mi.visible = on)));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
