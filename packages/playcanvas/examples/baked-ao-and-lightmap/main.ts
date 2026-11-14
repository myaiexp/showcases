// Baked textures: an aoMap multiplies ambient light, a lightMap adds pre-computed light on UV1
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addShape, addSun, colorMaterial } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { canvasTexture } from '../../shared/textures.ts';

const BLOBS: [number, number][] = [[-2, -2], [2, -2], [-2, 2], [2, 2]];
const SIZE = 12;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;

  // Occlusion painted where the four objects stand: white is open sky, dark is blocked ambient light.
  const aoTexture = canvasTexture(device, (g, s) => {
    g.fillStyle = '#fff';
    g.fillRect(0, 0, s, s);
    for (const [x, z] of BLOBS) {
      const cx = (x / SIZE + 0.5) * s;
      const cy = (z / SIZE + 0.5) * s;
      const grad = g.createRadialGradient(cx, cy, 0, cx, cy, s * 0.17);
      grad.addColorStop(0, 'rgba(0,0,0,0.95)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, s, s);
    }
  }, { name: 'ao', srgb: false, size: 256, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE });

  // Light pools, as an offline baker would write them: warm along x, cool along z.
  const lightTexture = canvasTexture(device, (g, s) => {
    g.fillStyle = '#000';
    g.fillRect(0, 0, s, s);
    g.globalCompositeOperation = 'lighter';
    const pools: [number, number, string][] = [[0.88, 0.5, '255,160,70'], [0.12, 0.5, '255,160,70'], [0.5, 0.88, '70,150,255'], [0.5, 0.12, '70,150,255']];
    for (const [u, v, rgb] of pools) {
      const grad = g.createRadialGradient(u * s, v * s, 0, u * s, v * s, s * 0.3);
      grad.addColorStop(0, `rgba(${rgb},0.9)`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, s, s);
    }
  }, { name: 'lightmap', size: 256, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE });

  const state = { ambient: 0.7, ao: true, lightmap: true };
  const floorMaterial = colorMaterial('#d8dce6', { aoMap: aoTexture, aoMapUv: 0, lightMap: lightTexture, lightMapUv: 1, lightMapChannel: 'rgb' });
  const floor = new pc.Entity('floor');
  floor.addComponent('render', { type: 'plane', material: floorMaterial, castShadows: false });
  floor.setLocalScale(SIZE, 1, SIZE);
  app.root.addChild(floor);

  for (const [x, z] of BLOBS) addShape(app, x * z > 0 ? 'sphere' : 'box', '#e8e2d6', [x, 0.7, z], 1.4);

  addSun(app, 60, 20, { intensity: 0.35 });
  const camera = addCamera(app, { clearColor: new pc.Color(0.05, 0.06, 0.09) });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0, 0), distance: 12, pitch: -42, autoRotate: 8, interactive: !ctx.preview });

  const apply = (): void => {
    app.scene.ambientLight = new pc.Color(state.ambient, state.ambient, state.ambient * 1.1);
    floorMaterial.aoMap = state.ao ? aoTexture : null;
    floorMaterial.lightMap = state.lightmap ? lightTexture : null;
    floorMaterial.update();
  };
  apply();

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (!ctx.preview) return;
    // Cards switch the textures on and off in turn.
    const phase = Math.floor(t / 2) % 4;
    state.ao = phase === 1 || phase === 3;
    state.lightmap = phase === 2 || phase === 3;
    apply();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('aoMap (multiplies ambient light)', true, (on) => ((state.ao = on), apply()));
    panel.check('lightMap (UV1)', true, (on) => ((state.lightmap = on), apply()));
    panel.slider('ambient light', 0, 1.5, 0.05, state.ambient, (v) => ((state.ambient = v), apply()));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
    aoTexture.destroy();
    lightTexture.destroy();
  };
};

export default mount;
