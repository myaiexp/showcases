// Directional, omni and spot lights: one light entity, switched between the three types
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addSceneryRing, addShape } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const TYPES = ['directional', 'omni', 'spot'] as const;
type LightType = (typeof TYPES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.05, 0.05, 0.08);

  addGround(app, '#4a5163', 16);
  addSceneryRing(app, 8, 4);
  addShape(app, 'cylinder', '#cfd5e1', [0, 1.25, 0], [1.2, 2.5, 1.2]);

  const light = new pc.Entity('light');
  light.addComponent('light', {
    type: 'spot', color: new pc.Color(1, 0.95, 0.85), intensity: 2, range: 16,
    innerConeAngle: 20, outerConeAngle: 40, castShadows: true, shadowResolution: 1024, shadowDistance: 20, normalOffsetBias: 0.05,
  });
  app.root.addChild(light);

  // A bulb that marks where the omni and spot lights sit.
  const bulb = addShape(app, 'sphere', '#ffffff', [0, 0, 0], 0.4, { castShadows: false });
  const bulbMaterial = new pc.StandardMaterial();
  bulbMaterial.emissive = new pc.Color(1, 0.95, 0.7);
  bulbMaterial.useLighting = false;
  bulbMaterial.update();
  bulb.render!.meshInstances[0]!.material = bulbMaterial;

  const state = { type: 'spot' as LightType, auto: ctx.preview };
  const setType = (type: LightType): void => {
    state.type = type;
    light.light!.type = type;
    bulb.enabled = type !== 'directional';
  };
  setType('spot');

  const camera = addCamera(app, { clearColor: new pc.Color(0.03, 0.04, 0.07) });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 1, 0), distance: 13, pitch: -30, autoRotate: 5, interactive: !ctx.preview });

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (state.auto) setType(TYPES[Math.floor(t / 3.5) % 3]!);
    // The light circles the scene. Directional and spot lights shine along their -Y axis, and
    // lookAt aims -Z, so a quarter turn afterwards points -Y at the target.
    const a = t * 0.6;
    light.setPosition(Math.cos(a) * 4.5, 5.5 + Math.sin(t * 0.9), Math.sin(a) * 4.5);
    light.lookAt(0, 1, 0);
    light.rotateLocal(90, 0, 0);
    bulb.setPosition(light.getPosition());
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('type', TYPES, 'spot', (v) => setType(v));
    panel.slider('intensity', 0, 6, 0.1, 2, (v) => (light.light!.intensity = v));
    panel.slider('range (omni, spot)', 2, 30, 0.5, 16, (v) => (light.light!.range = v));
    panel.row();
    panel.slider('innerConeAngle', 0, 60, 1, 20, (v) => (light.light!.innerConeAngle = v));
    panel.slider('outerConeAngle', 10, 90, 1, 40, (v) => (light.light!.outerConeAngle = v));
    panel.check('castShadows', true, (on) => (light.light!.castShadows = on));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
