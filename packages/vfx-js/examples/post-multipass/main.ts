// a two-pass post effect, a horizontal blur kept as "a" and a glow
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { postScene } from '../../shared/post-scene.ts';
import { createStage } from '../../shared/stage.ts';

// Pass 1 keeps the canvas as "scene": later passes get the previous pass as src.
const keep = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
out vec4 outColor;

void main() {
    outColor = texture(src, (gl_FragCoord.xy - offset) / resolution);
}
`;

// Pass A blurs the canvas sideways into the buffer "a".
const passA = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 sum = vec4(0);
    for (int i = -8; i <= 8; i++) {
        sum += texture(src, uv + vec2(float(i) * 3.0 / resolution.x, 0.0));
    }
    outColor = sum / 17.0;
}
`;

// Pass B, the last one, draws to the screen: the kept canvas plus a streak of the blur.
const passB = `
precision highp float;
uniform sampler2D scene; // pass 1's buffer
uniform sampler2D a;     // pass A's buffer, by its target name
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 streak = texture(a, uv) * vec4(1.0, 0.6, 1.0, 1.0);
    outColor = texture(scene, uv) + streak * (0.3 + 0.3 * sin(time * 2.0));
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const vfx = stage.own(
    new VFX({ ...stage.vfxOpts, postEffect: [{ frag: keep, target: 'scene' }, { frag: passA, target: 'a' }, { frag: passB }] }),
  );
  await postScene(stage, vfx, 'city');
  stage.say('postEffect: [keep → "scene", blur → "a", scene + streak]');
  return () => stage.dispose();
};

export default mount;
