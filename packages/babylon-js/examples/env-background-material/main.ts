// BackgroundMaterial: unlit ground with shadows, a mirror and a tint
import {
  ArcRotateCamera,
  BackgroundMaterial,
  Color3,
  DirectionalLight,
  DynamicTexture,
  HemisphericLight,
  MeshBuilder,
  MirrorTexture,
  Plane,
  ShadowGenerator,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 12, new Vector3(0, 1, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('sky', new Vector3(0, 1, 0), scene).intensity = 0.5;
  const sun = new DirectionalLight('sun', new Vector3(-1, -2, 1), scene);
  sun.position = new Vector3(10, 20, -10);

  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
  sphere.position.y = 1.5;
  const sphereMat = new StandardMaterial('sphere', scene);
  sphereMat.diffuseColor = new Color3(1, 0.5, 0.25);
  sphere.material = sphereMat;

  // A radial-gradient ground texture with alpha, painted in code.
  const groundTex = new DynamicTexture('ground', { width: 512, height: 512 }, scene);
  const g = groundTex.getContext();
  const grad = g.createRadialGradient(256, 256, 0, 256, 256, 256);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.7, 'rgba(200,200,200,0.8)');
  grad.addColorStop(1, 'rgba(200,200,200,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 512);
  groundTex.update();
  groundTex.hasAlpha = true;

  const ground = MeshBuilder.CreateGround('ground', { width: 14, height: 14 }, scene);
  const bg = new BackgroundMaterial('backgroundMaterial', scene);
  bg.diffuseTexture = groundTex;
  // Unlit, but it receives shadows; shadowLevel lightens them.
  bg.shadowLevel = 0.4;
  bg.opacityFresnel = false;
  ground.material = bg;
  ground.receiveShadows = true;
  const shadows = new ShadowGenerator(1024, sun);
  shadows.addShadowCaster(sphere);
  shadows.useBlurExponentialShadowMap = true;

  // A mirror reflection, mixed by reflection fresnel.
  const mirror = new MirrorTexture('mirror', 512, scene);
  mirror.mirrorPlane = new Plane(0, -1, 0, 0);
  mirror.renderList!.push(sphere);
  bg.reflectionTexture = mirror;
  bg.reflectionFresnel = true;
  bg.reflectionStandardFresnelWeight = 0.8;

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('shadowLevel', 0, 1, 0.05, bg.shadowLevel, (v) => (bg.shadowLevel = v));
    panel.check('shadowOnly', false, (on) => (bg.shadowOnly = on));
    panel.check('opacityFresnel', false, (on) => (bg.opacityFresnel = on));
    panel.check('mirror reflection', true, (on) => (bg.reflectionTexture = on ? mirror : null));
    panel.row();
    // With useRGBColor off, the texture is read as grey levels and tinted by primaryColor.
    panel.check('useRGBColor', true, (on) => (bg.useRGBColor = on));
    panel.select('primaryColor', ['Magenta', 'Teal', 'Yellow'] as const, 'Magenta', (v) => (bg.primaryColor = Color3[v]()));
  }
  bg.primaryColor = Color3.Magenta();

  let t = 0;
  stage.run(() => {
    t += 0.02;
    sphere.position.y = 1.5 + Math.sin(t) * 0.8;
    sphere.position.x = Math.cos(t * 0.5) * 2;
  });

  return () => stage.dispose();
};

export default mount;
