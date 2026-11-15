// Ellipse with separately optimized rx and ry, bounded and encouraged
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing A, B, C
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Ellipse {
    fillColor : rgba(0.4, 0.7, 0.55, 0.85)
    strokeColor : #1f5c44
    strokeWidth : 3
  }
  ensure t.icon.rx > 30
  ensure t.icon.rx < 90
  ensure t.icon.ry > 12
  ensure t.icon.ry < 60
  encourage t.icon.rx == 3 * t.icon.ry
}

forall Thing a; Thing b {
  ensure norm(a.icon.center - b.icon.center) > 120
}
`,
  });
  return () => stage.dispose();
};

export default mount;
