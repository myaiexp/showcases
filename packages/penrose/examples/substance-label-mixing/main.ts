// AutoLabel, Label and NoLabel together decide what each set shows
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    domain: `type Set
`,
    substance: `Set A, B, C, D
AutoLabel All
Label B "the second"
NoLabel C
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
