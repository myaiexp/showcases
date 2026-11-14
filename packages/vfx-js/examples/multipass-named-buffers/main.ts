// VFX-JS example: a later pass reads an earlier one by its target name
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const grayscalePass = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 c = texture(src, uv);
    float gray = dot(c.rgb, vec3(0.299, 0.587, 0.114));
    outColor = vec4(vec3(gray), c.a);
}
`;

// Declaring `uniform sampler2D grayscale` is all it takes to read that buffer.
const invertPass = `
precision highp float;
uniform sampler2D grayscale;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec3 g = texture(grayscale, uv).rgb;
    // Inverted on the left of a sweeping line, plain grey on the right.
    float split = 0.5 + 0.4 * sin(time);
    outColor = vec4(uv.x < split ? 1.0 - g : g, 1.0);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(img, {
    shader: [{ frag: grayscalePass, target: 'grayscale' }, { frag: invertPass }],
  });
  stage.say('pass 1 → "grayscale"; pass 2 reads uniform sampler2D grayscale');
  return () => stage.dispose();
};

export default mount;
