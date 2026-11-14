// float, vec2, vec3, vec4 and a Float32Array as a vec4[4] uniform
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const shader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float amount;   // 0.6           -> float
uniform vec2 shift;     // [x, y]        -> vec2
uniform vec3 edge;      // [r, g, b]     -> vec3
uniform vec4 bands[4];  // Float32Array(16) -> four vec4s
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 color = texture(src, fract(uv + shift));
    // Four horizontal bands, each tinted by one vec4 of the array.
    int i = int(clamp(floor(uv.y * 4.0), 0.0, 3.0));
    vec4 band = bands[i];
    color.rgb = mix(color.rgb, color.rgb * band.rgb * 1.6, amount * band.a);
    // A thin vec3-coloured line between bands.
    float line = step(fract(uv.y * 4.0), 0.02);
    color.rgb = mix(color.rgb, edge, line);
    outColor = color;
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // 16 floats = four RGBA colours for `uniform vec4 bands[4]`.
  const bands = new Float32Array([1, 0.3, 0.3, 1, 1, 0.9, 0.3, 1, 0.3, 1, 0.5, 1, 0.4, 0.5, 1, 1]);
  await vfx.add(img, {
    shader,
    uniforms: {
      amount: 0.6,
      shift: () => [performance.now() / 20000, 0],
      edge: [1, 1, 1],
      bands,
    },
  });
  stage.say('amount: 0.6, shift: [x, 0], edge: [1, 1, 1], bands: new Float32Array(16)');
  return () => stage.dispose();
};

export default mount;
