// the mouse uniform as a spotlight that lifts a grey picture into colour
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { standInPointer } from '../../shared/pointer.ts';
import { createStage } from '../../shared/stage.ts';

const shader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform vec2 mouse; // same space as gl_FragCoord
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 color = texture(src, uv);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    // Both in physical px, so the distance is in px too.
    float d = distance(gl_FragCoord.xy, mouse);
    float light = smoothstep(resolution.y * 0.35, resolution.y * 0.1, d);
    color.rgb = mix(vec3(gray) * 0.5, color.rgb * 1.2, light);
    outColor = color;
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the picture.' });
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(img, { shader });
  // Cards have no pointer: a stand-in moves over the picture instead.
  standInPointer(stage, img);
  stage.say('uniform vec2 mouse: distance(gl_FragCoord.xy, mouse) lights the picture');
  return () => stage.dispose();
};

export default mount;
