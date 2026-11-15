// Big Text revealed through a clipping rectangle that settles in place
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: `canvas {
  width = 400
  height = 300
}

reveal {
  px = ?
  ensure px == 0
  word = Text {
    string : "CLIPPED"
    center : (0, 0)
    fontSize : "88px"
    fontWeight : "bold"
    fillColor : #b5446e
  }
  slot = Rectangle {
    center : (px, 0)
    width : 150
    height : 120
    cornerRadius : 16
  }
  g = Group {
    shapes : [word, slot]
    clipPath : clip(slot)
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
