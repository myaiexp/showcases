// one class, two containers, each instance with its own run counter
import { ShaderTransition, type TransitionRun } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { slideBox } from '../../shared/slides.ts';
import { trKit } from '../../shared/tr-kit.ts';

// Every instance core builds is kept here, to show their counters.
const made: Sweep[] = [];

class Sweep extends ShaderTransition {
  name = 'sweep';
  frag = `
uniform float dir;
vec4 transition(vec2 uv, float t) {
  float x = dir > 0.0 ? uv.x : 1.0 - uv.x;
  return mix(readFrom(uv), readTo(uv), step(x, t));
}
`;
  // State on the instance: survives between runs of this container only.
  runs = 0;
  #dir = 1;
  constructor() {
    super();
    made.push(this);
  }
  override start(run: TransitionRun): void {
    super.start(run);
    this.runs++;
    this.#dir = this.runs % 2 === 1 ? 1 : -1;
  }
  override uniforms() {
    return { dir: this.#dir };
  }
}

const mount: Mount = async (el, ctx) => {
  made.length = 0;
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;
  const box2 = await slideBox(stage);
  for (const b of [box, box2]) {
    b.style.width = stage.preview ? '150px' : '260px';
    b.style.height = stage.preview ? '100px' : '170px';
  }
  // The same class twice: two containers, two instances.
  const a = vfx.addTransition(box, { transition: Sweep, duration: 0.9 });
  const b = vfx.addTransition(box2, { transition: Sweep, duration: 0.9 });

  const idx = [0, 0];
  const go = (which: 0 | 1): void => {
    idx[which] = (idx[which]! + 1) % kit.slides.length;
    const report = (): void => stage.say(`instances built: ${made.length}; runs per instance: ${made.map((m) => m.runs).join(' and ')}`);
    // start() runs a moment after show(), so read the counters when the run ends.
    void (which === 0 ? a : b).show(idx[which]!).then(report);
  };
  if (stage.bar) {
    button(stage.bar, 'run left box', () => go(0));
    button(stage.bar, 'run right box', () => go(1));
  } else {
    stage.every(2200, () => go(0));
    stage.every(3300, () => go(1));
  }
  stage.say('One class, two containers');
  return () => stage.dispose();
};

export default mount;
