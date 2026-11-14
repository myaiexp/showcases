// A shader quad pass in camera.beforePasses feeds a texture the scene samples
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { renderTexture, screenMaterial } from '../../shared/advanced-feed.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick } from '../../shared/shaders.ts';

const plasmaGLSL = /* glsl */ `
    uniform float uTime;
    uniform float uScale;
    varying vec2 uv0;

    void main() {
        vec2 p = uv0 * uScale;
        float v = sin(p.x * 3.0 + uTime) + sin(p.y * 4.0 - uTime * 1.3)
                + sin((p.x + p.y) * 2.0 + uTime * 0.7)
                + sin(length(p - vec2(uScale * 0.5)) * 4.0 - uTime * 2.0);
        gl_FragColor = vec4(0.5 + 0.5 * cos(vec3(0.0, 2.0, 4.0) + v), 1.0);
    }
`;

class PlasmaPass extends pc.RenderPassShaderQuad {
  time = 0;
  scale = 3;
  private timeId: pc.ScopeId;
  private scaleId: pc.ScopeId;

  constructor(device: pc.GraphicsDevice) {
    super(device);
    this.name = 'PlasmaPass';
    this.shader = pc.ShaderUtils.createShader(device, {
      uniqueName: 'AdvFramePlasma',
      attributes: { aPosition: pc.SEMANTIC_POSITION },
      vertexChunk: 'quadVS',
      fragmentGLSL: plasmaGLSL,
    });
    this.timeId = device.scope.resolve('uTime');
    this.scaleId = device.scope.resolve('uScale');
  }

  override execute(): void {
    this.timeId.setValue(this.time);
    this.scaleId.setValue(this.scale);
    super.execute();
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { distance: 11, pitch: -22, autoRotate: 12 });
  const { app, stage } = scene;
  const device = stage.device;

  // The texture the pass renders into, and a material per object that reads it.
  const texture = renderTexture(device, 256, 256);
  const target = new pc.RenderTarget({ colorBuffer: texture, depth: false, origin: pc.RENDERTARGET_ORIGIN_TOP });
  const plasma = new PlasmaPass(device);
  plasma.init(target);
  plasma.setClearColor(pc.Color.BLACK); // the quad covers the whole target

  // Before passes render after the shadow maps and before the scene, so the objects below
  // sample this frame's plasma, not last frame's.
  const cameraComponent = scene.camera.camera!;
  cameraComponent.beforePasses.push(plasma);

  const material = screenMaterial(texture);
  const shapes = (['box', 'sphere', 'torus'] as const).map((type, i) => {
    const e = new pc.Entity(type);
    e.addComponent('render', { type, material, castShadows: true });
    e.setLocalPosition((i - 1) * 3.4, 1.2, 0);
    e.setLocalScale(2, 2, 2);
    app.root.addChild(e);
    return e;
  });
  let speed = 1;
  let clock = 0;
  onTick(app, (t, dt) => {
    clock += dt * speed;
    plasma.time = clock;
    shapes.forEach((s, i) => s.setLocalEulerAngles(t * 25 + i * 60, t * 35, 0));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('pass enabled', true, (on) => (plasma.enabled = on)); // skipped when the frame is built
    panel.slider('speed', 0, 4, 0.1, speed, (v) => (speed = v));
    panel.slider('pattern scale', 1, 8, 0.1, plasma.scale, (v) => (plasma.scale = v));
    panel.row();
    panel.readout('One 256 x 256 pass per frame, in camera.beforePasses; disabling it freezes the last texture.');
  }

  return () => {
    // The camera does not destroy its passes: take the pass out, then destroy it and its target.
    cameraComponent.beforePasses.splice(cameraComponent.beforePasses.indexOf(plasma), 1);
    plasma.destroy();
    target.destroy();
    texture.destroy();
    material.destroy();
    scene.dispose();
  };
};

export default mount;
