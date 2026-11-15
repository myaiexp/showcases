// stepTimes(state, n) takes n optimizer steps: the same layout after more and more of them
import { compile, isOptimized, showError, stepTimes } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// The bundler page's trio, with a third set.
const trio = {
  substance: `
  Set A, B, C
  Subset(A, B)
  Subset(C, B)
  `,
  style: `
  canvas {
      width = 400
      height = 400
  }
  forall Set s {
      s.shape = Circle {}
      ensure lessThan(20, s.shape.r)
  }
  forall Set s1, s2
  where Subset(s1, s2) {
      ensure contains(s2.shape, s1.shape)
      s2.shape above s1.shape
  }
  `,
  domain: `type Set
  predicate Subset(Set, Set)`,
  variation: 'steps',
};

const COUNTS = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 10000];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const compiled = await compile(trio);
  if (compiled.isErr()) {
    stage.fail(showError(compiled.error));
    return () => stage.dispose();
  }
  const show = async (n: number): Promise<void> => {
    // Every count starts again from the compiled state, so the pictures are comparable.
    const res = stepTimes(compiled.value, n);
    if (res.isErr()) return stage.fail(res.error);
    await stage.render(res.value);
    stage.say(`stepTimes(state, ${n}) · isOptimized: ${isOptimized(res.value)}`, isOptimized(res.value) ? 'ok' : 'info');
  };
  let i = 0;
  stage.slider('steps (index)', 0, COUNTS.length - 1, 1, 0, (v) => void show(COUNTS[(i = v)]!));
  await show(0);
  if (stage.preview) stage.every(900, () => void show(COUNTS[(i = (i + 1) % COUNTS.length)]!));
  return () => stage.dispose();
};

export default mount;
