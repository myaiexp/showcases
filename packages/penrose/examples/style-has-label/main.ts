// s has label, has math label and has text label select by label kind
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (relation: string): string => `canvas {
  width = 640
  height = 340
}

forall Set s {
  s.icon = Circle {
    r : 48
    strokeWidth : 3.0
    fillColor : rgba(0.85, 0.88, 0.95, 1.0)
  }
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 24.0)
}

-- the text is only drawn where the relation holds
forall Set s
where ${relation} {
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "26px"
  }
  override s.icon.fillColor = rgba(0.55, 0.85, 0.6, 1.0)
}
`;
  playground(stage, {
    domain: `type Set
`,
    substance: `Set A, B, C, D
Label A $A_1$
Label B "plain text"
NoLabel C
AutoLabel D
`,
    style: style('s has label'),
    variants: [
      { label: 'has label', style: style('s has label') },
      { label: 'has math label', style: style('s has math label') },
      { label: 'has text label', style: style('s has text label') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
