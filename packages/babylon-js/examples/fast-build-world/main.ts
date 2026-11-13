// createDefaultCameraOrLight and createDefaultEnvironment for a quick world
import { ArcRotateCamera, Color3, Color4, MeshBuilder, StandardMaterial } from '@babylonjs/core';
import type { EnvironmentHelper, IEnvironmentHelperOptions, Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { createGroundFade, createSkyCube } from './sky.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);

  // Only models: no camera, no light, no environment yet.
  const mat = (name: string, c: Color3): StandardMaterial => Object.assign(new StandardMaterial(name, scene), { diffuseColor: c });
  const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
  box.position.set(-2, 1, 0);
  box.material = mat('box-mat', new Color3(0.9, 0.5, 0.25));
  const ball = MeshBuilder.CreateSphere('ball', { diameter: 2 }, scene);
  ball.position.set(2, 1, 0);
  ball.material = mat('ball-mat', new Color3(0.3, 0.6, 0.9));
  const extras: Mesh[] = [];

  // createDefaultCameraOrLight(createArcRotateCamera, replace, attachCameraControls)
  scene.createDefaultCameraOrLight(true, true, !ctx.preview);

  // The default textures come from a CDN, so ours are passed in as ready-made textures.
  const sky = createSkyCube(scene);
  const fade = createGroundFade(scene);
  let helper: EnvironmentHelper;
  const options = { createSkybox: true, enableGroundMirror: false, groundYBias: 0.01, color: Color3.Teal() };
  const build = (): void => {
    helper?.dispose();
    const helperOptions: Partial<IEnvironmentHelperOptions> = {
      skyboxTexture: sky,
      environmentTexture: sky,
      groundTexture: fade,
      createSkybox: options.createSkybox,
      enableGroundMirror: options.enableGroundMirror,
      groundYBias: options.groundYBias,
    };
    helper = scene.createDefaultEnvironment(helperOptions)!;
    // The returned helper can be adjusted afterwards.
    helper.setMainColor(options.color);
  };
  build();

  let t = 0;
  stage.run(() => {
    t += stage.engine.getDeltaTime() / 1000;
    if (ctx.preview) {
      (scene.activeCamera as ArcRotateCamera).alpha += 0.005;
      helper.setMainColor(Color3.FromHSV((t * 30) % 360, 0.5, 0.8));
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('createSkybox', true, (on) => ((options.createSkybox = on), build()));
    panel.check('enableGroundMirror', false, (on) => ((options.enableGroundMirror = on), build()));
    panel.slider('groundYBias', 0, 0.1, 0.005, options.groundYBias, (v) => ((options.groundYBias = v), build()));
    panel.select('setMainColor', ['Teal', 'Purple', 'Gray'] as const, 'Teal', (v) => {
      options.color = v === 'Teal' ? Color3.Teal() : v === 'Purple' ? Color3.Purple() : Color3.Gray();
      helper.setMainColor(options.color);
    });
    panel.row();
    panel.button('Add a big box and re-run createDefaultCamera', () => {
      const big = MeshBuilder.CreateBox(`big${extras.length}`, { size: 8 }, scene);
      big.position.set(8 + extras.length * 10, 4, 0);
      big.material = box.material;
      extras.push(big);
      scene.createDefaultCamera(true, true, true); // the camera frames every mesh again
    });
    panel.readout('The camera, light, skybox and ground adapt to the meshes in the scene.');
  }

  return () => stage.dispose();
};

export default mount;
