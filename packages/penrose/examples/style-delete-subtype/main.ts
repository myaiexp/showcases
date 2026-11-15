// delete removes a shape a more general block already made
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (del: string): string => `canvas {
  width = 600
  height = 320
}

-- by default, draw a circle for every Item; the shared position keeps the label on it
forall Item x {
  x.pos = (?, ?)
  x.widget = Circle {
    center : x.pos
    r : 44
    strokeWidth : 0.0
    fillColor : rgba(0.5, 0.7, 0.95, 0.7)
  }
  x.text = Text {
    string : x.label
    center : x.pos
    fontSize : "26px"
  }
}

forall Item a; Item b {
  ensure vdist(a.pos, b.pos) > 120.0
}

-- but not for the subtype Hidden
forall Hidden x {
  ${del}
}
`;
  playground(stage, {
    domain: `type Item
type Hidden <: Item
`,
    substance: `Item A, B
Hidden H
AutoLabel All
`,
    style: style('delete x.widget'),
    variants: [
      { label: 'with delete x.widget', style: style('delete x.widget') },
      { label: 'without delete', style: style('-- nothing deleted') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
