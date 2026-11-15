// Without repeatable, two style variables never map to one object
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (header: string): string => `canvas {
  width = 520
  height = 340
}

forall Node n {
  n.icon = Circle {
    r : 34
    strokeWidth : 3.0
    fillColor : rgba(0.85, 0.9, 1.0, 1.0)
  }
  n.text = Text {
    string : n.label
    center : n.icon.center + (0, 54)
    fontSize : "26px"
  }
}

forall Node a; Node b {
  ensure disjoint(a.icon, b.icon, 80.0)
}

-- a plain pair: the edge itself
forall Node a; Node b
where Edge(a, b) {
  edge = Line {
    start : a.icon.center
    end : b.icon.center
    strokeWidth : 3.0
  }
  layer edge below a.icon
}

-- the header under test: a red dot at the midpoint of every edge it matches
${header}
where Edge(a, b) {
  -- the midpoint of a self-edge is the node itself
  mark = Circle {
    center : (a.icon.center + b.icon.center) / 2
    r : 9
    strokeWidth : 0.0
    fillColor : rgba(0.9, 0.2, 0.2, 1.0)
  }
  layer a.icon below mark
}
`;
  playground(stage, {
    domain: `type Node
predicate Edge(Node, Node)
`,
    substance: `Node X, Y
Edge(X, Y)
Edge(X, X)
AutoLabel All
`,
    style: style('forall Node a; Node b'),
    variants: [
      { label: 'default: self-edge skipped', style: style('forall Node a; Node b') },
      { label: 'repeatable: self-edge matched', style: style('forall repeatable Node a; Node b') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
