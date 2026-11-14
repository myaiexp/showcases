// VFX-JS example: chromatic aberration as a post effect, centred on the stage
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { postScene, stageCenter } from '../../shared/post-scene.ts';
import { createStage } from '../../shared/stage.ts';

// The guide's shader, with `center` as a uniform instead of vec2(0.5): the canvas covers
// the whole window here, and the aberration should centre on this stage.
const shader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float aberrationStrength;
uniform vec2 center;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec2 direction = normalize(uv - center);
    float distance = length(uv - center);
    vec2 offsetR = direction * distance * aberrationStrength;
    vec2 offsetB = direction * distance * aberrationStrength * -1.0;
    float r = texture(src, uv + offsetR).r;
    float g = texture(src, uv).g;
    float b = texture(src, uv + offsetB).b;
    float a = texture(src, uv).a;
    outColor = vec4(r, g, b, a);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  let strength = 0.05;
  const vfx = stage.own(
    new VFX({
      ...stage.vfxOpts,
      postEffect: { shader, uniforms: { aberrationStrength: () => strength, center: stageCenter(stage) } },
    }),
  );
  await postScene(stage, vfx, 'testcard');
  if (stage.bar) slider(stage.bar, 'aberrationStrength', 0, 0.2, 0.005, strength, (v) => (strength = v));
  else stage.frame((t) => (strength = 0.05 + 0.05 * Math.sin(t * 1.5)));
  stage.say('Red and blue pulled apart, more the further from the centre');
  return () => stage.dispose();
};

export default mount;
