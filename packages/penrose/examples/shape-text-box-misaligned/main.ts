// Why a box around Text only fits when textAnchor stays middle
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'textAnchor: "middle"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.text = Text {
    string : t.label
    fontSize : "28px"
    textAnchor : "middle"
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
      },
      {
        label: 'textAnchor: "start"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.text = Text {
    string : t.label
    fontSize : "28px"
    textAnchor : "start"
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
      },
      {
        label: 'textAnchor: "end"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.text = Text {
    string : t.label
    fontSize : "28px"
    textAnchor : "end"
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
      },
    ],
    domain: `type Thing
`,
    substance: `Thing Alpha, Beta
AutoLabel All
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
