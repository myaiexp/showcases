// An indexed declaration expands into one object per index in the range
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    variants: [
      {
        label: '[0, 2]',
        substance: `Node n_i for i in [0, 2]
AutoLabel All
`,
      },
      {
        label: '[0, 4]',
        substance: `Node n_i for i in [0, 4]
AutoLabel All
`,
      },
      {
        label: '[0, 6]',
        substance: `Node n_i for i in [0, 6]
AutoLabel All
`,
      },
    ],
    domain: `type Node
`,
    substance: `Node n_i for i in [0, 4]
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
`,
  });
  return () => stage.dispose();
};

export default mount;
