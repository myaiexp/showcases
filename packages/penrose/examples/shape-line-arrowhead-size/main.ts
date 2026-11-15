// endArrowheadSize scales an arrowhead, which also takes the stroke colour
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'endArrowheadSize: 0.7',
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
    strokeColor : #2a6f97
    endArrowhead : "straight"
    endArrowheadSize : 0.7
    startArrowhead : "straight"
    startArrowheadSize : 0.7
  }
  edge below a.dot
  edge below b.dot
}
`,
      },
      {
        label: 'endArrowheadSize: 1.5',
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
    strokeColor : #b5446e
    endArrowhead : "straight"
    endArrowheadSize : 1.5
    startArrowhead : "straight"
    startArrowheadSize : 1.5
  }
  edge below a.dot
  edge below b.dot
}
`,
      },
      {
        label: 'endArrowheadSize: 2.5',
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
    strokeColor : #3b8f4a
    endArrowhead : "straight"
    endArrowheadSize : 2.5
    startArrowhead : "straight"
    startArrowheadSize : 2.5
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
