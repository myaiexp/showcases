// Edges (i, (i + 1) mod N) close a ring of N nodes
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    variants: [
      {
        label: '5 nodes',
        substance: `Node n_i for i in [0, 4]
Edge(n_i, n_j) for i in [0, 4], j in [0, 4] where j == (i + 1) mod 5
AutoLabel All
`,
      },
      {
        label: '6 nodes',
        substance: `Node n_i for i in [0, 5]
Edge(n_i, n_j) for i in [0, 5], j in [0, 5] where j == (i + 1) mod 6
AutoLabel All
`,
      },
      {
        label: '3 nodes',
        substance: `Node n_i for i in [0, 2]
Edge(n_i, n_j) for i in [0, 2], j in [0, 2] where j == (i + 1) mod 3
AutoLabel All
`,
      },
    ],
    domain: `type Node
predicate Edge(Node a, Node b)
`,
    substance: `Node n_i for i in [0, 4]
Edge(n_i, n_j) for i in [0, 4], j in [0, 4] where j == (i + 1) mod 5
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
