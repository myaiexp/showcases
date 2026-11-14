// the MULTIPASS.md glow bleed, buffers read through toBuffer(uv)
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

const toBuffer = `
vec2 toBuffer(vec2 uv) {
    return (uv * resolution + (offset - viewport.xy)) / viewport.zw;
}
`;

const copyShader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    // The element texture has nothing outside 0..1
    vec2 inside = step(vec2(0.0), uv) * step(uv, vec2(1.0));
    outColor = texture(src, uv) * inside.x * inside.y;
}
`;

const glowShader = `
precision highp float;
uniform sampler2D original;
uniform vec2 resolution;
uniform vec2 offset;
uniform vec4 viewport;
out vec4 outColor;
${toBuffer}
void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec2 texel = 4.0 / resolution;
    vec4 c = vec4(0.0);
    for (int x = -4; x <= 4; x++) {
        for (int y = -4; y <= 4; y++) {
            c += texture(original, toBuffer(uv + vec2(x, y) * texel));
        }
    }
    outColor = c / 81.0;
}
`;

const compositeShader = `
precision highp float;
uniform sampler2D original;
uniform sampler2D glow;
uniform vec2 resolution;
uniform vec2 offset;
uniform vec4 viewport;
out vec4 outColor;
${toBuffer}
void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 base = texture(original, toBuffer(uv));
    vec4 g = texture(glow, toBuffer(uv));
    outColor = base + g * (1.0 - base.a);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const title = headline('Glow', '#7ef9ff');
  stage.root.append(title);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(title, {
    overflow: 40,
    shader: [
      { frag: copyShader, target: 'original' },
      { frag: glowShader, target: 'glow' },
      { frag: compositeShader },
    ],
  });
  stage.say('overflow: 40; every buffer read through toBuffer(uv)');
  return () => stage.dispose();
};

export default mount;
