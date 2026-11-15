// Rectangles whose width and height the optimizer chooses within bounds
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
  t.box = Rectangle {
    fillColor : rgba(0.95, 0.7, 0.3, 0.85)
    strokeColor : #7a4a00
    strokeWidth : 3
    cornerRadius : 6
  }
  ensure t.box.width > 30
  ensure t.box.width < 130
  ensure t.box.height > 30
  ensure t.box.height < 130
  encourage t.box.width == 2 * t.box.height
}

forall Thing a; Thing b {
  ensure disjoint(a.box, b.box, 10)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
