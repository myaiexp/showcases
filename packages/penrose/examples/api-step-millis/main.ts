// step(state, { until }) runs the optimizer until `until` says stop; here, a time budget
import { compile, finalStage, isOptimized, nextStage, showError, step, type PenroseState } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const trio = {
  domain: `type Set
predicate Subset(Set, Set)`,
  substance: `Set A, B, C
Subset(B, A)
Subset(C, A)
AutoLabel All`,
  style: `canvas {
  width = 400
  height = 400
}
forall Set s {
  s.shape = Circle {}
  s.text = Equation {
    string: s.label
    fontSize: "28px"
  }
  ensure lessThan(30, s.shape.r)
  ensure contains(s.shape, s.text)
}
forall Set s1, s2
where Subset(s1, s2) {
  ensure contains(s2.shape, s1.shape, 10)
  s2.shape below s1.shape
}`,
  variation: 'millis',
};

/**
 * The docs' stepMillis sets a flag from setTimeout, but step() is synchronous, so that
 * callback can only run after step has returned. A deadline read inside `until` works.
 */
const stepMillis = (state: PenroseState, millis: number) => {
  const deadline = performance.now() + millis;
  return step(state, { until: () => performance.now() > deadline });
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  let millis = 1;
  stage.slider('ms per frame', 0.25, 8, 0.25, millis, (v) => (millis = v));

  const compiled = await compile(trio);
  if (compiled.isErr()) {
    stage.fail(showError(compiled.error));
    return () => stage.dispose();
  }
  let state = compiled.value;
  let frames = 0;
  let raf = 0;
  const frame = async (): Promise<void> => {
    const res = stepMillis(state, millis);
    if (res.isErr()) return stage.fail(res.error);
    state = res.value;
    // A converged stage hands over to the next one, as stepTimes does.
    if (isOptimized(state) && !finalStage(state)) state = nextStage(state);
    frames++;
    await stage.render(state);
    if (stage.disposed) return;
    const done = isOptimized(state) && finalStage(state);
    stage.say(`${frames} frames of ${millis} ms${done ? ' · converged' : ''}`, done ? 'ok' : 'info');
    if (!done) raf = requestAnimationFrame(() => void frame());
    // Start over from the first sample after a pause, so the solve can be watched again.
    else stage.after(2500, () => {
      state = compiled.value;
      frames = 0;
      void frame();
    });
  };
  void frame();
  return () => {
    cancelAnimationFrame(raf);
    stage.dispose();
  };
};

export default mount;
