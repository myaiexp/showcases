// Leaving Circle r unset lets the optimizer size it within ensure bounds
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing A, B, C, D
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    fillColor : rgba(0.3, 0.6, 0.85, 0.8)
  }
  ensure t.icon.r > 25
  ensure t.icon.r < 70
}

forall Thing a; Thing b {
  ensure disjoint(a.icon, b.icon, 8)
  encourage equal(a.icon.r, b.icon.r)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
