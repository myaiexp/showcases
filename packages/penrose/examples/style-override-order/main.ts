// override replaces an earlier field, so block order picks between overrides
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const big = `forall Set s
where IsBig(s) {
  override s.icon.r = 70
  override s.icon.fillColor = rgba(0.95, 0.75, 0.3, 0.8)
}
`;
  const huge = `forall Set s
where IsHuge(s) {
  override s.icon.r = 100
  override s.icon.fillColor = rgba(0.9, 0.35, 0.3, 0.8)
}
`;
  const style = (first: string, second: string): string => `canvas {
  width = 700
  height = 340
}

forall Set s {
  s.icon = Circle {
    r : 40
    strokeWidth : 0.0
    fillColor : rgba(0.6, 0.7, 0.9, 0.8)
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "26px"
  }
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 14.0)
}

${first}
${second}`;
  playground(stage, {
    domain: `type Set
predicate IsBig(Set)
predicate IsHuge(Set)
`,
    substance: `Set A, B, C
IsBig(B)
IsBig(C)
IsHuge(C)
AutoLabel All
`,
    style: style(big, huge),
    variants: [
      { label: 'IsBig first, IsHuge last', style: style(big, huge) },
      { label: 'IsHuge first, IsBig last', style: style(huge, big) },
    ],
  });
  return () => stage.dispose();
};

export default mount;
