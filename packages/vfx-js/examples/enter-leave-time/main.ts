// enterTime and leaveTime, seconds since the element entered or left
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { headline } from '../../shared/subjects.ts';
import { cardScroll, scrollRoom } from '../../shared/scroll-sim.ts';
import { createStage } from '../../shared/stage.ts';

// Letters wipe in from the left over 1.5 s after entering, and drop away after leaving.
const shader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float enterTime; // seconds since it entered
uniform float leaveTime; // seconds since it left
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    float shown = step(uv.x, enterTime / 1.5);
    uv.y += leaveTime * leaveTime * 2.0;
    vec4 color = uv.y > 1.0 ? vec4(0) : texture(src, uv);
    outColor = color * shown;
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll the headline out of the window and back.' });
  const title = headline('Hello');
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  const props = { shader, release: 2 };
  if (ctx.preview) {
    // A card cannot scroll the page: its own box stands in for the viewport.
    stage.root.append(title);
    await cardScroll(stage, vfx, title, props, 6);
  } else {
    scrollRoom(stage, title);
    await vfx.add(title, props);
  }
  stage.say('enterTime wipes it in; leaveTime drops it out');
  return () => stage.dispose();
};

export default mount;
