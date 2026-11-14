// Image based lighting: an HDR image filled in code becomes skybox and envAtlas
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createRig, daySky, equirectTexture, pbrMaterial, sphereGrid, sway } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 8.5, pitch: -6, yaw: 0, toneMapping: pc.TONEMAP_NEUTRAL });
  const { app, stage } = rig;
  sway(app, rig.orbit, 28);

  // 1. The source: an equirect half-float texture whose sun and softboxes are far above 1.0.
  const source = rig.own(equirectTexture(stage.device, daySky(), 256));
  // 2. The sharp skybox cubemap, for the background.
  const skybox = rig.own(pc.EnvLighting.generateSkyboxCubemap(source, 256));
  // 3. The prefiltered lighting atlas: blurred reflections per roughness plus ambient light.
  const lighting = pc.EnvLighting.generateLightingSource(source);
  const envAtlas = rig.own(pc.EnvLighting.generateAtlas(lighting, { numReflectionSamples: 384, numAmbientSamples: 768 }));
  lighting.destroy();

  const scene = app.scene;
  scene.skybox = skybox;
  scene.envAtlas = envAtlas;

  sphereGrid(app, 5, 2, (col, row) => pbrMaterial('#d8a24a', { gloss: 0.1 + col * 0.22, metalness: row === 0 ? 1 : 0 }), 1.15, 0.5);

  // The source image itself, drawn flat in the corner by the debug TextureRenderer.
  const textures = new pc.TextureRenderer(app);
  app.on('update', () => textures.draw(source, 0.02, 0.03, 0.3, 0.15));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('scene.envAtlas (lighting)', true, (on) => (scene.envAtlas = on ? envAtlas : null));
    panel.check('scene.skybox (background)', true, (on) => (scene.skybox = on ? skybox : null));
    panel.slider('skyboxIntensity', 0, 3, 0.05, 1, (v) => (scene.skyboxIntensity = v));
    panel.readout('top row metal, bottom row plastic; gloss rises to the right');
  }
  return () => {
    scene.skybox = null;
    scene.envAtlas = null;
    rig.dispose();
  };
};

export default mount;
