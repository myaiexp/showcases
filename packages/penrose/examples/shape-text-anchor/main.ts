// Text textAnchor start, middle and end around a fixed centre
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'textAnchor: "start"',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

guide {
  line = Line {
    start : (slide.dx, -110)
    end : (slide.dx, 110)
    strokeWidth : 2
    strokeColor : #d94f4f
    strokeDasharray : "6 4"
  }
  word = Text {
    string : "Anchor"
    center : (slide.dx, 0)
    fontSize : "44px"
    textAnchor : "start"
  }
}
`,
      },
      {
        label: 'textAnchor: "middle"',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

guide {
  line = Line {
    start : (slide.dx, -110)
    end : (slide.dx, 110)
    strokeWidth : 2
    strokeColor : #d94f4f
    strokeDasharray : "6 4"
  }
  word = Text {
    string : "Anchor"
    center : (slide.dx, 0)
    fontSize : "44px"
    textAnchor : "middle"
  }
}
`,
      },
      {
        label: 'textAnchor: "end"',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

guide {
  line = Line {
    start : (slide.dx, -110)
    end : (slide.dx, 110)
    strokeWidth : 2
    strokeColor : #d94f4f
    strokeDasharray : "6 4"
  }
  word = Text {
    string : "Anchor"
    center : (slide.dx, 0)
    fontSize : "44px"
    textAnchor : "end"
  }
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
