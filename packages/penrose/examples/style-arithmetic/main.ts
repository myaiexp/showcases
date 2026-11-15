// A sign glued to a number is one token, so 20+15 is not a sum
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (sum: string): string => `canvas {
  width = 680
  height = 300
}

forall Op o {
  o.icon = Circle {
    center : (match_id * 150 - 375, 20)
    r : 30
    strokeWidth : 0.0
    fillColor : rgba(0.45, 0.65, 0.95, 0.6)
  }
}

forall Op o where Plus(o) {
  override o.icon.r = ${sum}
  o.text = Text {
    string : "${sum.replace(/\s+/g, ' ')}"
    center : (o.icon.center[0], 0 - 100)
    fontSize : "22px"
  }
}

forall Op o where Minus(o) {
  override o.icon.r = 70 - 20
  o.text = Text {
    string : "70 - 20"
    center : (o.icon.center[0], 0 - 100)
    fontSize : "22px"
  }
}

forall Op o where Times(o) {
  override o.icon.r = 6 * 10
  o.text = Text {
    string : "6 * 10"
    center : (o.icon.center[0], 0 - 100)
    fontSize : "22px"
  }
}

forall Op o where Divide(o) {
  override o.icon.r = 240 / 3
  o.text = Text {
    string : "240 / 3"
    center : (o.icon.center[0], 0 - 100)
    fontSize : "22px"
  }
}
`;
  const spaced = style('20 + 15');
  playground(stage, {
    domain: `type Op
predicate Plus(Op)
predicate Minus(Op)
predicate Times(Op)
predicate Divide(Op)
`,
    substance: `Op a, b, c, d
Plus(a)
Minus(b)
Times(c)
Divide(d)
NoLabel a, b, c, d
`,
    style: spaced,
    variants: [
      { label: 'spaces around +', style: spaced },
      { label: '20+15 without spaces', style: `-- (deliberate error)\n${style('20+15')}` },
    ],
  });
  return () => stage.dispose();
};

export default mount;
