// Multiple render targets: a ShaderMaterial writes pcFragColor0 to pcFragColor2
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';

// The define is the pass name upper-cased plus _PASS: camera.setShaderPass('SceneBuffers') gives
// SCENEBUFFERS_PASS. In that pass the shader fills three targets; in every other pass it is a plain shader.
const shaderDesc: ShaderDesc = {
  uniqueName: 'AdvMrtCustomShader',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;
    varying vec3 vNormal;
    varying float vDepth;
    void main(void) {
        vNormal = mat3(matrix_model) * aNormal;
        gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
        vDepth = gl_Position.w;
    }
  `,
  fragmentGLSL: /* glsl */ `
    varying vec3 vNormal;
    varying float vDepth;
    uniform vec3 uColor;
    uniform float uFar;
    void main(void) {
        vec3 n = normalize(vNormal);
        float light = 0.3 + 0.7 * max(dot(n, normalize(vec3(0.4, 0.8, 0.5))), 0.0);
        vec3 lit = uColor * light;
        #ifdef SCENEBUFFERS_PASS
            pcFragColor0 = vec4(lit, 1.0);
            pcFragColor1 = vec4(n * 0.5 + 0.5, 1.0);
            pcFragColor2 = vec4(vec3(1.0 - clamp(vDepth / uFar, 0.0, 1.0)), 1.0);
        #else
            gl_FragColor = vec4(lit, 1.0);
        #endif
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aNormal: pc.SEMANTIC_NORMAL },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 9, pitch: -22, autoRotate: 12, clear: '#10131a' });
  const { app, stage } = scene;
  const device = stage.device;

  const colours: [number, number, number][] = [
    [0.95, 0.5, 0.3],
    [0.3, 0.7, 0.95],
    [0.95, 0.8, 0.3],
    [0.35, 0.4, 0.5],
  ];
  const materials = colours.map((c) => {
    const m = new pc.ShaderMaterial(shaderDesc);
    m.setParameter('uColor', c);
    m.setParameter('uFar', 20);
    return m;
  });
  addShape(app, 'plane', materials[3]!, [0, -1, 0], [14, 1, 14]);
  const shapes = [
    addShape(app, 'sphere', materials[0]!, [-3, 0.2, 0], 1.8),
    addShape(app, 'torus', materials[1]!, [0, 0.2, 1], 1.8),
    addShape(app, 'box', materials[2]!, [3, 0.2, 0], 1.5),
  ];
  onTick(app, (t) => shapes.forEach((s, i) => s.setLocalEulerAngles(t * 30 + i * 50, t * 40, 0)));

  const [w, h] = ctx.preview ? [256, 192] : [512, 384];
  const textures = ['albedo', 'normal', 'depth'].map(
    (name) =>
      new pc.Texture(device, {
        name: `buffer ${name}`,
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
  const target = new pc.RenderTarget({ name: 'buffers', colorBuffers: textures, depth: true, origin: pc.RENDERTARGET_ORIGIN_TOP });
  const bufferCamera = new pc.Entity('buffers');
  bufferCamera.addComponent('camera', { priority: -1, renderTarget: target, clearColor: new pc.Color(0.06, 0.07, 0.1) });
  bufferCamera.camera!.setShaderPass('SceneBuffers');
  bufferCamera.camera!.setClearColor(1, new pc.Color(0.5, 0.5, 1, 1));
  bufferCamera.camera!.setClearColor(2, new pc.Color(0, 0, 0, 1)); // far away: black in the depth buffer
  app.root.addChild(bufferCamera);
  app.on('update', () => {
    bufferCamera.setPosition(scene.camera.getPosition());
    bufferCamera.setRotation(scene.camera.getRotation());
  });

  const viewer = new pc.TextureRenderer(app);
  app.on('update', () => {
    const aspect = stage.canvas.clientWidth / Math.max(1, stage.canvas.clientHeight);
    const tw = 0.27;
    const th = Math.min(tw * aspect * (h / w), 0.45);
    textures.forEach((tex, i) => viewer.draw(tex, 0.015 + i * (tw + 0.01), 0.02, tw, th));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('depth range (uFar)', 8, 40, 1, 20, (v) => materials.forEach((m) => m.setParameter('uFar', v)));
    panel.readout('Left to right: albedo (target 0), world normal (1), distance (2).');
  }

  return () => {
    bufferCamera.destroy();
    target.destroy();
    textures.forEach((t) => t.destroy());
    materials.forEach((m) => m.destroy());
    scene.dispose();
  };
};

export default mount;
