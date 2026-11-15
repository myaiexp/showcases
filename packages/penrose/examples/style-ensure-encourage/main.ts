// A constraint must hold; an objective is minimized within the constraints
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (rules: string): string => `canvas {
  width = 560
  height = 300
}

forall Set s {
  s.icon = Circle {
    r : 45
    strokeWidth : 0.0
    fillColor : rgba(0.45, 0.65, 0.95, 0.6)
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "26px"
  }
}

forall Set a; Set b {
${rules}
}
`;
  const only = '  ensure disjoint(a.icon, b.icon, 30.0)';
  const both = `  ensure disjoint(a.icon, b.icon, 30.0)
  encourage near(a.icon, b.icon, 150.0)`;
  const wish = '  encourage near(a.icon, b.icon, 0.0)';
  const clash = `  ensure disjoint(a.icon, b.icon, 30.0)
  encourage near(a.icon, b.icon, 0.0)`;
  playground(stage, {
    domain: `type Set
`,
    substance: `Set A, B
AutoLabel All
`,
    style: style(only),
    variants: [
      { label: 'ensure disjoint', style: style(only) },
      { label: '+ encourage near 150', style: style(both) },
      { label: 'encourage near 0 only', style: style(wish) },
      { label: 'ensure beats encourage', style: style(clash) },
    ],
  });
  return () => stage.dispose();
};

export default mount;
