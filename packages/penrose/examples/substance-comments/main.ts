// Double-dash comments hide statements from the Substance parser
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    domain: `type Node
predicate Edge(Node a, Node b)
`,
    substance: `-- four nodes in a row
Node n_i for i in [0, 3]  -- n_0, n_1, n_2, n_3

Edge(n_0, n_1)
Edge(n_1, n_2)
-- Edge(n_2, n_3)   (commented out: n_3 stays alone)
-- Edge(n_3, n_0)

AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Node n {
  n.icon = Circle {
    r : 22
    strokeWidth : 3.0
    strokeColor : #333333
    fillColor : #dfe8f5
  }
  n.text = Text {
    string : n.label
    center : n.icon.center
    fontSize : "26px"
  }
  layer n.text above n.icon
}

forall Node a; Node b
where Edge(a, b) {
  a.edge = Line {
    start : a.icon.center
    end : b.icon.center
    strokeWidth : 3.0
    strokeColor : #555555
  }
  layer a.edge below a.icon
  layer a.edge below b.icon
  ensure vdist(a.icon.center, b.icon.center) > 90
}
`,
  });
  return () => stage.dispose();
};

export default mount;
