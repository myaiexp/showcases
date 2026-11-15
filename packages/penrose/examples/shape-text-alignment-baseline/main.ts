// Text alignmentBaseline moves a word against a horizontal guide
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'alignmentBaseline: "alphabetic"',
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
    start : (-170, slide.dx)
    end : (170, slide.dx)
    strokeWidth : 2
    strokeColor : #d94f4f
    strokeDasharray : "6 4"
  }
  word = Text {
    string : "Baseline gxy"
    center : (0, slide.dx)
    fontSize : "42px"
    alignmentBaseline : "alphabetic"
    dominantBaseline : "alphabetic"
  }
}
`,
      },
      {
        label: 'alignmentBaseline: "hanging"',
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
    start : (-170, slide.dx)
    end : (170, slide.dx)
    strokeWidth : 2
    strokeColor : #d94f4f
    strokeDasharray : "6 4"
  }
  word = Text {
    string : "Baseline gxy"
    center : (0, slide.dx)
    fontSize : "42px"
    alignmentBaseline : "hanging"
    dominantBaseline : "hanging"
  }
}
`,
      },
      {
        label: 'alignmentBaseline: "central"',
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
    start : (-170, slide.dx)
    end : (170, slide.dx)
    strokeWidth : 2
    strokeColor : #d94f4f
    strokeDasharray : "6 4"
  }
  word = Text {
    string : "Baseline gxy"
    center : (0, slide.dx)
    fontSize : "42px"
    alignmentBaseline : "central"
    dominantBaseline : "central"
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
