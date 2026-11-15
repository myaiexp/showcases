// AutoLabel All writes each object name as its label; without it labels are empty
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    variants: [
      {
        label: 'AutoLabel All',

      },
      {
        label: 'no labelling',
        substance: `Set A, B, C
`,
      },
    ],
    domain: `type Set
`,
    substance: `Set A, B, C
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 2.0
    fillColor : rgba(0.4, 0.6, 0.9, 0.35)
  }
  ensure x.icon.r > 40
  ensure x.icon.r < 120
}

forall Set x {
  x.text = Text {
    string : x.label
    fontSize : "30px"
  }
  ensure contains(x.icon, x.text)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
