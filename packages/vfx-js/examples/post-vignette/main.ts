// VFX-JS example: the animated vignette post effect, centred on the stage
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { postScene, stageCenter } from '../../shared/post-scene.ts';
import { createStage } from '../../shared/stage.ts';

// The guide's shader, with a `center` uniform: uv spans the whole window here, so the
// distance is measured from the stage centre.
const shader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform float vignetteStrength;
uniform vec2 center;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 color = texture(src, uv);

    float dist = distance(uv, center);
    float vignette = 1.0 - smoothstep(0.3, 1.0, dist * vignetteStrength);
    vignette += sin(time * 2.0) * 0.1;

    outColor = vec4(color.rgb * vignette, color.a);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // The docs' strength assumes the effect spans the window; a stage is smaller.
  let strength = ctx.preview ? 7 : 3;
  const vfx = stage.own(
    new VFX({
      ...stage.vfxOpts,
      postEffect: { shader, uniforms: { vignetteStrength: () => strength, center: stageCenter(stage) } },
    }),
  );
  await postScene(stage, vfx, 'landscape');
  if (stage.bar) slider(stage.bar, 'vignetteStrength', 0, 10, 0.1, strength, (v) => (strength = v));
  stage.say('Darker away from the centre; the whole vignette breathes with time');
  return () => stage.dispose();
};

export default mount;
