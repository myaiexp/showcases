// Namespaces hold colours and sizes that every block reads with the dot
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (fill: string, edge: string, radius: number): string => `canvas {
  width = 500
  height = 340
}

palette {
  fill = ${fill}
  edge = ${edge}
}

sizes {
  radius = ${radius}
  line = 5.0
}

forall Set s {
  s.icon = Circle {
    r : sizes.radius
    fillColor : palette.fill
    strokeColor : palette.edge
    strokeWidth : sizes.line
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "28px"
  }
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 10.0)
}
`;
  playground(stage, {
    domain: `type Set
`,
    substance: `Set A, B, C
AutoLabel All
`,
    style: style('rgba(0.4, 0.6, 0.95, 0.6)', 'rgba(0.1, 0.2, 0.5, 1.0)', 45),
    variants: [
      { label: 'blue, radius 45', style: style('rgba(0.4, 0.6, 0.95, 0.6)', 'rgba(0.1, 0.2, 0.5, 1.0)', 45) },
      { label: 'orange, radius 60', style: style('rgba(0.98, 0.65, 0.25, 0.7)', 'rgba(0.6, 0.3, 0.0, 1.0)', 60) },
      { label: 'green, radius 30', style: style('rgba(0.45, 0.8, 0.5, 0.7)', 'rgba(0.1, 0.4, 0.2, 1.0)', 30) },
    ],
  });
  return () => stage.dispose();
};

export default mount;
