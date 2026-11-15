// A direction mark and a label spot at the middle of a line
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

forall Thing t {
  t.A = (random(-150, -90), random(-70, 70))
  t.B = (random(90, 150), random(-70, 70))
  t.line = Line {
    start : t.A
    end : t.B
    strokeWidth : 4
    strokeColor : #333333
  }
  t.mark = Path {
    d : pathFromPoints("open", chevron(t.line, 16))
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
  t.label = Text {
    string : "AB"
    center : midpointOffset(t.line, 26)
    fontSize : "20px"
    fillColor : #2f6fbf
  }
  t.a = Circle {
    center : t.A
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.b = Circle {
    center : t.B
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
