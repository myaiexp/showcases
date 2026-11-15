// Generated names such as n_0 and n_2 are usable in later statements
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
    substance: `Node n_i for i in [0, 3]
Edge(n_0, n_2) -- ok: n_0 and n_2 exist after the expansion
Edge(n_1, n_3)
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
