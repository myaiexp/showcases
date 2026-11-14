// VFX-JS example: a water ripple simulation in a small persistent float buffer
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { standInPointer } from '../../shared/pointer.ts';
import { createStage } from '../../shared/stage.ts';

const SIM: [number, number] = [160, 106];

const copyFrag = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
out vec4 outColor;
void main() {
    outColor = texture(src, (gl_FragCoord.xy - offset) / resolution);
}
`;

// A fixed-size pass: resolution = size and offset = 0. r = height now, g = height before.
// Heights go below 0, which is why the buffer is float.
const simFrag = `
precision highp float;
uniform sampler2D sim; // this pass's own last frame
uniform vec2 resolution;
uniform vec3 drop; // x, y in 0..1 and strength (0 = no drop this frame)
out vec4 outColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec2 px = 1.0 / resolution;
    vec4 cur = texture(sim, uv);
    float sum = texture(sim, uv + vec2(px.x, 0)).r + texture(sim, uv - vec2(px.x, 0)).r
              + texture(sim, uv + vec2(0, px.y)).r + texture(sim, uv - vec2(0, px.y)).r;
    float next = (sum * 0.5 - cur.g) * 0.985;
    float d = distance(uv * resolution, drop.xy * resolution);
    next += drop.z * smoothstep(3.0, 0.0, d);
    outColor = vec4(next, cur.r, 0.0, 1.0);
}
`;

// Refract the picture by the slope of the water, and light the slopes that face up.
const displayFrag = `
precision highp float;
uniform sampler2D image;
uniform sampler2D sim;
uniform vec2 resolution;
uniform vec2 offset;
uniform vec2 simSize;
out vec4 outColor;
void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec2 px = 1.0 / simSize;
    float hx = texture(sim, uv + vec2(px.x, 0)).r - texture(sim, uv - vec2(px.x, 0)).r;
    float hy = texture(sim, uv + vec2(0, px.y)).r - texture(sim, uv - vec2(0, px.y)).r;
    vec2 slope = vec2(hx, hy);
    vec4 color = texture(image, uv + slope * 0.03);
    color.rgb += max(0.0, dot(normalize(vec3(slope, 0.2)), normalize(vec3(-1, 1, 1)))) * length(slope) * 0.6;
    outColor = color;
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the water.' });
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // Drops: from the pointer when it moves over the picture, else a raindrop now and then.
  // A drop stays in the uniform for 50 ms rather than one read, since uniform functions
  // may be read more than once per frame.
  let pending: [number, number, number] = [0, 0, 0];
  let pendingAt = 0;
  let lastPointer = 0;
  const onMove = (e: PointerEvent): void => {
    const r = img.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = 1 - (e.clientY - r.top) / r.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return;
    pending = [x, y, 0.3];
    pendingAt = lastPointer = performance.now();
  };
  window.addEventListener('pointermove', onMove);
  stage.onDispose(() => window.removeEventListener('pointermove', onMove));
  stage.every(500, () => {
    if (performance.now() - lastPointer < 1500) return;
    pending = [Math.random(), Math.random(), 0.6];
    pendingAt = performance.now();
  });
  const drop = (): [number, number, number] => (performance.now() - pendingAt < 50 ? pending : [0, 0, 0]);

  await vfx.add(img, {
    shader: [
      { frag: copyFrag, target: 'image' },
      { frag: simFrag, target: 'sim', persistent: true, float: true, size: SIM, uniforms: { drop } },
      { frag: displayFrag, uniforms: { simSize: SIM } },
    ],
  });
  standInPointer(stage, img);
  stage.say(`sim: persistent, float: true, size: [${SIM.join(', ')}]`);
  return () => stage.dispose();
};

export default mount;
