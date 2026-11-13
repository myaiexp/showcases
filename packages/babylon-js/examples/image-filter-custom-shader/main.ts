// ImageFilter.render() with a custom EffectWrapper shader and uniforms
import { Constants, EffectWrapper, ThinEngine, ThinTexture } from '@babylonjs/core';
import { ImageFilter } from '@babylonjs/controls/dist/src/imageFilter';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { drawTestCanvas } from '../../shared/test-picture.ts';

const FRAGMENT = `
  varying vec2 vUV;
  uniform sampler2D textureSampler;   // the input picture
  uniform sampler2D otherTexture;     // a second sampler, bound by hand
  uniform vec3 colorOffset;
  uniform float swirl;

  void main(void) {
    vec2 centred = vUV - 0.5;
    float angle = swirl * (0.5 - length(centred));
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 uv = rot * centred + 0.5;
    vec4 color = texture2D(textureSampler, uv);
    // swizzle red and blue, offset, then modulate by a stripe texture
    color.rgb = vec3(color.b, color.g, color.r) + clamp(colorOffset, 0., 1.) * 0.35;
    color.rgb *= mix(vec3(1.), texture2D(otherTexture, vUV * vec2(6., 1.)).rgb, 0.35);
    gl_FragColor = vec4(color.rgb, 1.0);
  }
`;

/** Uploads a 2D canvas as a GPU texture the filter can sample. */
function canvasTexture(engine: ThinEngine, canvas: HTMLCanvasElement): ThinTexture {
  const internal = engine.createDynamicTexture(canvas.width, canvas.height, false, Constants.TEXTURE_BILINEAR_SAMPLINGMODE);
  engine.updateDynamicTexture(internal, canvas, false);
  return new ThinTexture(internal);
}

const mount: Mount = (el, ctx) => {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: ctx.preview ? '200px' : '440px' });
  el.append(canvas);

  const engine = new ThinEngine(canvas, true, { adaptToDeviceRatio: !ctx.preview });
  const imageFilter = new ImageFilter(engine);

  const stripes = document.createElement('canvas');
  stripes.width = 64;
  stripes.height = 4;
  const sg = stripes.getContext('2d')!;
  for (let x = 0; x < 64; x += 8) {
    sg.fillStyle = x % 16 ? '#444' : '#fff';
    sg.fillRect(x, 0, 8, 4);
  }
  const mainTexture = canvasTexture(engine, drawTestCanvas());
  const otherTexture = canvasTexture(engine, stripes);

  const wrapper = new EffectWrapper({
    name: 'Custom',
    engine,
    fragmentShader: FRAGMENT,
    // The default sampler plus the custom ones, and the custom uniforms to bind.
    samplerNames: ['textureSampler', 'otherTexture'],
    uniformNames: ['colorOffset', 'swirl'],
  });

  let time = 0;
  let swirl = 3;
  let offsetScale = 1;
  const resizeObserver = new ResizeObserver(() => {
    engine.resize();
    imageFilter.resize();
  });
  resizeObserver.observe(canvas);

  engine.runRenderLoop(() => {
    // render() (unlike filter()) makes no promise and no garbage, so it suits a render loop.
    if (!otherTexture.isReady()) return;
    time += engine.getDeltaTime() / 1000;
    wrapper.effect.setTexture('otherTexture', otherTexture);
    wrapper.effect.setFloat3('colorOffset', (Math.cos(time) * 0.5 + 0.5) * offsetScale, 0, (Math.sin(time) * 0.5 + 0.5) * offsetScale);
    wrapper.effect.setFloat('swirl', swirl * Math.sin(time * 0.6));
    imageFilter.render(mainTexture, wrapper);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('swirl', 0, 8, 0.1, swirl, (v) => (swirl = v));
    panel.slider('colorOffset scale', 0, 2, 0.05, offsetScale, (v) => (offsetScale = v));
  }

  return () => {
    resizeObserver.disconnect();
    engine.stopRenderLoop();
    wrapper.dispose();
    mainTexture.dispose();
    otherTexture.dispose();
    imageFilter.dispose();
    engine.dispose();
    canvas.remove();
  };
};

export default mount;
