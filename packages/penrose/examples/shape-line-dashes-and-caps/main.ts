// Line with strokeDasharray and strokeLinecap round for a dotted look
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'strokeStyle: "dashed"',
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
    strokeWidth : 5
    strokeStyle : "dashed"
  }
  edge below a.dot
  edge below b.dot
}
`,
      },
      {
        label: 'strokeDasharray: "18 6 4 6"',
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
    strokeWidth : 5
    strokeDasharray : "18 6 4 6"
  }
  edge below a.dot
  edge below b.dot
}
`,
      },
      {
        label: 'round caps, "1 12"',
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
    strokeWidth : 8
    strokeDasharray : "1 12"
    strokeLinecap : "round"
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
