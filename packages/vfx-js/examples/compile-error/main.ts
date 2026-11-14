// a shader that fails to compile makes vfx.add reject with the GL log
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

// `vec3 color = texture(...)` assigns a vec4 to a vec3: a type error.
const broken = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec3 color = texture(src, uv);
    outColor = vec4(color, 1.0);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const title = headline('Broken');
  const log = document.createElement('pre');
  log.style.cssText = `color: var(--red); white-space: pre-wrap; font-size: ${ctx.preview ? 9 : 12}px; max-width: 100%; margin: 0`;
  stage.root.style.flexDirection = 'column';
  stage.root.append(title, log);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  try {
    await vfx.add(title, { shader: broken });
    stage.say('compiled (unexpected)');
  } catch (err) {
    // The rejection carries the GL error log and the full source.
    const text = err instanceof Error ? err.message : String(err);
    log.textContent = text.split('\n').filter((l) => /error/i.test(l)).slice(0, 4).join('\n') || text.slice(0, 300);
    stage.say('vfx.add rejected; the element was not added and stays plain HTML', 'bad');
  }
  return () => stage.dispose();
};

export default mount;
