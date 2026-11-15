// One to four tick marks centred on a sampled segment
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
  t.A = (random(-150, -90), random(-60, 60))
  t.B = (random(90, 150), random(-60, 60))
  t.line = Line {
    start : t.A
    end : t.B
    strokeWidth : 4
    strokeColor : #333333
  }
  t.ticks = Path {
    d : ticksOnLine(t.A, t.B, 14, 1, 14)
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
}
`,
    variants: [
      {
        label: 'numTicks 1',
      },
      {
        label: 'numTicks 2',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.A = (random(-150, -90), random(-60, 60))
  t.B = (random(90, 150), random(-60, 60))
  t.line = Line {
    start : t.A
    end : t.B
    strokeWidth : 4
    strokeColor : #333333
  }
  t.ticks = Path {
    d : ticksOnLine(t.A, t.B, 14, 2, 14)
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
}
`,
      },
      {
        label: 'numTicks 3',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.A = (random(-150, -90), random(-60, 60))
  t.B = (random(90, 150), random(-60, 60))
  t.line = Line {
    start : t.A
    end : t.B
    strokeWidth : 4
    strokeColor : #333333
  }
  t.ticks = Path {
    d : ticksOnLine(t.A, t.B, 14, 3, 14)
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
}
`,
      },
      {
        label: 'numTicks 4',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.A = (random(-150, -90), random(-60, 60))
  t.B = (random(90, 150), random(-60, 60))
  t.line = Line {
    start : t.A
    end : t.B
    strokeWidth : 4
    strokeColor : #333333
  }
  t.ticks = Path {
    d : ticksOnLine(t.A, t.B, 14, 4, 14)
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
