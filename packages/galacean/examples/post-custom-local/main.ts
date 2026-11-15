// A custom effect in a local volume fades with the camera distance
import { Blitter, BoxColliderShape, type Camera, type Engine, Material, PostProcess, PostProcessEffect, PostProcessEffectFloatParameter, PostProcessPass, type RenderTarget, Shader, StaticCollider, type Texture2D, TonemappingEffect, TonemappingMode, Vector3 } from '@galacean/engine';
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

class LocalGray extends PostProcessEffect {
  intensity = new PostProcessEffectFloatParameter(0);
}

class LocalGrayPass extends PostProcessPass {
  private _blitMaterial: Material;

  constructor(engine: Engine) {
    super(engine);
    this._blitMaterial = new Material(engine, Shader.find('Showcase Gray Local') ?? Shader.create('Showcase Gray Local', VERT, FRAG));
  }

  override onRender(camera: Camera, srcTexture: Texture2D, dst: RenderTarget): void {
    const blend = camera.scene.postProcessManager.getBlendEffect(LocalGray);
    this._blitMaterial.shaderData.setFloat('u_intensity', blend?.intensity.value ?? 0);
    Blitter.blitTexture(this.engine, srcTexture, dst, undefined, undefined, this._blitMaterial, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await postDemo(el, ctx, { physics: true, camera: [0, 1.4, 14], hint: 'LocalGray.intensity is 1 inside the box and 0 beyond blendDistance 6.' });
  const say = caption(stage);
  root.createChild('base').addComponent(PostProcess).addEffect(TonemappingEffect).mode.value = TonemappingMode.ACES;
  const volume = root.createChild('volume');
  const post = volume.addComponent(PostProcess);
  post.isGlobal = false;
  post.blendDistance = 6;
  const collider = volume.addComponent(StaticCollider);
  const box = new BoxColliderShape();
  box.size = new Vector3(7, 5, 6);
  collider.addShape(box);
  post.addEffect(LocalGray).intensity.value = 1;
  engine.addPostProcessPass(new LocalGrayPass(engine));
  const look = new Vector3(0, 0.4, 0);
  let z = 14;
  tick(root, (_dt, t) => {
    if (stage.preview) z = 8.5 + 7.5 * Math.sin(t * 0.6);
    camera.entity.transform.setPosition(0, 1.4, z);
    camera.entity.transform.lookAt(look);
    const blend = stage.scene.postProcessManager.getBlendEffect(LocalGray);
    say(`camera z ${z.toFixed(1)}   gray amount ${(blend?.intensity.value ?? 0).toFixed(2)}`);
  });
  if (!stage.preview) slider(stage.bar, 'camera z', 1, 16, 0.1, z, (v) => (z = v));
  return stage.dispose;
};

export default mount;
