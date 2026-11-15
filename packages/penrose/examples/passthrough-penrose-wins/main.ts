// A passthrough fill loses to fillColor, while opacity gets through
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'fill: "#d94f4f" (ignored)',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.icon = Circle {
    r : 55
    fillColor : rgba(0.2, 0.65, 0.35, 1.0)
    fill : "#d94f4f"
  }
}

forall Dot a; Dot b {
  ensure norm(a.icon.center - b.icon.center) > 130
}
`,
      },
      {
        label: 'fillOpacity: 0.2 (ignored)',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.icon = Circle {
    r : 55
    fillColor : rgba(0.2, 0.65, 0.35, 1.0)
    fillOpacity : 0.2
  }
}

forall Dot a; Dot b {
  ensure norm(a.icon.center - b.icon.center) > 130
}
`,
      },
      {
        label: 'opacity: 0.4 (applied)',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.icon = Circle {
    r : 55
    fillColor : rgba(0.2, 0.65, 0.35, 1.0)
    opacity : 0.4
  }
}

forall Dot a; Dot b {
  ensure norm(a.icon.center - b.icon.center) > 130
}
`,
      },
    ],
    domain: `type Dot
`,
    substance: `Dot A, B
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
