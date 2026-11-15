// projectDepth gives (x, y, depth); the depth drives size and colour
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Vertex
predicate At(Vertex, Number, Number, Number)
`,
    substance: `Vertex a, b, c, d, e, f, g, h
At(a, -1, -1, -1)
At(b, 1, -1, -1)
At(c, 1, 1, -1)
At(d, -1, 1, -1)
At(e, -1, -1, 1)
At(f, 1, -1, 1)
At(g, 1, 1, 1)
At(h, -1, 1, 1)
NoLabel a, b, c, d, e, f, g, h
`,
    style: `canvas {
  width = 520
  height = 420
}

forall repeatable Vertex v
where At(v, x, y, z) {
  mat4x4 view = lookAt((3.0, 2.5, 5.0), (0.0, 0.0, 0.0), (0.0, 1.0, 0.0))
  mat4x4 lens = perspective(40.0, 1.0, 1.0, 12.0)
  -- perspective() flips y; a negative viewport height flips it back
  vec4 viewport = (0 - 210, 210, 420, 0 - 420)
  vec3 q = projectDepth((x, y, z), view, lens, viewport)
  -- with perspective() the depth of these corners runs from about 1.22 (far) to 1.32 (near)
  closeness = (q[2] - 1.22) / 0.1
  v.dot = Circle {
    center : (q[0], q[1])
    r : 8 + 22 * closeness
    strokeWidth : 0.0
    fillColor : hsva(220 - 200 * closeness, 75, 95, 0.85)
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
