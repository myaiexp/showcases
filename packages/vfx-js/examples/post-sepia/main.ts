// a custom post effect shader with its own uniform (animated sepia)
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { postScene } from '../../shared/post-scene.ts';
import { createStage } from '../../shared/stage.ts';

const shader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform float intensity;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 color = texture(src, uv);

    // Animated sepia effect
    vec3 sepia = vec3(
        dot(color.rgb, vec3(0.393, 0.769, 0.189)),
        dot(color.rgb, vec3(0.349, 0.686, 0.168)),
        dot(color.rgb, vec3(0.272, 0.534, 0.131))
    );

    float animatedIntensity = intensity * (sin(time * 2.0) * 0.5 + 0.5);
    outColor = vec4(mix(color.rgb, sepia, animatedIntensity), color.a);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  let intensity = 0.8;
  const vfx = stage.own(
    new VFX({ ...stage.vfxOpts, postEffect: { shader, uniforms: { intensity: () => intensity } } }),
  );
  await postScene(stage, vfx, 'landscape');
  if (stage.bar) slider(stage.bar, 'intensity', 0, 1, 0.01, intensity, (v) => (intensity = v));
  stage.say('Sepia pulses in and out over the whole canvas; time counts from when the VFX started');
  return () => stage.dispose();
};

export default mount;
