// #rrggbb and #rrggbbaa are converted to rgba at compile time
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Swatch
predicate Solid(Swatch)
predicate Soft(Swatch)
predicate Faint(Swatch)
predicate Ghost(Swatch)
`,
    substance: `Swatch a, b, c, d
Solid(a)
Soft(b)
Faint(c)
Ghost(d)
NoLabel a, b, c, d
`,
    style: `canvas {
  width = 640
  height = 280
}

backdrop {
  stripe = Rectangle {
    center : (0, 10)
    width : 620
    height : 40
    fillColor : #26262e
    strokeWidth : 0.0
  }
}

forall Swatch s {
  s.box = Rectangle {
    center : (match_id * 140 - 350, 10)
    width : 110
    height : 120
    strokeWidth : 0.0
  }
  layer backdrop.stripe below s.box
}

forall Swatch s where Solid(s) {
  override s.box.fillColor = #3b6fd4
  s.code = Text {
    string : "#3b6fd4"
    center : (s.box.center[0], 0 - 80)
    fontSize : "20px"
  }
}

forall Swatch s where Soft(s) {
  override s.box.fillColor = #3b6fd4cc
  s.code = Text {
    string : "#3b6fd4cc"
    center : (s.box.center[0], 0 - 80)
    fontSize : "20px"
  }
}

forall Swatch s where Faint(s) {
  override s.box.fillColor = #3b6fd466
  s.code = Text {
    string : "#3b6fd466"
    center : (s.box.center[0], 0 - 80)
    fontSize : "20px"
  }
}

forall Swatch s where Ghost(s) {
  override s.box.fillColor = #3b6fd419
  s.code = Text {
    string : "#3b6fd419"
    center : (s.box.center[0], 0 - 80)
    fontSize : "20px"
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
