// Layering statements put one shape in front of or behind another
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (statement: string): string => `canvas {
  width = 500
  height = 320
}

forall Disc d {
  d.icon = Circle {
    r : 80
    strokeWidth : 3.0
  }
  d.text = Text {
    string : d.label
    center : d.icon.center
    fontSize : "34px"
  }
}

-- fixed, overlapping positions so only the layering differs
forall Disc \`A\` {
  override \`A\`.icon.center = (-80, 0)
  override \`A\`.icon.fillColor = rgba(0.95, 0.4, 0.35, 0.95)
}
forall Disc \`B\` {
  override \`B\`.icon.center = (0, 0)
  override \`B\`.icon.fillColor = rgba(0.95, 0.8, 0.3, 0.95)
}
forall Disc \`C\` {
  override \`C\`.icon.center = (80, 0)
  override \`C\`.icon.fillColor = rgba(0.4, 0.65, 0.95, 0.95)
}

forall Disc x; Disc y
where Covers(x, y) {
  ${statement}
}
`;
  const above = 'layer x.icon above y.icon';
  const below = 'layer x.icon below y.icon';
  playground(stage, {
    domain: `type Disc
predicate Covers(Disc, Disc)
`,
    substance: `Disc A, B, C
Covers(A, B)
Covers(B, C)
AutoLabel All
`,
    style: style(above),
    variants: [
      { label: 'layer x above y', style: style(above) },
      { label: 'layer x below y', style: style(below) },
    ],
  });
  return () => stage.dispose();
};

export default mount;
