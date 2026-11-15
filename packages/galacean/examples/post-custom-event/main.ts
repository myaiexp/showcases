// PostProcessPass.event: BeforeUber or AfterUber relative to the built-in pass
import { Blitter, BloomEffect, type Camera, type Engine, Material, PostProcess, PostProcessPass, PostProcessPassEvent, type RenderTarget, Shader, type Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
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

class GrayPass extends PostProcessPass {
  private _blitMaterial: Material;

  constructor(engine: Engine) {
    super(engine);
    this._blitMaterial = new Material(engine, Shader.find('Showcase Gray Event') ?? Shader.create('Showcase Gray Event', VERT, FRAG));
  }

  override onRender(_camera: Camera, srcTexture: Texture2D, dst: RenderTarget): void {
    Blitter.blitTexture(this.engine, srcTexture, dst, undefined, undefined, this._blitMaterial, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await postDemo(el, ctx, { hint: 'A magenta bloom tint shows where the gray pass sits relative to Uber.' });
  const say = caption(stage);
  const bloom = root.createChild('post').addComponent(PostProcess).addEffect(BloomEffect);
  bloom.threshold.value = 0.4;
  bloom.intensity.value = 3;
  bloom.tint.value.set(...lin([1, 0.2, 0.9]), 1);
  const pass = new GrayPass(engine);
  engine.addPostProcessPass(pass);
  const set = (event: 'AfterUber' | 'BeforeUber'): void => {
    pass.event = PostProcessPassEvent[event];
    say(`pass.event = PostProcessPassEvent.${event}`);
  };
  if (stage.preview) steps(root, 2.6, 2, (i) => set(i === 0 ? 'AfterUber' : 'BeforeUber'));
  else {
    set('AfterUber');
    select(stage.bar, 'event', ['AfterUber', 'BeforeUber'] as const, set);
  }
  return stage.dispose;
};

export default mount;
