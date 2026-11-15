// Text with fillColor, strokeColor outline and a rotation in degrees
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'fillColor',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

word {
  text = Text {
    string : "Penrose"
    center : (slide.dx, 0)
    fontSize : "60px"
    fontWeight : "bold"
    fillColor : #2a6f97
  }
}
`,
      },
      {
        label: 'strokeColor outline',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

word {
  text = Text {
    string : "Penrose"
    center : (slide.dx, 0)
    fontSize : "60px"
    fontWeight : "bold"
    fillColor : none()
    strokeColor : #b5446e
    strokeWidth : 2
  }
}
`,
      },
      {
        label: 'rotation: -20',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

word {
  text = Text {
    string : "Penrose"
    center : (slide.dx, 0)
    fontSize : "60px"
    fontWeight : "bold"
    fillColor : #3b8f4a
    rotation : -20
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
