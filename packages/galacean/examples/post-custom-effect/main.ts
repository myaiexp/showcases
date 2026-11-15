// A PostProcessEffect float parameter read back with getBlendEffect
import { Blitter, type Camera, type Engine, Material, PostProcess, PostProcessEffect, PostProcessEffectFloatParameter, PostProcessManager, PostProcessPass, type RenderTarget, Shader, type Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const VERT = `
  attribute vec4 POSITION_UV;
  varying vec2 v_uv;

  void main() {
    gl_Position = vec4(POSITION_UV.xy, 0.0, 1.0);
    v_uv = POSITION_UV.zw;
  }
`;

const FRAG = `
  varying vec2 v_uv;
  uniform sampler2D renderer_BlitTexture;
  uniform float u_intensity;

  void main() {
    vec4 color = texture2D(renderer_BlitTexture, v_uv);
    float grayScale = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
    gl_FragColor = vec4(mix(color.rgb, vec3(grayScale), u_intensity), 1.0);
  }
`;

class CustomEffect extends PostProcessEffect {
  intensity = new PostProcessEffectFloatParameter(0.8);
}

class CustomPass extends PostProcessPass {
  private _blitMaterial: Material;

  constructor(engine: Engine) {
    super(engine);
    this._blitMaterial = new Material(engine, Shader.find('Showcase Gray Intensity') ?? Shader.create('Showcase Gray Intensity', VERT, FRAG));
  }

  override isValid(postProcessManager: PostProcessManager): boolean {
    if (!this.isActive) return false;
    const blend = postProcessManager.getBlendEffect(CustomEffect);
    return (blend?.intensity.value ?? 0) > 0;
  }

  override onRender(camera: Camera, srcTexture: Texture2D, dst: RenderTarget): void {
    const blend = camera.scene.postProcessManager.getBlendEffect(CustomEffect);
    if (blend) this._blitMaterial.shaderData.setFloat('u_intensity', blend.intensity.value);
    Blitter.blitTexture(this.engine, srcTexture, dst, undefined, undefined, this._blitMaterial, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await postDemo(el, ctx, { hint: 'CustomEffect.intensity (0 to 1) goes through the blend system into u_intensity.' });
  const say = caption(stage);
  const effect = root.createChild('post').addComponent(PostProcess).addEffect(CustomEffect);
  engine.addPostProcessPass(new CustomPass(engine));
  const set = (v: number): void => {
    effect.intensity.value = v;
    say(`CustomEffect.intensity ${effect.intensity.value.toFixed(2)}${v <= 0 ? '  (pass skipped by isValid)' : ''}`);
  };
  if (stage.preview) tick(root, (_dt, t) => set(Math.max(0, 1.3 * Math.sin(t * 0.8))));
  else {
    set(0.8);
    slider(stage.bar, 'intensity', 0, 1, 0.01, 0.8, set);
  }
  return stage.dispose;
};

export default mount;
