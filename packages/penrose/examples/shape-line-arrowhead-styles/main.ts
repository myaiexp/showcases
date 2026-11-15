// Every endArrowhead style of a Line, four to a tab, each labelled
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'straight, concave, perp, line',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

row0 {
  label = Text {
    string : "straight"
    center : (-180, 100)
    textAnchor : "start"
    fontSize : "20px"
  }
  arrow = Line {
    start : (-15 + slide.dx, 100)
    end : (165 + slide.dx, 100)
    strokeWidth : 3
    strokeColor : #1a3a6b
    endArrowhead : "straight"
  }
}

row1 {
  label = Text {
    string : "concave"
    center : (-180, 34)
    textAnchor : "start"
    fontSize : "20px"
  }
  arrow = Line {
    start : (-15 + slide.dx, 34)
    end : (165 + slide.dx, 34)
    strokeWidth : 3
    strokeColor : #1a3a6b
    endArrowhead : "concave"
  }
}

row2 {
  label = Text {
    string : "perp"
    center : (-180, -32)
    textAnchor : "start"
    fontSize : "20px"
  }
  arrow = Line {
    start : (-15 + slide.dx, -32)
    end : (165 + slide.dx, -32)
    strokeWidth : 3
    strokeColor : #1a3a6b
    endArrowhead : "perp"
  }
}

row3 {
  label = Text {
    string : "line"
    center : (-180, -98)
    textAnchor : "start"
    fontSize : "20px"
  }
  arrow = Line {
    start : (-15 + slide.dx, -98)
    end : (165 + slide.dx, -98)
    strokeWidth : 3
    strokeColor : #1a3a6b
    endArrowhead : "line"
  }
}
`,
      },
      {
        label: 'doubleLine, loopup, loopdown, loop',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

row0 {
  label = Text {
    string : "doubleLine"
    center : (-180, 100)
    textAnchor : "start"
    fontSize : "20px"
  }
  arrow = Line {
    start : (-15 + slide.dx, 100)
    end : (165 + slide.dx, 100)
    strokeWidth : 3
    strokeColor : #1a3a6b
    endArrowhead : "doubleLine"
  }
}

row1 {
  label = Text {
    string : "loopup"
    center : (-180, 34)
    textAnchor : "start"
    fontSize : "20px"
  }
  arrow = Line {
    start : (-15 + slide.dx, 34)
    end : (165 + slide.dx, 34)
    strokeWidth : 3
    strokeColor : #1a3a6b
    endArrowhead : "loopup"
  }
}

row2 {
  label = Text {
    string : "loopdown"
    center : (-180, -32)
    textAnchor : "start"
    fontSize : "20px"
  }
  arrow = Line {
    start : (-15 + slide.dx, -32)
    end : (165 + slide.dx, -32)
    strokeWidth : 3
    strokeColor : #1a3a6b
    endArrowhead : "loopdown"
  }
}

row3 {
  label = Text {
    string : "loop"
    center : (-180, -98)
    textAnchor : "start"
    fontSize : "20px"
  }
  arrow = Line {
    start : (-15 + slide.dx, -98)
    end : (165 + slide.dx, -98)
    strokeWidth : 3
    strokeColor : #1a3a6b
    endArrowhead : "loop"
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
