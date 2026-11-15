// A custom PostProcessPass blits renderer_BlitTexture through grayscale
import { Blitter, BloomEffect, type Engine, Material, type Camera, PostProcess, PostProcessPass, type RenderTarget, Shader, TonemappingEffect, TonemappingMode, type Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
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

  void main() {
    vec4 color = texture2D(renderer_BlitTexture, v_uv);
    float grayScale = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
    gl_FragColor = vec4(vec3(grayScale), 1.0);
  }
`;

const grayShader = (): Shader => Shader.find('Showcase Gray Scale') ?? Shader.create('Showcase Gray Scale', VERT, FRAG);

class GrayPass extends PostProcessPass {
  private _blitMaterial: Material;

  constructor(engine: Engine) {
    super(engine);
    this._blitMaterial = new Material(engine, grayShader());
  }

  override onRender(_camera: Camera, srcTexture: Texture2D, dst: RenderTarget): void {
    Blitter.blitTexture(this.engine, srcTexture, dst, undefined, undefined, this._blitMaterial, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await postDemo(el, ctx, { hint: 'engine.addPostProcessPass(new GrayPass(engine)) runs after the Uber pass.' });
  const say = caption(stage);
  const post = root.createChild('post').addComponent(PostProcess);
  post.addEffect(TonemappingEffect).mode.value = TonemappingMode.ACES;
  const bloom = post.addEffect(BloomEffect);
  bloom.threshold.value = 0.5;
  bloom.intensity.value = 1.5;
  const pass = new GrayPass(engine);
  engine.addPostProcessPass(pass);
  const set = (on: boolean): void => {
    pass.isActive = on;
    say(on ? 'Uber pass + custom grayscale pass' : 'Uber pass only');
  };
  if (stage.preview) steps(root, 2.4, 2, (i) => set(i === 1));
  else {
    set(true);
    checkbox(stage.bar, 'custom pass isActive', true, set);
  }
  return stage.dispose;
};

export default mount;
