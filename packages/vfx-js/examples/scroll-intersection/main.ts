// intersection, enterProgress and leaveProgress drive a scroll reveal
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { cardScroll, scrollRoom } from '../../shared/scroll-sim.ts';
import { createStage } from '../../shared/stage.ts';

const shader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float intersection;  // 0..1, how much of the element is in view
uniform float enterProgress; // 0..1 after it enters
uniform float leaveProgress; // 0..1 after it leaves
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 color = texture(src, uv);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // Color fills in from the left as more of the element is in view.
    float colored = step(uv.x, intersection);
    color.rgb = mix(vec3(gray), color.rgb, colored);

    // Fade in on enter, out on leave. Turns back if you scroll back mid-way.
    outColor = color * enterProgress * (1.0 - leaveProgress);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll the picture in and out of the window.' });
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  // Enter when half of it is in view, and leave when less than half is.
  const props = { shader, intersection: { threshold: 0.5, duration: 0.8 } };

  if (ctx.preview) {
    // A card cannot scroll the page: its own box stands in for the viewport.
    stage.root.append(img);
    await cardScroll(stage, vfx, img, props);
  } else {
    scrollRoom(stage, img);
    await vfx.add(img, props);
  }
  stage.say('intersection: { threshold: 0.5, duration: 0.8 }');
  return () => stage.dispose();
};

export default mount;
