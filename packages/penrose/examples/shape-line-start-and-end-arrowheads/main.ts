// Edges between moving dots with startArrowhead, endArrowhead or both
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'endArrowhead: "straight"',
        style: `canvas {
  width = 400
  height = 300
}

forall Node n {
  n.dot = Circle {
    r : 5
    fillColor : #333333
  }
}

forall Node a; Node b {
  ensure norm(a.dot.center - b.dot.center) > 100
}

forall Node a; Node b
where Link(a, b) {
  ensure norm(a.dot.center - b.dot.center) > 130
  edge = Line {
    start : a.dot.center
    end : b.dot.center
    strokeWidth : 3
    endArrowhead : "straight"
  }
  edge below a.dot
  edge below b.dot
}
`,
      },
      {
        label: 'start "concave", end "perp"',
        style: `canvas {
  width = 400
  height = 300
}

forall Node n {
  n.dot = Circle {
    r : 5
    fillColor : #333333
  }
}

forall Node a; Node b {
  ensure norm(a.dot.center - b.dot.center) > 100
}

forall Node a; Node b
where Link(a, b) {
  ensure norm(a.dot.center - b.dot.center) > 130
  edge = Line {
    start : a.dot.center
    end : b.dot.center
    strokeWidth : 3
    startArrowhead : "concave"
    endArrowhead : "perp"
  }
  edge below a.dot
  edge below b.dot
}
`,
      },
      {
        label: 'start "none", end "loop"',
        style: `canvas {
  width = 400
  height = 300
}

forall Node n {
  n.dot = Circle {
    r : 5
    fillColor : #333333
  }
}

forall Node a; Node b {
  ensure norm(a.dot.center - b.dot.center) > 100
}

forall Node a; Node b
where Link(a, b) {
  ensure norm(a.dot.center - b.dot.center) > 130
  edge = Line {
    start : a.dot.center
    end : b.dot.center
    strokeWidth : 3
    startArrowhead : "none"
    endArrowhead : "loop"
  }
  edge below a.dot
  edge below b.dot
}
`,
      },
    ],
    domain: `type Node
predicate Link(Node a, Node b)
`,
    substance: `Node A, B, C
Link(A, B)
Link(B, C)
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
