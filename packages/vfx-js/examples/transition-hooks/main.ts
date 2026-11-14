// start/update/end hooks on a ShaderTransition, a new tint per run
import { ShaderTransition, type TransitionEffectContext, type TransitionRun } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

class Flash extends ShaderTransition {
  name = 'flash';
  frag = `
uniform vec3 tint;
vec4 transition(vec2 uv, float t) {
  vec4 c = mix(readFrom(uv), readTo(uv), t);
  return c + vec4(tint * sin(t * 3.141593), 0.0) * c.a;
}
`;
  #tint: [number, number, number] = [1, 1, 1];
  log = { starts: 0, updates: 0, ends: 0, text: 'no run yet' };

  override start(run: TransitionRun): void {
    super.start(run); // ShaderTransition keeps the run for overflow
    // A new colour on every run.
    this.#tint = [Math.random(), Math.random(), Math.random()];
    this.log.starts++;
    this.log.updates = 0;
    this.log.text = `start(): duration ${run.duration}s, reverse ${run.reverse}`;
  }
  update(_ctx: TransitionEffectContext): void {
    this.log.updates++;
  }
  override end(): void {
    super.end();
    this.log.ends++;
    this.log.text = `end() after ${this.log.updates} update() calls`;
  }
  override uniforms() {
    return { tint: this.#tint };
  }
}

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;
  const fx = new Flash();
  const t = vfx.addTransition(box, { transition: fx, duration: 1.2 });
  drive(kit, t, { label: () => 'Flash' });

  let last = '';
  stage.frame(() => {
    const l = fx.log;
    const now = `${l.text} (start x${l.starts}, end x${l.ends}, update x${l.updates})`;
    if (now !== last) {
      last = now;
      stage.say(now);
    }
  });
  return () => stage.dispose();
};

export default mount;
