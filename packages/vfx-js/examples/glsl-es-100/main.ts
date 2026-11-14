// an older GLSL ES 1.0 shader (gl_FragColor, texture2D) still works
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

// GLSL ES 1.0: no `out` variable, gl_FragColor and texture2D instead.
const oldShader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec2 p = uv - 0.5;
    float r = length(p);
    uv += p * sin(r * 30.0 - time * 4.0) * 0.03;
    gl_FragColor = texture2D(src, uv);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  // The version is found from gl_FragColor / texture2D; glslVersion says it outright.
  await vfx.add(img, { shader: oldShader, glslVersion: '100' });
  stage.say('glslVersion: "100": gl_FragColor and texture2D');
  return () => stage.dispose();
};

export default mount;
