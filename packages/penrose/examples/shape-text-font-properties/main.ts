// Text fontFamily, fontWeight and fontStyle on three rows of words
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'fontFamily',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

row0 {
  text = Text {
    string : "serif"
    center : (slide.dx, 75)
    fontSize : "40px"
    fontFamily : "serif"
  }
}

row1 {
  text = Text {
    string : "monospace"
    center : (slide.dx, 0)
    fontSize : "40px"
    fontFamily : "monospace"
  }
}

row2 {
  text = Text {
    string : "sans-serif"
    center : (slide.dx, -75)
    fontSize : "40px"
    fontFamily : "sans-serif"
  }
}
`,
      },
      {
        label: 'fontWeight',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

row0 {
  text = Text {
    string : "lighter"
    center : (slide.dx, 75)
    fontSize : "40px"
    fontWeight : "lighter"
  }
}

row1 {
  text = Text {
    string : "normal"
    center : (slide.dx, 0)
    fontSize : "40px"
    fontWeight : "normal"
  }
}

row2 {
  text = Text {
    string : "bold"
    center : (slide.dx, -75)
    fontSize : "40px"
    fontWeight : "bold"
  }
}
`,
      },
      {
        label: 'fontStyle',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

row0 {
  text = Text {
    string : "normal"
    center : (slide.dx, 75)
    fontSize : "40px"
    fontStyle : "normal"
  }
}

row1 {
  text = Text {
    string : "italic"
    center : (slide.dx, 0)
    fontSize : "40px"
    fontStyle : "italic"
  }
}

row2 {
  text = Text {
    string : "oblique"
    center : (slide.dx, -75)
    fontSize : "40px"
    fontStyle : "oblique"
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
