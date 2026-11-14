// the GLSL template from Custom Shaders, a wave through a headline
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

const shader = `
precision highp float;
uniform sampler2D src;   // the element
uniform vec2 resolution; // element size, physical px
uniform vec2 offset;     // element origin, physical px
uniform float time;      // seconds
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    uv.x += sin(uv.y * 20.0 + time) * 0.02;
    outColor = texture(src, uv);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const title = headline('Waves');
  stage.root.append(title);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  // A shader that fails to compile makes vfx.add reject with the GL error log.
  await vfx.add(title, { shader }).catch(console.error);
  stage.say('uv.x += sin(uv.y * 20.0 + time) * 0.02');
  return () => stage.dispose();
};

export default mount;
