// ? is left to the optimizer; ?[v] chooses where the optimizer starts
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (start: string): string => `canvas {
  width = 500
  height = 300
}

forall Set s {
  s.icon = Circle {
    center : (0, 0)
    r : ${start}
    strokeWidth : 3.0
    fillColor : rgba(0.95, 0.7, 0.35, 0.6)
  }
  s.text = Text {
    string : s.label
    center : (0, 0)
    fontSize : "30px"
  }
  -- the only constraint: not a speck, not the whole canvas
  ensure s.icon.r > 10
  ensure s.icon.r < 140
}
`;
  playground(stage, {
    domain: `type Set
`,
    substance: `Set A
AutoLabel All
`,
    style: style('?'),
    variants: [
      { label: 'r : ?', style: style('?') },
      { label: 'r : ?[30]', style: style('?[30]') },
      { label: 'r : ?[90]', style: style('?[90]') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
