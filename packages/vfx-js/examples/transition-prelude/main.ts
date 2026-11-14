// an iris shader using readFrom/readTo, resolution, time and reverse
import { ShaderTransition } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

class Iris extends ShaderTransition<{ ripple?: number }> {
  name = 'iris';
  frag = `
uniform float ripple;
vec4 transition(vec2 uv, float t) {
  // resolution: the element in physical px, so the circle stays round.
  vec2 p = (uv - 0.5) * vec2(resolution.x / resolution.y, 1.0);
  float r = length(p);
  // time: seconds since VFX-JS started, so the edge keeps rippling during the run.
  float edge = t * 1.2 + ripple * 0.04 * sin(atan(p.y, p.x) * 8.0 + time * 6.0);
  float inside = smoothstep(edge, edge - 0.05, r);
  // readFrom / readTo already swap when reverse is true: write only the forward move.
  vec4 c = mix(readFrom(uv), readTo(uv), inside);
  // inRange: nothing outside the element (relevant with an overflow).
  return inRange(uv) ? c : vec4(0.0);
}
`;
  override uniforms() {
    return { ripple: this.params.ripple ?? 1 };
  }
}

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;
  const fx = new Iris({ ripple: 1 });
  const t = vfx.addTransition(box, { transition: fx, duration: 1.4 });
  let reverse = false;
  let run = 0;
  drive(kit, t, {
    label: () => `ripple ${fx.params.ripple}, reverse ${reverse}: resolution, time, readFrom/readTo`,
    showOpts: () => {
      if (stage.preview) reverse = run++ % 2 === 1;
      return reverse ? { reverse } : {};
    },
  });
  if (stage.bar) {
    slider(stage.bar, 'ripple', 0, 3, 0.1, 1, (v) => {
      fx.params.ripple = v;
    });
    checkbox(stage.bar, 'reverse: true', false, (v) => (reverse = v));
  }
  return () => stage.dispose();
};

export default mount;
