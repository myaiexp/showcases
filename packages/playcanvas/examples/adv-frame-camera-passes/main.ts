// Replacing a camera's rendering with framePasses: forward pass, then a tint quad
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick } from '../../shared/shaders.ts';

const tintGLSL = /* glsl */ `
    uniform sampler2D sourceTexture;
    uniform vec3 tint;
    uniform float vignette;
    varying vec2 uv0;

    void main() {
        vec4 color = texture2D(sourceTexture, uv0);
        float edge = 1.0 - vignette * smoothstep(0.35, 0.95, length(uv0 - 0.5) * 1.4);
        gl_FragColor = vec4(color.rgb * tint * edge, color.a);
    }
`;

/** A pass drawing a texture into its render target, multiplied by a colour. */
class TintPass extends pc.RenderPassShaderQuad {
  tint = new Float32Array([1, 1, 1]);
  vignette = 0.6;
  private sourceTextureId: pc.ScopeId;
  private tintId: pc.ScopeId;
  private vignetteId: pc.ScopeId;

  private sourceTexture: pc.Texture;

  constructor(device: pc.GraphicsDevice, sourceTexture: pc.Texture) {
    super(device);
    this.name = 'TintPass';
    this.sourceTexture = sourceTexture;
    this.shader = pc.ShaderUtils.createShader(device, {
      uniqueName: 'AdvFrameTintShader',
      attributes: { aPosition: pc.SEMANTIC_POSITION },
      vertexChunk: 'quadVS',
      fragmentGLSL: tintGLSL,
    });
    // Other passes may use the same parameter names: resolve once, set them right before drawing.
    this.sourceTextureId = device.scope.resolve('sourceTexture');
    this.tintId = device.scope.resolve('tint');
    this.vignetteId = device.scope.resolve('vignette');
  }

  override execute(): void {
    this.sourceTextureId.setValue(this.sourceTexture);
    this.tintId.setValue(this.tint);
    this.vignetteId.setValue(this.vignette);
    super.execute();
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { distance: 10, pitch: -24, autoRotate: 14 });
  const { app, stage, camera } = scene;
  const device = stage.device;
  const cameraComponent = camera.camera!;

  (['sphere', 'torus', 'box'] as const).forEach((type, i) => {
    const e = new pc.Entity(type);
    e.addComponent('render', { type, material: colorMaterial(['#e8794a', '#7bc67b', '#4ab3e8'][i]!), castShadows: true });
    e.setLocalPosition((i - 1) * 3, 1, 0);
    e.setLocalScale(1.8, 1.8, 1.8);
    app.root.addChild(e);
  });

  // The scene renders into this texture instead of the screen; the pass resizes it to the back buffer.
  const texture = new pc.Texture(device, {
    name: 'SceneTexture',
    width: 4,
    height: 4,
    format: pc.PIXELFORMAT_RGBA8,
    mipmaps: false,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
  });
  const renderTarget = new pc.RenderTarget({ colorBuffer: texture, depth: true });
  const world = app.scene.layers.getLayerById(pc.LAYERID_WORLD)!;

  const scenePass = new pc.RenderPassForward(device, app.scene, cameraComponent);
  scenePass.name = 'ScenePass';
  scenePass.init(renderTarget, { resizeSource: null, scaleX: 1, scaleY: 1 });
  scenePass.addLayer(world, false); // opaque meshes, clearing the target first
  scenePass.addLayer(world, true); // then the transparent ones

  const tintPass = new TintPass(device, texture);
  tintPass.init(null); // null: draw into the back buffer
  tintPass.setClearColor(pc.Color.BLACK); // the quad covers everything, so clear instead of loading

  const setCustom = (on: boolean): void => {
    cameraComponent.framePasses = on ? [scenePass, tintPass] : null; // null restores the default rendering
  };
  setCustom(true);

  let hue = 0.08;
  let animate = true;
  const applyHue = (): void => {
    tintPass.tint[0] = 0.55 + 0.45 * Math.cos(hue * Math.PI * 2);
    tintPass.tint[1] = 0.55 + 0.45 * Math.cos((hue + 1 / 3) * Math.PI * 2);
    tintPass.tint[2] = 0.55 + 0.45 * Math.cos((hue + 2 / 3) * Math.PI * 2);
  };
  applyHue();
  onTick(app, (_t, dt) => {
    if (!animate) return;
    hue = (hue + dt * 0.08) % 1;
    applyHue();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('camera.framePasses (off: default rendering)', true, setCustom);
    panel.check('animate the tint', true, (on) => (animate = on));
    panel.row();
    panel.slider('vignette', 0, 1, 0.05, tintPass.vignette, (v) => (tintPass.vignette = v));
    panel.slider('scene resolution', 0.1, 1, 0.05, 1, (v) => {
      scenePass.scaleX = scenePass.scaleY = v; // the pass resizes its target each frame
    });
  }

  return () => {
    cameraComponent.framePasses = null; // the camera does not own passes: remove, then destroy
    scenePass.destroy();
    tintPass.destroy();
    renderTarget.destroy();
    texture.destroy();
    scene.dispose();
  };
};

export default mount;
