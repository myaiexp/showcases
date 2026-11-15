// Rectangles sized from each Text width and height with padding
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing Alpha, Beta, Gamma
AutoLabel All
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.text = Text {
    string : t.label
    fontSize : "28px"
  }
  t.box = Rectangle {
    center : t.text.center
    width : t.text.width + 28
    height : t.text.height + 18
    fillColor : rgba(1.0, 0.95, 0.7, 1.0)
    strokeColor : #7a5a00
    strokeWidth : 2
    cornerRadius : 6
  }
  t.box below t.text
}

forall Thing a; Thing b {
  ensure disjoint(a.box, b.box, 16)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
