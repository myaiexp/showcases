// a ring that draws outside the box; overflow and the inRange guard
import { ShaderTransition } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

class Ring extends ShaderTransition<{ guard?: boolean }> {
  name = 'ring';
  frag = `
uniform float guardOn;
vec4 transition(vec2 uv, float t) {
  vec2 p = (uv - 0.5) * vec2(resolution.x / resolution.y, 1.0);
  float r = length(p);
  float front = t * 1.4;
  // Outside the box uv is below 0 or above 1. fract() wraps it back into the content.
  vec2 q = fract(uv);
  vec4 c = mix(readFrom(q), readTo(q), smoothstep(front, front - 0.05, r));
  if (guardOn > 0.5 && !inRange(uv)) c = vec4(0.0);
  float ring = exp(-pow((r - front) * 12.0, 2.0)) * sin(t * 3.14159);
  // Premultiplied colour: rgb and alpha both scale with the ring.
  return c + vec4(0.3, 0.7, 1.0, 1.0) * ring;
}
`;
  override uniforms() {
    return { guardOn: (this.params.guard ?? true) ? 1 : 0 };
  }
}

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;
  const fx = new Ring({ guard: true });
  const t = vfx.addTransition(box, { transition: fx, duration: 1.6 });
  let overflow = 60;
  let run = 0;
  const label = (): string => `overflow ${overflow}px, inRange guard ${fx.params.guard}`;
  drive(kit, t, {
    label,
    showOpts: () => {
      // A card flips the guard every other run to show the wrapped content.
      if (stage.preview) fx.params.guard = run++ % 2 === 0;
      // The run's overflow wins over the transition's own.
      return { overflow };
    },
    ms: 3000,
  });
  if (stage.bar) {
    slider(stage.bar, 'overflow', 0, 120, 5, overflow, (v) => (overflow = v), (v) => `${v}px`);
    checkbox(stage.bar, 'guard with inRange(uv)', true, (v) => (fx.params.guard = v));
  }
  return () => stage.dispose();
};

export default mount;
