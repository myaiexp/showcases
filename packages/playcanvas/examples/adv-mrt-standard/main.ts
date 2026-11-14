// Multiple render targets: StandardMaterial outputPS writes normals and gloss
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick } from '../../shared/shaders.ts';

// Targets 1 and 2 only exist while the MRT camera renders its custom shader pass, hence the guard.
// Target 0 (pcFragColor0) keeps the standard forward output.
const glslChunk = /* glsl */ `
    #ifdef MYMRT_PASS
        pcFragColor1 = vec4(litArgs_worldNormal * 0.5 + 0.5, 1.0);
        pcFragColor2 = vec4(vec3(litArgs_gloss), 1.0);
    #endif
`;
const wgslChunk = /* wgsl */ `
    #ifdef MYMRT_PASS
        output.color1 = vec4f(litArgs_worldNormal * 0.5 + 0.5, 1.0);
        output.color2 = vec4f(vec3f(litArgs_gloss), 1.0);
    #endif
`;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { distance: 9, pitch: -24, autoRotate: 10 });
  const { app, stage } = scene;
  const device = stage.device;

  // Three shapes with different gloss, each with the output chunks set on its material.
  const materials = [0.15, 0.55, 0.95].map((gloss, i) => {
    const m = colorMaterial(['#e8794a', '#4ab3e8', '#f2c14e'][i]!, { gloss });
    m.getShaderChunks(pc.SHADERLANGUAGE_GLSL).set('outputPS', glslChunk);
    m.getShaderChunks(pc.SHADERLANGUAGE_WGSL).set('outputPS', wgslChunk);
    m.shaderChunksVersion = '2.8';
    m.update();
    return m;
  });
  const shapes = (['sphere', 'torus', 'box'] as const).map((type, i) => {
    const e = new pc.Entity(type);
    e.addComponent('render', { type, material: materials[i], castShadows: true });
    e.setLocalPosition((i - 1) * 2.8, 1, 0);
    e.setLocalScale(1.7, 1.7, 1.7);
    app.root.addChild(e);
    return e;
  });
  onTick(app, (t) => shapes.forEach((s, i) => s.setLocalEulerAngles(t * 25 + i * 40, t * 35, 0)));

  // Three textures of one size, wrapped in one render target.
  const [w, h] = ctx.preview ? [256, 192] : [512, 384];
  const textures = ['colour', 'normal', 'gloss'].map(
    (name) =>
      new pc.Texture(device, {
        name: `MRT ${name}`,
        width: w,
        height: h,
        format: pc.PIXELFORMAT_RGBA8,
        minFilter: pc.FILTER_LINEAR,
        magFilter: pc.FILTER_LINEAR,
        addressU: pc.ADDRESS_CLAMP_TO_EDGE,
        addressV: pc.ADDRESS_CLAMP_TO_EDGE,
        mipmaps: false,
      }),
  );
  const target = new pc.RenderTarget({ name: 'MRT', colorBuffers: textures, depth: true, origin: pc.RENDERTARGET_ORIGIN_TOP });

  // A second camera that follows the main one, negative priority so it renders first.
  const mrtCamera = new pc.Entity('MRTCamera');
  mrtCamera.addComponent('camera', { priority: -1, renderTarget: target, clearColor: new pc.Color(0.1, 0.12, 0.2) });
  mrtCamera.camera!.setShaderPass('MyMRT');
  app.root.addChild(mrtCamera);
  const setClears = (neutral: boolean): void => {
    // attachment 0 clears to camera.clearColor; the others get their own value, or null for that colour
    mrtCamera.camera!.setClearColor(1, neutral ? new pc.Color(0.5, 0.5, 1, 1) : null);
    mrtCamera.camera!.setClearColor(2, neutral ? new pc.Color(0, 0, 0, 1) : null);
  };
  setClears(true);
  app.on('update', () => {
    mrtCamera.setPosition(scene.camera.getPosition());
    mrtCamera.setRotation(scene.camera.getRotation());
  });

  // The debug texture renderer lays the three attachments over the corner of the screen.
  const viewer = new pc.TextureRenderer(app);
  app.on('update', () => {
    const aspect = stage.canvas.clientWidth / Math.max(1, stage.canvas.clientHeight);
    const tw = 0.27;
    const th = tw * aspect * (h / w); // keep the texture's shape in screen pixels
    textures.forEach((tex, i) => viewer.draw(tex, 0.015 + i * (tw + 0.01), 0.02, tw, Math.min(th, 0.45)));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('own clear colours (normal, gloss)', true, setClears);
    panel.readout(`maxColorAttachments: ${device.maxColorAttachments}. Left to right: colour, world normal, gloss.`);
  }

  return () => {
    mrtCamera.destroy();
    target.destroy();
    textures.forEach((t) => t.destroy());
    materials.forEach((m) => m.destroy());
    scene.dispose();
  };
};

export default mount;
