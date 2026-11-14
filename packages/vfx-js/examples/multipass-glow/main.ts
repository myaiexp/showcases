// three passes on one image: keep it, blur it, add the blur back as glow
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

// Pass 1: copy the element into the buffer "image".
const copyFrag = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    outColor = texture(src, uv);
}
`;

// Pass 2: src is now the previous pass. Blur it into "blur".
const blurFrag = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 c = vec4(0);
    for (int x = -3; x <= 3; x++) {
        for (int y = -3; y <= 3; y++) {
            c += texture(src, uv + vec2(x, y) * 3.0 / resolution);
        }
    }
    outColor = c / 49.0;
}
`;

// Pass 3, the last one, draws to the screen.
const glowFrag = `
precision highp float;
uniform sampler2D image; // the "image" target
uniform sampler2D blur;  // the "blur" target
uniform vec2 resolution;
uniform vec2 offset;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 glow = texture(blur, uv) * vec4(0.3, 0.8, 1.0, 1.0) * 2.0;
    outColor = texture(image, uv) + glow;
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(img, {
    shader: [
      { frag: copyFrag, target: 'image' }, // keep the element as "image"
      { frag: blurFrag, target: 'blur' }, // src here is the previous pass
      { frag: glowFrag }, // the last pass draws to the screen
    ],
  });
  stage.say('shader: [{ target: "image" }, { target: "blur" }, { glowFrag }]');
  return () => stage.dispose();
};

export default mount;
