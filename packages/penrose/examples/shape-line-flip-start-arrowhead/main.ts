// flipStartArrowhead turns the arrowhead at the start of a Line around
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'flipStartArrowhead: false (default)',
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
    strokeWidth : 4
    startArrowhead : "concave"
    flipStartArrowhead : false
    endArrowhead : "concave"
    startArrowheadSize : 1.4
    endArrowheadSize : 1.4
  }
  edge below a.dot
  edge below b.dot
}
`,
      },
      {
        label: 'flipStartArrowhead: true',
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
    strokeWidth : 4
    startArrowhead : "concave"
    flipStartArrowhead : true
    endArrowhead : "concave"
    startArrowheadSize : 1.4
    endArrowheadSize : 1.4
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
