// VFX-JS example: a wipe written as a ShaderTransition subclass
import { ShaderTransition } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { describe, drive, trKit } from '../../shared/tr-kit.ts';

class Wipe extends ShaderTransition<{ softness?: number }> {
  name = 'wipe';
  // `transition` is the only function to write. t goes 0 -> 1 (smoothstep-eased).
  frag = `
uniform float softness;
vec4 transition(vec2 uv, float t) {
  float m = smoothstep(t - softness, t + softness, uv.x);
  return mix(readTo(uv), readFrom(uv), m);
}
`;
  // Every frame: params become uniforms here.
  override uniforms() {
    return { softness: this.params.softness ?? 0.05 };
  }
}

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;
  const fx = new Wipe({ softness: 0.05 });
  const t = vfx.addTransition(box, { transition: fx, duration: 1.2 });
  drive(kit, t, { label: () => `Wipe: ${describe(fx.params)}` });

  if (stage.bar) {
    slider(stage.bar, 'softness', 0, 0.5, 0.01, 0.05, (v) => {
      fx.params.softness = v;
      stage.say(`Wipe: ${describe(fx.params)}`);
    });
  } else {
    // A card alternates a hard and a very soft edge.
    let soft = false;
    stage.every(2600, () => {
      soft = !soft;
      fx.params.softness = soft ? 0.3 : 0.02;
    });
  }
  return () => stage.dispose();
};

export default mount;
